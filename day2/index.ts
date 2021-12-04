import {readFileSync} from 'fs';

function readFile() {
    const stringInput = readFileSync('input.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function main() {
    const lines = readFile();
    let distance = 0;
    let depth = 0;
    lines.forEach(line => {
        console.log(line);
        const command = line.split(' ');
        switch (command[0]) {
            case 'forward':
                distance += +command[1];
                break;
            case 'down':
                depth += +command[1];
                break;
            case 'up':
                depth -= +command[1];
                break;
        }
        console.log('depth', depth, 'distance', distance);
    });
    console.log('Answer', distance * depth);

    distance = 0;
    depth = 0;
    let aim = 0;
    lines.forEach(line => {
        console.log(line);
        const command = line.split(' ');
        switch (command[0]) {
            case 'forward':
                distance += +command[1];
                depth += +command[1] * aim;
                break;
            case 'down':
                aim += +command[1];
                break;
            case 'up':
                aim -= +command[1];
                break;
        }
        console.log('depth', depth, 'distance', distance);
    });
    console.log('Answer', distance * depth);
}

main();
