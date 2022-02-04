"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.closestNWordsToSubspace = exports.getWordList = exports.topNWordsBy = exports.randomSubspace = exports.randomWordVector = exports.distanceToSubspace = exports.project = exports.similarity = exports.normalize = exports.metric = exports.add = exports.subtract = exports.scalarMult = exports.norm = exports.dot = void 0;
var fs_1 = require("fs");
var dot = function (wv1, wv2) {
    var n = wv1.length;
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += wv1[i] * wv2[i];
    }
    return sum;
};
exports.dot = dot;
var norm = function (wv1) {
    return Math.sqrt(exports.dot(wv1, wv1));
};
exports.norm = norm;
var scalarMult = function (wv, scalar) {
    var n = wv.length;
    var res = new Array(n);
    for (var i = 0; i < n; i++) {
        res[i] = wv[i] * scalar;
    }
    return res;
};
exports.scalarMult = scalarMult;
var subtract = function (wv1, wv2) {
    var n = wv1.length;
    var res = new Array(n);
    for (var i = 0; i < n; i++) {
        res[i] = wv1[i] - wv2[i];
    }
    return res;
};
exports.subtract = subtract;
var add = function (wv1, wv2) {
    var n = wv1.length;
    var res = new Array(n);
    for (var i = 0; i < n; i++) {
        res[i] = wv1[i] + wv2[i];
    }
    return res;
};
exports.add = add;
var metric = function (wv1, wv2) {
    return exports.norm(exports.subtract(wv1, wv2));
};
exports.metric = metric;
var normalize = function (wv1) {
    var n = wv1.length;
    var res = new Array(n);
    var invertedNorm = 1 / exports.norm(wv1);
    for (var i = 0; i < n; i++) {
        res[i] = wv1[i] * invertedNorm;
    }
    return res;
};
exports.normalize = normalize;
var similarity = function (wv1, wv2) {
    return exports.dot(wv1, wv1) / (exports.norm(wv1) * exports.norm(wv2));
};
exports.similarity = similarity;
var project = function (wv, subspace) {
    return subspace.map(function (v) { return exports.scalarMult(v, exports.dot(v, wv)); }).reduce(exports.add);
};
exports.project = project;
var distanceToSubspace = function (wv, subspace) {
    var proj = exports.project(wv, subspace);
    return exports.metric(proj, wv);
};
exports.distanceToSubspace = distanceToSubspace;
var randomWordVector = function (dims) {
    var res = new Array(dims);
    for (var i = 0; i < dims; i++) {
        res[i] = Math.random() * 2 - 1;
    }
    return exports.normalize(res);
};
exports.randomWordVector = randomWordVector;
var randomSubspace = function (dims) {
    return __spreadArray([], (new Array(dims))).map(function (a) { return exports.randomWordVector(300); });
};
exports.randomSubspace = randomSubspace;
var topNWordsBy = function (wordList, n, iteratee) {
    return Object.entries(wordList).map(function (_a) {
        var word = _a[0], wordVector = _a[1];
        return [word, iteratee(wordVector)];
    }).sort(function (a, b) { return a[1] > b[1] ? 1 : -1; }).slice(0, n - 1);
};
exports.topNWordsBy = topNWordsBy;
var wordList;
var WORD_LIST_PATH = "./normalized.json";
var getWordList = function () {
    if (!wordList) {
        wordList = JSON.parse(fs_1.readFileSync(WORD_LIST_PATH).toString());
    }
    return wordList;
};
exports.getWordList = getWordList;
var closestNWordsToSubspace = function (subspace, n) {
    var wordList = exports.getWordList();
    return exports.topNWordsBy(wordList, n, function (wv) { return exports.distanceToSubspace(wv, subspace); });
};
exports.closestNWordsToSubspace = closestNWordsToSubspace;
