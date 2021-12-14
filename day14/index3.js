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
function add2map(char, mapObj, value) {
    if (mapObj.has(char)) {
        let tmp = mapObj.get(char);
        tmp += value;
        mapObj.set(char, tmp);
    }
    else {
        mapObj.set(char, value);
    }
}
function template2polymer(template) {
    const polymer = new Map();
    for (let i = 0; i < template.length - 1; i++) {
        add2map(template.substring(i, i + 2), polymer, BigInt(1));
    }
    return polymer;
}
function sum(map) {
    let sum = BigInt(0);
    map.forEach(value => sum += value);
    return sum;
}
function main() {
    const lines = readFile();
    const template = lines.shift();
    lines.shift();
    lines.forEach(line => {
        const rule = line.split(' -> ');
        rules.set(rule[0], rule[1]);
    });
    let polymer = template2polymer(template);
    for (let i = 0; i < 40; i++) {
        const poly = new Map();
        polymer.forEach((value, key) => {
            add2map(key[0] + rules.get(key), poly, value);
            add2map(rules.get(key) + key[1], poly, value);
        });
        console.log(i, sum(poly));
        polymer = poly;
    }
    // console.log(polymer);
    const occurs = new Map();
    let total = BigInt(0);
    polymer.forEach((value, key) => {
        console.log(key, value, rules.get(key));
        if (total === BigInt(0)) {
            add2map(key[0], occurs, value);
        }
        add2map(key[1], occurs, value);
        total += value;
    });
    let minValue = BigInt(9007199254740991);
    let maxValue = BigInt(0);
    occurs.forEach((value) => {
        if (minValue > value)
            minValue = value;
        if (maxValue < value)
            maxValue = value;
    });
    console.log(maxValue, minValue, maxValue - minValue, total);
}
main();
