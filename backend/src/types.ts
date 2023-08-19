export type Game = {
    id : string,
    allowRepeatedLetters : boolean;
    wordLength : number;
    SubmitedGuesses : string[];
    start : Date;
    finnish : Date | null;
    correctWord: string;
}

export type HighscoreEntry = Game & {
    name: string;
    finnish: Date;
  }