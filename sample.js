"use strict";
exports.__esModule = true;
var word_1 = require("./word_utils/word");
var subspace = word_1.randomSubspace(1);
var words = word_1.closestNWordsToSubspace(subspace, 20);
console.log(words);
