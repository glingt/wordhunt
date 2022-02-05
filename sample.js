"use strict";
exports.__esModule = true;
var word_1 = require("./word_utils/word");
var subspace = word_1.randomSubspace(1);
// const words = closestNWordsToSubspace(
//     subspace, 20
//     )
var word = word_1.randomWord();
// console.log(word);
console.log(word[0]);
// console.log(pickWordStrings(nClosestWords(word, 10)))
console.log(word_1.closestNWords(word_1.getWord("young")));
