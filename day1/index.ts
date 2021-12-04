import {readFileSync} from 'fs';

function readFile() {
    const stringInput = readFileSync('input.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function main() {
    const depths = readFile();
    let incr = 0;
    let decr = 0;
    for (let i = 1; i < depths.length; i++) {
        if (+depths[i] > +depths[i - 1]) {
            console.log(i, depths[i], 'increased');
            incr++;
        }
        if (+depths[i] < +depths[i - 1]) {
            console.log(i, depths[i], 'decreased');
            decr++;
        }
    }
    console.log('Increased', incr, 'Decreased', decr, incr + decr);

    incr = 0;
    decr = 0;
    for (let i = 1; i < depths.length - 1; i++) {
        const suma = +depths[i - 1] + +depths[i] + +depths[i + 1]
        const sumb = +depths[i] + +depths[i + 1] + +depths[i + 2]
        if (sumb > suma) {
            console.log(i, sumb, 'increased');
            incr++;
        }
        if (sumb < suma) {
            console.log(i, suma, 'decreased');
            decr++;
        }
        if (sumb === suma) {
            console.log(i, suma, 'no change');
            decr++;
        }
    }
    console.log('Increased', incr, 'Decreased', decr, incr + decr);
}

main();
