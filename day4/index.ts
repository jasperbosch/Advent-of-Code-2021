import chalk from 'chalk';
import {readFileSync} from 'fs';

const prod = true;

let toDraw: number[] = [];
let toDrawOriginal: number[] = [];
let drawn: number[] = [];
const cards: number[][][] = [];
let bingoCard = 0;
const cardsWithBingo: number[] = [];

function readFile() {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function processLines(lines: string[]) {

    let card: number[][] = [];

    lines.forEach((line, index) => {
        if (index === 0) {
            toDraw = line.split(',').map(value => +value);
            toDrawOriginal = line.split(',').map(value => +value);
        } else if (line === '') {
            card = [];
            cards.push(card);
        } else {
            const row: number[] = line.replace(/\s\s/g, ' ').trim().split(' ').map(value => +value);
            card.push(row);
        }
    });

}

function drawNumber(): number {
    const draw: number = toDraw.shift()!;
    drawn.push(draw);
    return draw;
}

function checkForBingo(): boolean {
    let bingo = false;

    // Loop through cards
    for (let c = 0; c < cards.length && !bingo; c++) {
        // Loop through rows
        for (let r = 0; r < 5 && !bingo; r++) {
            // Loop through columns
            bingo = true;
            for (let k = 0; k < 5 && bingo; k++) {
                if (drawn.indexOf(cards[c][r][k]) < 0) {
                    bingo = false;
                }
            }
        }
        // Loop through columns
        for (let k = 0; k < 5 && !bingo; k++) {
            // Loop through rows
            bingo = true;
            for (let r = 0; r < 5 && bingo; r++) {
                if (drawn.indexOf(cards[c][r][k]) < 0) {
                    bingo = false;
                }
            }

        }
        if (bingo) {
            bingoCard = c;
        }
    }

    return bingo;
}

function checkForBingo2(): boolean {

    let bingo = false;

    // Loop through cards
    for (let c = 0; c < cards.length; c++) {
        if (cardsWithBingo.indexOf(c) < 0) {
            // Loop through rows
            for (let r = 0; r < 5 && !bingo; r++) {
                // Loop through columns
                bingo = true;
                for (let k = 0; k < 5 && bingo; k++) {
                    if (drawn.indexOf(cards[c][r][k]) < 0) {
                        bingo = false;
                    }
                }
            }
            // Loop through columns
            for (let k = 0; k < 5 && !bingo; k++) {
                // Loop through rows
                bingo = true;
                for (let r = 0; r < 5 && bingo; r++) {
                    if (drawn.indexOf(cards[c][r][k]) < 0) {
                        bingo = false;
                    }
                }
            }
            if (bingo) {
                bingoCard = c;
                cardsWithBingo.push(c);
                // console.log('**', c, drawn[drawn.length - 1], drawn.length, cardsWithBingo);
                // drawCard(c);
                bingo = false;
            }
        }
    }

    return bingo;
}

function mask(numbr: number): string {
    const tmp = ' ' + numbr;
    return tmp.substr(tmp.length - 2);
}

function isDrawn(numbr: number) {
    if (drawn.indexOf(numbr) >= 0) {
        return chalk.green(mask(numbr));
    } else {
        return chalk.red(mask(numbr));
    }
}

function drawCard(cardId: number): void {
    cards[cardId].forEach(row => {
        console.log(isDrawn(row[0]), isDrawn(row[1]), isDrawn(row[2]), isDrawn(row[3]), isDrawn(row[4]));
    });
}

function sumUnmarked(cardId: number): number {
    let sum = 0;
    cards[cardId].forEach(row => {
        row.forEach(numbr => {
            if (drawn.indexOf(numbr) < 0) {
                sum += numbr;
            }
        });
    });
    return sum;
}

function main() {
    const lines = readFile();

    processLines(lines);

    let bingo = false;

    let draw = 0;
    while (!bingo) {
        draw = drawNumber();
        bingo = checkForBingo();
    }
    console.log("First card with bingo",bingoCard);
    drawCard(bingoCard);
    let sum = sumUnmarked(bingoCard);
    console.log(sum, draw, sum * draw);


    // reset for part 2
    console.log(chalk.white("Part 2"));

    toDraw = toDrawOriginal;
    drawn = [];


    bingo = false;

    draw = 0;
    while (cardsWithBingo.length < cards.length && toDraw.length > 0) {
        draw = drawNumber();
        bingo = checkForBingo2();
    }
    console.log("Last card with bingo",bingoCard);
    drawCard(bingoCard);
    sum = sumUnmarked(bingoCard);

    console.log(sum, draw, sum * draw);

}

main();
