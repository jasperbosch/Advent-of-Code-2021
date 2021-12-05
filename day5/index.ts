import {readFileSync} from 'fs';

const prod = true;

let maxX = 0;
let maxY = 0;
const vectors: {
    from: { x: number, y: number };
    to: { x: number, y: number };
}[] = [];

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function processLines(lines: string[]): void {
    lines.forEach(line => {
        const parts = line.split(' -> ');
        const fromParts = parts[0].split(',');
        const toParts = parts[1].split(',');
        vectors.push({from: {x: +fromParts[0], y: +fromParts[1]}, to: {x: +toParts[0], y: +toParts[1]}});
        if (+fromParts[0] > maxX) {
            maxX = +fromParts[0];
        }
        if (+toParts[0] > maxX) {
            maxX = +toParts[0];
        }
        if (+fromParts[1] > maxY) {
            maxY = +fromParts[1];
        }
        if (+toParts[1] > maxY) {
            maxY = +toParts[1];
        }
    });
}

function drawYLine(vector: { from: { x: number; y: number }; to: { x: number; y: number } }, board: number[][]) {
    const from = Math.min(vector.from.y, vector.to.y);
    const to = Math.max(vector.from.y, vector.to.y);
    for (let y = from; y <= to; y++) {
        board[vector.from.x][y]++;
    }
}

function drawXLine(vector: { from: { x: number; y: number }; to: { x: number; y: number } }, board: number[][]) {
    const from = Math.min(vector.from.x, vector.to.x);
    const to = Math.max(vector.from.x, vector.to.x);
    for (let x = from; x <= to; x++) {
        board[x][vector.from.y]++;
    }
}

function drawXYLine(vector: { from: { x: number; y: number }; to: { x: number; y: number } }, board: number[][]) {
    let aimX = -1;
    let aimY = -1;
    // let steps = vector.from.x - vector.to.x;
    if (vector.from.x < vector.to.x) {
        aimX = 1;
    }
    if (vector.from.y < vector.to.y) {
        aimY = 1;
    }
    let stop = false;
    let step = 0;
    while (!stop) {
        board[vector.from.x + (aimX * step)][vector.from.y + (aimY * step)]++;
        step++;
        stop = aimX === 1 ? vector.from.x + (aimX * step) > vector.to.x : vector.from.x + (aimX * step) < vector.to.x;
    }
}

function drawBoard(board: number[][]): void {
    for (let y = 0; y <= maxY; y++) {
        console.log(board[0][y], board[1][y], board[2][y], board[3][y], board[4][y], board[5][y], board[6][y], board[7][y], board[8][y], board[9][y]);
    }
}

function main() {
    const lines = readFile();

    processLines(lines);

    const board: number[][] = [];
    const board2: number[][] = [];
    for (let x = 0; x <= maxX; x++) {
        board[x] = [];
        board2[x] = [];
        for (let y = 0; y <= maxX; y++) {
            board[x][y] = 0;
            board2[x][y] = 0;
        }
    }
    console.log(maxX, maxY, vectors);

    vectors.forEach(vector => {
        if (vector.from.x === vector.to.x || vector.from.y === vector.to.y) {
            if (vector.from.x === vector.to.x) {
                drawYLine(vector, board);
                drawYLine(vector, board2);
            } else {
                drawXLine(vector, board);
                drawXLine(vector, board2);
            }
        } else {
            drawXYLine(vector, board2);
        }
    });

    drawBoard(board);

    let overlap = 0;
    board.forEach(line => {
        line.forEach(col => {
            if (col >= 2) {
                overlap++;
            }
        });
    });

    console.log('Overlap', overlap);

    drawBoard(board2);

    let overlap2 = 0;
    board2.forEach(line2 => {
        line2.forEach(col2 => {
            if (col2 >= 2) {
                overlap2++;
            }
        });
    });

    console.log('Overlap', overlap2);
}

main();
