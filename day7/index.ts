import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function calculateFuel(distance: number): number {
    let total = 0;
    for (let n = 1; n <= distance; n++) {
        total += 1 * n;
    }
    return total;
}

function main() {
    const lines = readFile();

    const positions: number[] = lines[0].split(',').map(value => +value);

    const maxPos = Math.max(...positions);

    const fuelNeeded: number[] = [];
    for (let p = 0; p <= maxPos; p++) {
        fuelNeeded.push(0);
        for (let a = 0; a < positions.length; a++) {
            fuelNeeded[p] += Math.abs(positions[a] - p);
        }
    }
    console.log(Math.min(...fuelNeeded));

    const fuelNeeded2: number[] = [];
    for (let p = 0; p <= maxPos; p++) {
        fuelNeeded2.push(0);
        for (let a = 0; a < positions.length; a++) {
            fuelNeeded2[p] += calculateFuel(Math.abs(positions[a] - p));
        }
    }
    console.log(Math.min(...fuelNeeded2));

}

main();
