import {readFileSync} from 'fs';

const prod = true;


function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function matchSymbols(a: string, b: string): boolean {
    return a === '(' && b === ')' ||
        a === '[' && b === ']' ||
        a === '{' && b === '}' ||
        a === '<' && b === '>';
}

function isOpen(a: string): boolean {
    return ['(', '[', '{', '<'].indexOf(a) >= 0;
}


function main() {
    const lines = readFile();

    const pointsMap: Map<string, number> = new Map<string, number>();
    pointsMap.set(')', 3);
    pointsMap.set(']', 57);
    pointsMap.set('}', 1197);
    pointsMap.set('>', 25137);
    const points2Map: Map<string, number> = new Map<string, number>();
    points2Map.set('(', 1);
    points2Map.set('[', 2);
    points2Map.set('{', 3);
    points2Map.set('<', 4);

    let total = 0;
    let incompleteTotal: number[] = [];
    lines.forEach(line => {
        const openString: string[] = [];
        let corrupt = false;
        for (let p = 0; p < line.length && !corrupt; p++) {
            if (isOpen(line[p])) {
                openString.push(line[p]);
            } else {
                if (matchSymbols(openString[openString.length - 1], line[p])) {
                    openString.pop();
                } else {
                    // console.log(line[p]);
                    total += pointsMap.get(line[p])!;
                    corrupt = true;
                }
            }
        }
        if (!corrupt) {
            let lineTotal = 0;
            for (let i = openString.length - 1; i >= 0; i--) {
                lineTotal = lineTotal * 5;
                lineTotal += points2Map.get(openString[i])!;
            }
            incompleteTotal.push(lineTotal);
            console.log(lineTotal);
        }


    });

    console.log('corrupted', total);
    const ordered = incompleteTotal.sort((a, b) => a < b ? -1 : 1);
    console.log('incomplete', ordered[Math.floor(ordered.length / 2) ]);
}

main();
