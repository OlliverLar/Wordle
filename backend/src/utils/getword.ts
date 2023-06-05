export default function randomWord(allowDuplicates: boolean, wordLength: number, wordList: string[]) {
  const filteredWords: string[] = wordList.filter((word) => {
      if (!allowDuplicates) {
        const letterCounts: Record<string, boolean> = {};
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
