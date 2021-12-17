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

function doeIets(id: number, tmp: any[]) {
    let iets = 0;
    let start = -1;
    switch (id) {
        case 0:
            for (const val of tmp[1]) {
                iets += val;
            }
            break;
        case 1:
            iets = 1;
            for (const val of tmp[1]) {
                iets *= val;
            }
            break;
        case 2:
            iets = Infinity;
            for (const val of tmp[1]) {
                iets = Math.min(iets, val);
            }
            break;
        case 3:
            for (const val of tmp[1]) {
                iets = Math.max(iets, val);
            }
            break;
        case 5:
            for (const val of tmp[1]) {
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
            for (const val of tmp[1]) {
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
            for (const val of tmp[1]) {
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
        // read version
        const version = parseInt(op.substring(0, 3), 2);
        op = op.substring(3);
        // read ID
        const id = parseInt(op.substring(0, 3), 2);
        op = op.substring(3);
        let lengthId, length;
        let message = '';

        console.log(version, id, exp[id], values.join(','));
        switch (id) {
            case 4:
                while (op.startsWith('1')) {
                    message += op.substring(0, 5);
                    values.push(parseInt(message, 2));
                    op = op.substring(5);
                }
                message += op.substring(0, 5);
                values.push(parseInt(message, 2));
                op = op.substring(5);
                // console.log(version, id, parseInt(message, 2));
                break;
            default:
                expressions.push(id);
                lengthId = op.substring(0, 1);
                op = op.substring(1);
                if (lengthId === '0') {
                    length = parseInt(op.substring(0, 15), 2);
                    op = op.substring(15);
                    // console.log(version, id, lengthId, length, exp[id]);
                    message = op.substring(0, length);
                    op = op.substring(length);
                    const tmp = processOutput(message);
                    op = tmp[0];
                    const iets = doeIets(id, tmp);
                    values.push(iets);
                    // console.log(version, id, lengthId, length, exp[id], values);
                } else {
                    length = parseInt(op.substring(0, 11), 2);
                    op = op.substring(11);
                    // console.log(version, id, lengthId, length, exp[id]);
                    const tmp = processOutput(op, length);
                    op = tmp[0];
                    const iets = doeIets(id, tmp);
                    values.push(iets);
                    expressions.pop();
                    // console.log(version, id, lengthId, length, exp[id], values);
                }
                break;
        }
        times--;

        total += version;
        console.log(version, id,   exp[id], values.join(','));
    }
    return [op, values];
}

function main() {
    const lines = readFile();

    let input = lines[0];

    // input = 'C200B40A82';
    // input = '04005AC33890';
    // input = '880086C3E88112';
    // input = 'CE00C43D881120';
    // input = 'D8005AC2A8F0';
    // input = 'F600BC2D8F';
    // input = '9C005AC2F8F0';
    // input = '9C0141080250320F1802104A08';

    input.split('').forEach(value => {
        output += hex2bin(value);
    });


    processOutput(output);

    // while (output.length > 0) {
    //     // read version
    //     const version = parseInt(output.substring(0, 3), 2);
    //     output = output.substring(3);
    //     // read ID
    //     const id = parseInt(output.substring(0, 3), 2);
    //     output = output.substring(3);
    //     let lengthId, length;
    //     let message = '';
    //     const values: number[] = [];
    //
    //     switch (id) {
    //         case 4:
    //             while (output.startsWith('1')) {
    //                 message += output.substring(0, 5);
    //                 values.push(parseInt(message, 2));
    //                 output = output.substring(5);
    //             }
    //             message += output.substring(0, 5);
    //             values.push(parseInt(message, 2));
    //             output = output.substring(5);
    //             break;
    //         default:
    //             expressions.push(id);
    //             lengthId = output.substring(0, 1);
    //             output = output.substring(1);
    //             if (lengthId === '0') {
    //                 length = parseInt(output.substring(0, 15), 2);
    //                 output = output.substring(15);
    //                 // message = output.substring(0, length);
    //                 // output = output.substring(length );
    //             } else {
    //                 length = parseInt(output.substring(0, 11), 2);
    //                 output = output.substring(11);
    //                 // for (let i = 0; i < length; i++) {
    //                 //     message += output.substring(0, 11);
    //                 //     output = output.substring(11);
    //                 // }
    //             }
    //             break;
    //     }
    //     console.log(version, id, lengthId, length, exp[id],parseInt(message,2));
    //     total += version;
    // }

    console.log(total);
}

main();
