import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function getPos(x: number, y: number) {
    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i].x === x && coordinates[i].y === y) {
            return i;
        }
    }
    return -1;
}

function drawPage() {
    page.forEach(value => {
        let line = '';
        value.forEach(value1 => {
            line += value1 ? '#' : '.';
        });
        console.log(line);
    });
}

const coordinates: { x: number, y: number }[] = [];
const instructions: { direction: string, line: number }[] = [];
const page: boolean[][] = [];

function main() {
    const lines: string[] = readFile();

    let maxX = 0;
    let maxY = 0;

    lines
        .filter(line => line.indexOf(',') >= 0)
        .forEach(line => {
            const cords = line.split(',');
            coordinates.push({x: +cords[0], y: +cords[1]});
            maxX = Math.max(maxX, +cords[0]);
            maxY = Math.max(maxY, +cords[1]);
        });

    lines
        .filter(line => line.indexOf('=') >= 0)
        .forEach(line => {
            const parts = line.split(' ');
            const instr = parts[2].split('=');
            instructions.push({direction: instr[0], line: +instr[1]});
        });

    for (let y = 0; y <= maxY; y++) {
        page[y] = [];
        for (let x = 0; x <= maxX; x++) {
            page[y].push(getPos(x, y) >= 0);
        }
    }

    drawPage();

    console.log('                 ');
    console.log('                 ');
    console.log('                 ');

    instructions.forEach((instruction, index) => {
            if (instruction.direction === 'y') {
                // fold horizontal
                for (let y = maxY ; y > instruction.line; y--) {
                    const move2line = instruction.line - (y - instruction.line);
                    for (let x = 0; x <= maxX; x++) {
                        if (page[y][x]) {
                            page[move2line][x] = true;
                        }
                    }
                    page.splice(y, 1);
                    maxY--;
                }
            } else if (instruction.direction === 'x') {
                // fold vertical
                for (let x = maxX ; x > instruction.line; x--) {
                    const move2line = instruction.line - (x - instruction.line);
                    for (let y = 0; y <= maxY; y++) {
                        if (page[y][x]) {
                            page[y][move2line] = true;
                        }
                        page[y].splice(x, 1);
                    }
                    maxX--;
                }
            }
    });

    drawPage();

    let aantal = 0;
    for (let y = 0; y < page.length; y++) {
        for (let x = 0; x <= maxX; x++) {
            if (page[y][x]) {
                aantal++;
            }
        }
    }
    console.log(aantal);


}

main();
