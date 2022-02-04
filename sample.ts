import { closestNWordsToSubspace, randomSubspace } from "./word_utils/word"

const subspace = randomSubspace(1);
const words = closestNWordsToSubspace(
    subspace, 20
    )
    console.log(words)