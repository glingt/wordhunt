
const {readFileSync, writeFileSync}  = require('fs');

import { normalize } from "./word_utils/word"

// const { normalize }  = require( './word_utils/word');

const unnormalized = JSON.parse(
        readFileSync(
            "./words.json"
        ).toString()
    )


const normalized = writeFileSync(
    './normalized.json',
    JSON.stringify(
        Object.fromEntries(
            Object.entries(unnormalized).map(
                ([word, vector]) => [word, normalize(Object.values(vector))]
            )
        )
    )
)