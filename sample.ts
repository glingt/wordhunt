import { closestNWordsToSubspace, closestNWords, pickWordString, pickWordStrings, randomSubspace, randomWord, getWord } from "./word_utils/word"

const subspace = randomSubspace(1);
// const words = closestNWordsToSubspace(
//     subspace, 20
//     )

const word = randomWord();

// console.log(word);
console.log(word[0]);

// console.log(pickWordStrings(nClosestWords(word, 10)))
console.log(closestNWords(getWord("young")))
