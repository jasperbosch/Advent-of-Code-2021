import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

const rules: Map<string, string> = new Map<string, string>();

function add2map(char: string, mapObj: Map<string, bigint>, value: bigint) {
    if (mapObj.has(char)) {
        let tmp = mapObj.get(char)!;
        tmp += value;
        mapObj.set(char, tmp);
    } else {
        mapObj.set(char, value);
    }
}

function template2polymer(template: string): Map<string, bigint> {
    const polymer: Map<string, bigint> = new Map<string, bigint>();
    for (let i = 0; i < template.length - 1; i++) {
        add2map(template.substring(i, i + 2), polymer, BigInt(1));
    }
    return polymer;
}

function sum(map: Map<string, bigint>): bigint {
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


    let polymer = template2polymer(template!);
    for (let i = 0; i < 40; i++) {
        const poly: Map<string, bigint> = new Map<string, bigint>();
        polymer.forEach((value, key) => {
            add2map(key[0] + rules.get(key), poly, value);
            add2map(rules.get(key) + key[1], poly, value);
        });
        console.log(i, sum(poly));
        polymer = poly;
    }
    // console.log(polymer);

    const occurs: Map<string, bigint> = new Map<string, bigint>();
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
        if (minValue > value) minValue = value;
        if (maxValue < value) maxValue = value;
    });

    console.log(maxValue, minValue, maxValue - minValue, total);

}

main();
