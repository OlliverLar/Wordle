export default function randomWord(allowRepeatedLetters: boolean, wordLength: number, wordList: string[]) {
    const filteredWords = wordList.filter((word) => {
      if (!allowRepeatedLetters) {
        const letterCounts = {};
        for (let letter of word) {
          if (letterCounts[letter]) {
            return false;
          }
          letterCounts[letter] = true;
        }
      }
      if (wordLength && word.length !== wordLength) {
        return false;
      }
      return true;
    });
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  }