import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import randomWord from '../utils/getword'
import feedback from '../utils/feedback';
import { Router } from 'express';
import { Game } from '../types';

const router = Router();

const games: Game[] = [];

router.post("/api/game", async (req, res) =>{
    const { wordLength, allowRepeatedLetters } = req.body;

    const words = await fs.readFile("./src/words.txt")
    const listOfWords = words.toString().split('\r\n');

    const correctWord = randomWord(wordLength, allowRepeatedLetters, listOfWords);

    const game: Game = {
        id : uuidv4().toString(),
        allowRepeatedLetters,
        wordLength,
        guesses: [],
        start : new Date,
        finnish : null,
        correctWord,
    }

    games.push(game);
    console.log(game)

    res.status(200).json({
        data: {
            id: game.id,
            allowRepeatedLetters: game.allowRepeatedLetters,
            wordLength: game.wordLength,
        }
    })
})

router.post('/api/games/:id/guesses',(req, res) =>{
    
})


export default router;




