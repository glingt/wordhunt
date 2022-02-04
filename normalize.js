"use strict";
exports.__esModule = true;
var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
var word_1 = require("./word_utils/word");
// const { normalize }  = require( './word_utils/word');
var unnormalized = JSON.parse(readFileSync("./words.json").toString());
var normalized = writeFileSync('./normalized.json', JSON.stringify(Object.fromEntries(Object.entries(unnormalized).map(function (_a) {
    var word = _a[0], vector = _a[1];
    return [word, word_1.normalize(Object.values(vector))];
}))));
