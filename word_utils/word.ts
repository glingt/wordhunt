type WordVector = number[];

type Subspace = WordVector[];

export const dot = function(wv1 : WordVector, wv2 : WordVector) : number {
    const n = wv1.length;
    let sum:number = 0;
    for(let i = 0; i < n; i ++) {
        sum += wv1[i]*wv2[i]
    }
    return sum;
}

export const norm = function(wv1: WordVector):number {
    return Math.sqrt(dot(wv1, wv1));
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
export const similarity = function(wv1: WordVector, wv2: WordVector) {
    return dot(wv1, wv1) / (norm(wv1) * norm(wv2));
}

export const project = function(wv: WordVector, subspace: Subspace) {
    return subspace.map(
        v => dot(v, wv)
    )
}

export const randomWordVector = function(dims: number) {
    const res = new Array(dims);
    for(let i = 0; i < dims; i++) {
        res[i] = Math.random()*2 - 1;
    }
    return res;
}