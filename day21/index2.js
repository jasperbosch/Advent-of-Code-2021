"use strict";
const prod = false;
const wins = [BigInt(0), BigInt(0)];
let counter = BigInt(0);
function processRoll(pos, score, x, y, z, p) {
    counter++;
    pos[p] += x + y + z;
    pos[p] = pos[p] % 10;
    if (pos[p] === 0)
        pos[p] = 10;
    score[p] += pos[p];
    // console.log(`${counter} Player ${p + 1} roles ${x},${y},${z} ande moves to space ${pos[p]} for a total score of ${score[p]}`);
    // if (counter < 1000)
    if (counter % BigInt(10000000) === BigInt(0))
        console.log(counter, wins);
    rollDice(pos, score);
}
function rollDice(pos, score) {
    if (score[0] < 21 && score[1] < 21) {
        // Player 1
        let move = 0;
        for (let x = 1; x < 4; x++) {
            for (let y = 1; y < 4; y++) {
                for (let z = 1; z < 4; z++) {
                    processRoll([...pos], [...score], x, y, z, 0);
                }
            }
        }
        // Player 2
        for (let x = 1; x < 4; x++) {
            for (let y = 1; y < 4; y++) {
                for (let z = 1; z < 4; z++) {
                    processRoll([...pos], [...score], x, y, z, 1);
                }
            }
        }
    }
    else if (score[0] > 21) {
        wins[0]++;
    }
    else {
        wins[1]++;
    }
}
function main() {
    let start = [];
    if (prod) {
        start = [7, 9];
    }
    else {
        start = [4, 8];
    }
    const score = [0, 0];
    rollDice(start, score);
    console.log(wins);
}
main();
