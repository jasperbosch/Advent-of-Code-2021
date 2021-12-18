import {readFileSync} from 'fs';

const prod = true;


function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function hex2bin(hex: string) {
    return ('0000' + (parseInt(hex, 16)).toString(2)).substr(-4);
}

let output = '';
let total = 0;
let expressions: number[] = [];
const exp = ['sum', 'product', 'min', 'max', '', '>', '<', '==='];

function doeIets(id: number, values: number[]) {
    let iets = 0;
    let start = -1;
    switch (id) {
        case 0:
            for (const val of values) {
                iets += val;
            }
            break;
        case 1:
            iets = 1;
            for (const val of values) {
                iets *= val;
            }
            break;
        case 2:
            iets = Infinity;
            for (const val of values) {
                iets = Math.min(iets, val);
            }
            break;
        case 3:
            for (const val of values) {
                iets = Math.max(iets, val);
            }
            break;
        case 5:
            for (const val of values) {
                if (start === -1) {
                    start = val;
                } else {
                    if (val < start) {
                        iets = 1;
                    } else {
                        iets = 0;
                    }
                    start = val;
                }
            }
            break;
        case 6:
            for (const val of values) {
                if (start === -1) {
                    start = val;
                } else {
                    if (val > start) {
                        iets = 1;
                    } else {
                        iets = 0;
                    }
                    start = val;
                }
            }
            break;
        case 7:
            for (const val of values) {
                if (start === -1) {
                    start = val;
                } else {
                    if (val === start) {
                        iets = 1;
                    } else {
                        iets = 0;
                    }
                    start = val;
                }
            }
            break;
    }
    return iets;
}

function processOutput(op: string, times = Infinity): any[] {
    const values: number[] = [];

    while (op.length > 0 && times > 0 && op.replace(/0/g, '').trim().length > 0) {
        const version = parseInt(op.substring(0, 3), 2);
        op = op.substring(3);
        total += version;

        const type = parseInt(op.substring(0, 3), 2);
        op = op.substring(3);

        let message = '';
        if (type === 4) {
            // value
            while (op.startsWith('1')) {
                message += op.substring(1, 5);
                op = op.substring(5);
            }
            message += op.substring(1, 5);
            values.push(parseInt(message, 2));
            op = op.substring(5);
        } else {
            // operator
            const id = op.substring(0, 1);
            op = op.substring(1);

            let length = 0;
            let retValues = 0;
            if (id === '0') {
                length = parseInt(op.substring(0, 15), 2);
                op = op.substring(15);
                const tmp = processOutput(op.substring(0, length));
                retValues = tmp[1];
                op = op.substring(length);
            } else {
                length = parseInt(op.substring(0, 11), 2);
                op = op.substring(11);
                const tmp = processOutput(op, length);
                op = tmp[0];
                retValues = tmp[1];
            }
            // @ts-ignore
            values.push(doeIets(type, retValues));
        }
        times--;
    }
    console.log(values);
    return [op, values];
}

function main() {
    const lines = readFile();

    let input = lines[0];

    // input = '8A004A801A8002F478';
    // input = '620080001611562C8802118E34';
    // input = 'C0015000016115A2E0802F182340';
    // input = 'A0016C880162017C3686B18A3D4780';

    // input = 'C200B40A82';
    // input = '04005AC33890';
    // input = '880086C3E88112';
    // input = 'CE00C43D881120';
    // input = 'D8005AC2A8F0';
    // input = 'F600BC2D8F';
    // input = '9C005AC2F8F0';
    // input = '9C0141080250320F1802104A08';

    // input = 'D2FE28';
    // input = '38006F45291200';
    // input = 'EE00D40C823060';

    input.split('').forEach(value => {
        output += hex2bin(value);
    });


    processOutput(output);


    console.log(total);
}

main();
