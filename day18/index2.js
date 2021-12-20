"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const prod = false;
let prevValueWithNumber;
let updateNextValue = -1;
function readFile() {
    const stringInput = (0, fs_1.readFileSync)(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}
function explode(valueIn, depth, parent) {
    let retVal = -1;
    let isPair = true;
    if (Array.isArray(valueIn)) {
        let index = 0;
        for (const value of valueIn) {
            if (typeof value === 'number') {
                console.log('n', value);
                if (retVal >= 0) {
                    if (index === 0) {
                        if (typeof valueIn[0] === 'number') {
                            valueIn[0] += retVal;
                            retVal = -1;
                            updateNextValue = -1;
                        }
                    }
                    else {
                        if (typeof valueIn[1] === 'number') {
                            valueIn[1] += retVal;
                            retVal = -1;
                            updateNextValue = -1;
                        }
                    }
                }
            }
            else {
                isPair = false;
                console.log(depth, value);
                retVal = explode(value, depth + 1, valueIn);
                // if (retVal > 0) {
                //     if (updateNextValue === 0) {
                //         if (index === 0) {
                //             if (typeof valueIn[0] === 'number') {
                //                 valueIn[0] += retVal;
                //                 retVal = -1;
                //                 updateNextValue = -1;
                //             }
                //         } else {
                //             if (typeof valueIn[1] === 'number') {
                //                 valueIn[1] += retVal;
                //                 retVal = -1;
                //                 updateNextValue = -1;
                //             }
                //         }
                //     } else {
                //         updateNextValue--;
                //     }
                // }
            }
            if (isPair && depth >= 4) {
                console.log(isPair);
                if (prevValueWithNumber && index === 0) {
                    console.log(prevValueWithNumber);
                    if (typeof prevValueWithNumber[0] === 'number') {
                        prevValueWithNumber[0] += valueIn[0];
                    }
                    else if (typeof prevValueWithNumber[1] === 'number') {
                        prevValueWithNumber[1] += valueIn[0];
                    }
                }
                if (index === 1) {
                    retVal = valueIn[1];
                    updateNextValue = 1;
                }
                if (parent[0] === valueIn) {
                    parent[0] = 0;
                }
                else {
                    parent[1] = 0;
                }
            }
            else if (typeof value === 'number') {
                prevValueWithNumber = valueIn;
            }
            index++;
        }
    }
    return retVal;
}
function main() {
    const lines = readFile();
}
function test() {
    let testcounter = 0;
    let value = [[[[0, [1, 1]]]]];
    let expected = [[[[1, 0]]]];
    explode(value, 0, []);
    console.log(testcounter++, 'Explode left', JSON.stringify(value) === JSON.stringify(expected));
    value = [[[[[9, 8], 1], 2], 3], 4];
    expected = [[[[0, 9], 2], 3], 4];
    explode(value, 0, []);
    console.log(testcounter++, 'Explode left2', JSON.stringify(value) === JSON.stringify(expected));
    console.log(JSON.stringify(value));
    value = [[[[[1, 1], 0]]]];
    expected = [[[[0, 1]]]];
    explode(value, 0, []);
    console.log(testcounter++, 'Explode right', JSON.stringify(value) === JSON.stringify(expected));
    console.log(JSON.stringify(value));
}
test();
main();
