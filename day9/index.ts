import {readFileSync} from 'fs';

const prod = true;

const basins: { x: number, y: number }[][] = [];
const heights: number[][] = [];

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function findBasin(x: number, y: number): number {
    for (let a = 0; a < basins.length; a++) {
        for (let b = 0; b < basins[a].length; b++) {
            if (basins[a][b].x === x && basins[a][b].y === y) {
                return a;
            }
        }
    }
    return -1;
}

function add2Basin(x: number, y: number, basinIndex: number): void {
    basins[basinIndex].push({x: x, y: y});
    if (y - 1 >= 0 && heights[y - 1][x] < 9) {
        if (findBasin(x, y - 1) < 0) {
            add2Basin(x, y - 1, basinIndex);
        }
    }
    if (y + 1 < heights.length && heights[y + 1][x] < 9) {
        if (findBasin(x, y + 1) < 0) {
            add2Basin(x, y + 1, basinIndex);
        }
    }
    if (x - 1 >= 0 && heights[y][x - 1] < 9) {
        if (findBasin(x - 1, y) < 0) {
            add2Basin(x - 1, y, basinIndex);
        }
    }
    if (x + 1 < heights[y].length && heights[y][x + 1] < 9) {
        if (findBasin(x + 1, y) < 0) {
            add2Basin(x + 1, y, basinIndex);
        }
    }
}

function main() {
    const lines = readFile();


    lines.forEach(line => {
        heights.push(line.split('').map(value => +value));
    });

    let total = 0;
    for (let y = 0; y < heights.length; y++) {
        for (let x = 0; x < heights[y].length; x++) {
            let low = true;
            low = low && (y - 1 < 0 || heights[y][x] < heights[y - 1][x]);
            low = low && (y + 1 >= heights.length || heights[y][x] < heights[y + 1][x]);
            low = low && (x - 1 < 0 || heights[y][x] < heights[y][x - 1]);
            low = low && (x + 1 >= heights[y].length || heights[y][x] < heights[y][x + 1]);
            if (low) {
                console.log(heights[y][x]);
                total += (heights[y][x] + 1);
            }
        }
    }
    console.log(total);


    for (let y = 0; y < heights.length; y++) {
        for (let x = 0; x < heights[y].length; x++) {
            if (heights[y][x] < 9) {
                if (findBasin(x, y) < 0) {
                    basins.push([]);
                    add2Basin(x, y, basins.length - 1);
                }
            }
        }
    }

    const orderdBasins = basins.map(value => value.length).sort((a, b) => b - a);
    const answer = orderdBasins[0]*orderdBasins[1]*orderdBasins[2];
    console.log(answer);

}

main();
