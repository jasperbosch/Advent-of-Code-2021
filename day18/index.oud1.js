"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const prod = false;
function readFile() {
    const stringInput = (0, fs_1.readFileSync)(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}
function boom(value, depth, parent) {
    for (let p = 0; p < 2; p++) {
        const wValue = value[p];
        if (typeof wValue === 'number') {
            if (depth === 4) {
                if (typeof parent[1] === 'number') {
                    console.log('value', value);
                    console.log('parent', parent);
                    parent[p === 0 ? 1 : 0] = parent[p === 0 ? 1 : 0] + wValue;
                    parent[p === 0 ? 0 : 1] = 0;
                    console.log('parent', parent);
                }
            }
        }
        else {
            boom(value[p], depth + 1, value);
        }
    }
}
function explode(value) {
    boom(value, 0, undefined);
}
function split(value) {
}
function reduce(value) {
    explode(value);
    split(value);
}
function main() {
    // const lines = readFile();
    //
    // const numbers: any[] = [];
    //
    // lines.forEach(line => {
    //     numbers.push(JSON.parse(line));
    // });
    //
    // while (numbers.length > 1) {
    //     numbers[1] = [...numbers[0], ...numbers[1]];
    //     numbers.shift();
    //     reduce(numbers[1]);
    // }
    // console.log(JSON.stringify(numbers));
    let test = JSON.parse('[[[[[9,8],1],2],3],4]');
    let expected = '[[[[0,9],2],3],4]';
    reduce(test);
    console.log(1, JSON.stringify(test) === expected);
    test = JSON.parse('[7,[6,[5,[4,[3,2]]]]]');
    expected = '[7,[6,[5,[7,0]]]]';
    reduce(test);
    console.log(2, JSON.stringify(test) === expected);
}
main();
