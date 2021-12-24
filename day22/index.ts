import {readFileSync} from 'fs';

const prod = false;

interface Instruction {
    status: string;
    xFrom: number;
    xTo: number;
    yFrom: number;
    yTo: number;
    zFrom: number;
    zTo: number;
}

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}


function main() {
    const lines = readFile();
    const instructions: Instruction[] = [];

    lines.forEach(line => {
        const parts = line.split(' ');
        const inst: Instruction = {status: parts[0], xFrom: 0, xTo: 0, yFrom: 0, yTo: 0, zFrom: 0, zTo: 0};
        const coords = parts[1].split(',');
        coords.forEach(coord => {
            const cp = coord.split('=');
            const fromTo = cp[1].split('..');
            switch (cp[0]) {
                case 'x':
                    inst.xFrom = +fromTo[0];
                    inst.xTo = +fromTo[1];
                    break;
                case 'y':
                    inst.yFrom = +fromTo[0];
                    inst.yTo = +fromTo[1];
                    break;
                case 'z':
                    inst.zFrom = +fromTo[0];
                    inst.zTo = +fromTo[1];
                    break;
            }
        });
        instructions.push(inst);
    });

    let trues = BigInt(0);

    instructions.forEach((instruction, index) => {
        for (let z = instruction.zFrom; z <= instruction.zTo; z++) {
            for (let y = instruction.yFrom; y <= instruction.yTo; y++) {
                for (let x = instruction.xFrom; x <= instruction.xTo; x++) {
                    let inRange = false;
                    let state = false;
                    for (let i = 0; i < index; i++) {
                        if (x >= instructions[i].xFrom && x <= instructions[i].xTo &&
                            y >= instructions[i].yFrom && y <= instructions[i].yTo &&
                            z >= instructions[i].zFrom && z <= instructions[i].zTo) {
                            state = instructions[i].status === 'on';
                            inRange = true;
                        }
                    }
                    if (!inRange && instruction.status === 'on') trues++;
                    if (inRange) {
                        if (instruction.status === 'off' && state) {
                            trues--;
                        } else if (instruction.status === 'on' && !state) {
                            trues++;
                        }
                    }
                }
            }
        }
    });


    console.log(trues);

}

main();
