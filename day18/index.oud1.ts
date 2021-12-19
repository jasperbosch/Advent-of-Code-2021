import {readFileSync} from 'fs';

const prod = false;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function boom(value: any, depth: number, parent: any) {
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
        } else {
            boom(value[p], depth + 1, value);
        }
    }
}

function explode(value: any[]) {
    boom(value, 0, undefined);
}

function split(value: any[]) {

}

function reduce(value: any[]) {
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
