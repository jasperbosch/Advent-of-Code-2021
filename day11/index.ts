import {readFileSync} from 'fs';

const prod = true;

let flashes = 0;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}


function printMatrix(matrix: number[][]): void {
    matrix.forEach(line => {
        console.log(line.join(''));
    });
    console.log('----------');
}

function addOne(matrix: number[][], i: number, j: number): void {
    if (i >= 0 && i < 10 && j >= 0 && j < 10) {
        if (matrix[i][j] != 0) {
            matrix[i][j]++;
            checkFlash(matrix, i, j);
        }
    }
}

function checkFlash(matrix: number[][], i: number, j: number): void {
    if (matrix[i][j] > 9) {
        matrix[i][j] = 0;
        flashes++;
        addOne(matrix, i - 1, j - 1);
        addOne(matrix, i - 1, j);
        addOne(matrix, i - 1, j + 1);
        addOne(matrix, i, j - 1);
        addOne(matrix, i, j + 1);
        addOne(matrix, i + 1, j - 1);
        addOne(matrix, i + 1, j);
        addOne(matrix, i + 1, j + 1);
    }
}

function main() {
    const lines = readFile();

    let matrix: number[][] = [];

    lines.forEach(line => {
        matrix.push(line.split('').map(value => +value));
    });

    for (let t = 0; t < 100; t++) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                matrix[i][j]++;
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                checkFlash(matrix, i, j);
            }
        }

        console.log(t);
        printMatrix(matrix);

    }
    console.log(flashes);


    matrix = [];

    lines.forEach(line => {
        matrix.push(line.split('').map(value => +value));
    });

    let allFlash = false;
    let step = 0;
    while (!allFlash) {
        step++;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                matrix[i][j]++;
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                checkFlash(matrix, i, j);
            }
        }

        allFlash = true;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (matrix[i][j] > 0) {
                    allFlash = false;
                    break;
                }
            }
        }
        console.log(step);
        printMatrix(matrix);
    }

    console.log(step);


}

main();
