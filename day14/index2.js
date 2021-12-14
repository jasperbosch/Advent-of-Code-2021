"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const prod = true;
function readFile() {
    const stringInput = (0, fs_1.readFileSync)(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}
const rules = new Map();
const occurs = new Map();
function add2occurs(char) {
    if (occurs.has(char)) {
        let tmp = occurs.get(char);
        tmp++;
        occurs.set(char, tmp);
    }
    else {
        occurs.set(char, BigInt(1));
    }
}
function grow(key, time) {
    if (time < 40) {
        const found = rules.get(key);
        add2occurs(found);
        const p1 = key.substring(0, 1) + found;
        const p2 = found + key.substring(1, 2);
        grow(p1, time + 1);
        grow(p2, time + 1);
    }
}
function main() {
    const lines = readFile();
    const template = lines.shift();
    lines.shift();
    lines.forEach(line => {
        const rule = line.split(' -> ');
        rules.set(rule[0], rule[1]);
    });
    // console.log(rules);
    console.log(template);
    for (let i = 0; i < template.length; i++) {
        add2occurs(template[i]);
    }
    for (let i = 0; i < template.length - 1; i++) {
        console.log(template.substring(i, i + 2));
        grow(template.substring(i, i + 2), 0);
    }
    console.log(occurs);
    let minValue = BigInt(9007199254740991);
    let maxValue = BigInt(0);
    occurs.forEach((value) => {
        if (minValue > value)
            minValue = value;
        if (maxValue < value)
            maxValue = value;
    });
    console.log(maxValue - minValue);
}
main();
