import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function printPicture(picture: boolean[][]): void {
    console.log('');
    picture.forEach(line => {
        let printLine = '';
        line.forEach(value => printLine += (value ? '#' : '.'));
        console.log(printLine);
    });
}

function growPicture(picture: boolean[][]): void {
    const width = picture[0].length;
    const newLine: boolean[] = [];
    const newLine2: boolean[] = [];
    for (let x = 0; x < width + 2; x++) {
        newLine.push(false);
        newLine2.push(false);
    }
    picture.forEach(line => {
        line.unshift(false);
        line.push(false);
    });
    picture.unshift(newLine);
    picture.push(newLine2);
}

function main() {
    const lines = readFile();

    const algorithm = lines[0];
    // console.log('alg', algorithm);
    lines.shift();
    lines.shift();
    let basePicture: boolean[][] = [];
    let newPicture: boolean[][] = [];
    lines.forEach(line => {
        basePicture.push(line.split('').map(value => (value === '#')));
    });

    // printPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);
    growPicture(basePicture);


    newPicture = JSON.parse(JSON.stringify(basePicture));
    printPicture(newPicture);


    for (let t = 0; t < 2; t++) {
        for (let y = 1; y < basePicture.length - 1; y++) {
            for (let x = 1; x < basePicture[y].length - 1; x++) {

                let zoekString = '';
                for (let i = y - 1; i < y + 2; i++) {
                    for (let j = x - 1; j < x + 2; j++) {
                        zoekString += basePicture[i][j] ? '1' : '0';
                        // console.log(y, x, i, j, zoekString);
                    }
                }
                const zoekPos = parseInt(zoekString, 2);
                // console.log(y, x, zoekString, zoekPos, algorithm.substring(zoekPos, zoekPos + 1));
                // console.log(y, x, algorithm.substring(zoekPos, zoekPos + 1));
                if (zoekPos >= 0) {
                    newPicture[y][x] = algorithm.substring(zoekPos, zoekPos + 1) === '#';
                }
            }
        }
        printPicture(newPicture);
        basePicture = JSON.parse(JSON.stringify(newPicture));
        // growPicture(basePicture);
        // newPicture = JSON.parse(JSON.stringify(basePicture));
        // printPicture(newPicture);
    }

    let counter = 0;
    for (let y = 0; y < basePicture.length; y++) {
        for (let x = 0; x < basePicture[y].length; x++) {
            if (newPicture[y][x]) {
                counter++;
            }
        }
    }
    console.log(counter, basePicture.length);
    counter -= basePicture.length;
    counter += 2;
    console.log(counter, basePicture[0].length);
    counter -= basePicture[0].length;
    counter += 2;

    console.log(counter);


    let a = parseInt('000000000', 2);
    console.log(a, algorithm.substring(a, a + 1));
    a = parseInt('111111111', 2);
    console.log(a, algorithm.substring(a, a + 1));

}

main();
