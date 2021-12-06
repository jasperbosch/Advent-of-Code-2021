import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function main() {
    const lines = readFile();
    const numbers = lines[0].split(',').map(value => +value);

    console.log(lines[0]);

    // init fish
    const fish: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    numbers.forEach(nr => {
        fish[nr]++;
    });

    console.log(fish.join(','));

    for (let day = 1; day <= 256; day++) {
        for (let pos = 0; pos <= 9; pos++) {
            if (pos === 0) {
                fish[7] += fish[0];
                fish[9] = fish[0];
            } else {
                fish[pos - 1] = fish[pos];
            }
        }
        console.log(day, fish.join(','));
    }
    let total = 0;
    for (let pos = 0; pos <= 8; pos++) {
        total += fish[pos];
    }
    console.log(total);

}

main();
