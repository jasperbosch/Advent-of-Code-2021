import {readFileSync} from 'fs';

const prod = false ;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

const rules: Map<string, string> = new Map<string, string>();

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

    let value = template;
    for (let t = 0; t < 10; t++) {
        for (let i = 0; i < value!.length - 1; i = i + 2) {
            const find = value!.substring(i, i + 2);
            value = value!.substring(0, i + 1)
                + rules.get(find)
                + value!.substring(i + 1);
        }
        console.log(t, value!.length);
    }
    const occurs: Map<string, number> = new Map<string, number>();
    for (let i = 0; i < value!.length; i++) {
        if (occurs.has(value![i])) {
            let tmp: number = occurs.get(value![i])!;
            tmp++;
            occurs.set(value![i], tmp);
        } else {
            occurs.set(value![i], 1);
        }
    }
    console.log(occurs);
    let minValue = 999999999999999;
    let maxValue = 0;
    occurs.forEach((value, key) => {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    });

    console.log(maxValue - minValue);


}

main();
