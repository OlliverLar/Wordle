import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import randomWord from '../utils/getword'
import feedback from '../utils/feedback';
import { Router } from 'express';
import { Game } from '../types';
import { HighscoreModel } from '../utils/db';

const router = Router();

const WordleGame: Game[] = [];

router.post('/api/games', async (req, res) =>{
    const { allowRepeatedLetters, wordLength } = req.body;

    const wordData = await fs.readFile('./src/words.txt')
    const listOfWords = wordData.toString().split('\r\n');

    const correctWord = randomWord(allowRepeatedLetters, wordLength, listOfWords);

    const game: Game = {
        id: uuidv4().toString(),
        allowRepeatedLetters,
        wordLength,
        SubmitedGuesses: [],
        start: new Date,
        finnish: null,
        correctWord,
    }

    WordleGame.push(game);
    console.log(game)

    res.status(200).json({
        data: {
            id: game.id,
            allowRepeatedLetters: game.allowRepeatedLetters,
            wordLength: game.wordLength,
        }
    })
})
router.post('/api/games/:id/guesses', (req, res) => {
    const { guess } = req.body;
    const { id } = req.params;

    const game = WordleGame.find(game => game.id == id)
    if (!game) {
        return res.status(404).end();
    }

    game.SubmitedGuesses.push(guess)

    const letters  = feedback(guess, game.correctWord)
    const correct = letters.every(letterResult => letterResult.result == 'correct')

    if (correct) {
        game.finnish = new Date;
    }
    res.status(200).json({
        data: {
            correct,
            letters
        }
    })
})

router.post('/api/games/:id/highscore', async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
  
      const game = WordleGame.find(game => game.id == id);
      if (!game) {
        return res.status(404).end();
      }
  
      if (!game.finnish) {
        return res.status(409).end();
      }
  
      const entry = {
        ...game,
        name,
      };
  
      const savedEntry = await HighscoreModel.create(entry);
  
      res.status(201).json({
        data: savedEntry.toJSON(),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  });

export default router;




