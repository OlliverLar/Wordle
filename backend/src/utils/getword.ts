export default function randomWord(
  allowRepeatedLetters: boolean, 
  wordLength: number,
   wordList: string[]) {
  
    const filteredWords: string[] = wordList.filter((word) => {
    if (!allowRepeatedLetters) {
      const letterSet: Set<string> = new Set();
      for (let letter of word) {
        if (letterSet.has(letter)) {
          return false;
        }
        letterSet.add(letter);
      }
    }
    if (wordLength && word.length !== wordLength) {
      return false;
    }
    return true;
  });

  const index = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[index];
}

