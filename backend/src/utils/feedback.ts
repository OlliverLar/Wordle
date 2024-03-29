type LetterResult = 'correct' | 'misplaced' | 'incorrect';

type FeedbackResult = {
  letter: string,
  result: LetterResult,
}[];

export default function feedback(guess: string, correctWord: string): FeedbackResult {
  guess = guess.toLowerCase();
  correctWord = correctWord.toLowerCase();

  const result: FeedbackResult = [];
  const remainingLetters: string[] = Array.from(correctWord);

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i];

    if (remainingLetters.includes(letter)) {
      if (letter === correctWord[i]) {
        result.push({ letter, result: 'correct' });
      } else {
        result.push({ letter, result: 'misplaced' });
      }
      remainingLetters.splice(remainingLetters.indexOf(letter), 1);
    } else {
      result.push({ letter, result: 'incorrect' });
    }
  }

  return result;
}