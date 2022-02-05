import {readFileSync} from 'fs';

export type WordVector = number[];

export type Subspace = WordVector[];
export type WordList = {[key in string]: WordVector};
export type Word = [string, WordVector];

export const dot = function(wv1 : WordVector, wv2 : WordVector) : number {
    const n = wv1.length;
    let sum:number = 0;
    for(let i = 0; i < n; i++) {
        sum += wv1[i]*wv2[i]
    }
    return sum;
}

export const norm = function(wv1: WordVector):number {
    return Math.sqrt(dot(wv1, wv1));
}

export const scalarMult = function(wv: WordVector, scalar: number) {
    const n = wv.length;
    const res = new Array(n);
    for(let i = 0; i < n; i ++) {
        res[i] = wv[i]*scalar;
    }
    return res;
}

export const subtract = function(wv1: WordVector, wv2:WordVector) {
    const n = wv1.length;
    const res = new Array(n);
    for(let i = 0; i < n; i ++) {
        res[i] = wv1[i] - wv2[i];
    }
    return res;
}
export const add = function(wv1: WordVector, wv2:WordVector) {
    const n = wv1.length;
    const res = new Array(n);
    for(let i = 0; i < n; i ++) {
        res[i] = wv1[i] + wv2[i];
    }
    return res;
}

export const metric = function(wv1:WordVector, wv2:WordVector) {
    return norm(
        subtract(wv1, wv2)
    )
}

export const normalize = function(wv1) {
    const n = wv1.length;
    const res = new Array(n);
    const invertedNorm = 1 / norm(wv1);

    for(let i = 0; i < n; i ++) {
        res[i] = wv1[i]*invertedNorm;
    }
    return res;
}

export const similarity = function(wv1: WordVector, wv2: WordVector): number {
    return dot(wv1, wv2) / (norm(wv1) * norm(wv2));
}

export const project = function(wv: WordVector, subspace: Subspace) {
    return subspace.map(
        v => scalarMult(v, dot(v, wv))
    ).reduce(add)
}

export const distanceToSubspace = function(wv: WordVector, subspace: Subspace) {
    const proj = project(wv, subspace);
    return metric(proj, wv)
}

export const randomWordVector = function(dims: number) : WordVector{
    const res = new Array(dims);
    for(let i = 0; i < dims; i++) {
        res[i] = Math.random()*2 - 1;
    }
    
    return normalize(res);
}

export const randomSubspace = function(dims: number) : Subspace {
    return [...(new Array(dims))].map(a => randomWordVector(300));
}

export const topNWordsBy = function(wordList: WordList, n: number, iteratee: (wordVector:WordVector)=>number) {
    return Object.entries(wordList).map(
        ([word, wordVector]) => [word, iteratee(wordVector)]
    ).sort(
        (a,b) => a[1] > b[1] ? - 1 : 1
    ).slice(0, n -1)
}

let wordList : WordList;
const WORD_LIST_PATH = "./normalized.json";

export const getWordList = function() {
    if(!wordList) {
        wordList = JSON.parse(readFileSync(WORD_LIST_PATH).toString())
    }
    return wordList;
}

export const randomWord = function() : Word{
    const keys = Object.keys(getWordList());
    const n = keys.length;
    const ix = Math.round(Math.random()*n);
    const key = keys[ix];
    return [key, getWordList()[key]];
}

export const getWord = function(wordString: string): Word {
    return [wordString, getWordList()[wordString.toUpperCase()]];
}

export const closestNWordsToSubspace = function(subspace:Subspace, n: number) {
    const wordList = getWordList();
    return topNWordsBy(wordList, n, (wv) => distanceToSubspace(wv, subspace))
}

export const closestNWords = function(word: Word, n: number = 10) {
    const [wordString, vector] = word;
    return topNWordsBy(
        getWordList(),
        n,
        v => similarity(v,vector)
    )
}

export const pickWordString = (word:Word) => word[0];
export const pickWordStrings = (words:Word[]) => words.map(word => word[0]);