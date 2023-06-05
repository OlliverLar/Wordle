export type Game = {
    id : string,
    allowRepeatedLetters : boolean,
    wordLength : number,
    guesses : string[],
    start : Date,
    finnish : Date | null,
    correctWord: string,
}
