import {readFileSync} from 'fs';

const prod = false;


function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function explode(value: string) {
    let open = 0;
    let counter = 0;
    let stop = false;
    while (!stop) {
        // console.log(counter, prevPos, value.substring(counter, counter + 1), value);
        if (value.substring(counter, counter + 1) === '[') {
            open++;
        } else if (value.substring(counter, counter + 1) === ']') {
            open--;
        } else if (value.substring(counter, counter + 1) === ',') {
            // open--;
        } else {
            if (open > 4) {
                let startpos = counter;
                const pair = value.substring(counter, counter + 5);
                const result = /\d{1,3},\d{1,3}/g.exec(pair);
                if (result) {
                    const parts = result[0].split(',');
                    // console.log(result[0]);
                    // console.log(value.substring(counter), result[0]);
                    // console.log(result[0]);
                    let prevPos = -1;
                    for (let p = counter - 1; p > 0; p--) {
                        if (/\d{1,3}/.test(value.substring(p, p + 1))) {
                            prevPos = p;
                            break;
                        }
                    }
                    if (prevPos >= 0) {
                        let len = 1;
                        while (!isNaN(parseInt(value.substring(prevPos - 1, prevPos)))) {
                            prevPos--;
                            len++;
                        }
                        // add to previous
                        let nValue = parseInt(value.substring(prevPos, prevPos + len));
                        // nValue += parseInt(value.substring(counter, counter + 1));
                        const replaceLength = nValue > 99 ? 3 : nValue > 9 ? 2 : 1;
                        nValue += parseInt(parts[0]);
                        value = value.substring(0, prevPos) + nValue + value.substring(prevPos + replaceLength);
                        startpos += ('' + nValue).length - len;
                    }
                    let nextPos = -1;
                    for (let p = counter + result[0].length + 1; p < value.length; p++) {
                        const regexpNumber = /\d{1,3}/;
                        if (regexpNumber.test(value.substring(p, p + 1))) {
                            nextPos = p;
                            break;
                        }
                    }
                    if (nextPos > 0) {
                        // add to next
                        let nValue = parseInt(value.substring(nextPos, nextPos + 2));
                        const replaceLength = nValue > 99 ? 3 : nValue > 9 ? 2 : 1;
                        nValue += parseInt(parts[1]);
                        value = value.substring(0, nextPos) + nValue + value.substring(nextPos + replaceLength);
                    }
                    if (prevPos > 0 || nextPos > 0) {
                        value = value.substring(0, startpos - 1) + '0' + value.substring(startpos + result[0].length + 1);
                    }
                    break;
                }
            }
        }
        counter++;
        stop = value.length < counter;
    }
    return value;
}

function split(value: string) {
    let counter = 0;
    let stop = false;
    while (!stop) {

        const result = /^\d{2,3}/.exec(value.substring(counter));


        if (result) {
            const sValue = parseInt(result[0]);
            const aValue = Math.floor(sValue / 2);
            const bValue = Math.ceil(sValue / 2);
            value = value.substring(0, counter) + `[${aValue},${bValue}]` + value.substring(counter + result[0].length);
            // console.log(sValue, aValue, bValue);
            break;
        }
        counter++;
        stop = value.length - 1 < counter;
    }
    return value;

}

function reduce(value: string) {
    let counter = 0;
    let oldValue = '';
    let oldValue2 = '';

    while (oldValue2 != value) {
        oldValue2 = value;
        // oldValue = '';
        while (oldValue != value) {
            oldValue = value;
            value = explode(value);
            console.log('*', counter, value);
        }
        oldValue = '';

        value = split(value);
        console.log('+', counter++, value);

    }
    return value;
}


function main() {
    let lines: string[] = [];

    let numbers: string[] = [];

    let test____ = '[[[[[9,8],1],2],3],4]';
    let expected = '[[[[0,9],2],3],4]';
    let testnr = 0;
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, test____);
    //
    // test____ = '[7,[6,[5,[4,[3,2]]]]]';
    // expected = '[7,[6,[5,[7,0]]]]';
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, test____);
    //
    // test____ = '[[6,[5,[4,[3,2]]]],1]';
    // expected = '[[6,[5,[7,0]]],3]';
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, test____);
    //
    // test____ = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
    // expected = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]';
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, test____);
    //
    // test____ = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]';
    // expected = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]';
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, test____);
    //
    //
    // // test____ = '[[[[[[[[[[[25,0]]],[[10,[1,2]],[[1,4],2]]],[[[5,[2,8]],4],[5,[[9,9],0]]]],[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]],[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]],[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]],[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]],[[[[5,4],[7,7]],8],[[8,3],8]]],[[9,3],[[9,9],[6,[4,9]]]]],[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]],[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]]';
    // // expected = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]';
    // // test____ = reduce(test____);
    // // console.log(testnr++, test____ === expected, test____);
    //
    //
    // numbers = [];
    // lines = ['[1,1]', '[2,2]', '[3,3]', '[4,4]'];
    // test____ = '';
    // expected = '[[[[1,1],[2,2]],[3,3]],[4,4]]';
    // lines.forEach((line, index) => {
    //     if (index > 0) {
    //         test____ = `[${test____},${line}]`;
    //     } else {
    //         test____ = line;
    //     }
    //     test____ = reduce(test____);
    // });
    // console.log(testnr++, test____ === expected, expected);
    //
    // numbers = [];
    // lines = ['[1,1]', '[2,2]', '[3,3]', '[4,4]', '[5,5]'];
    // test____ = '';
    // expected = '[[[[3,0],[5,3]],[4,4]],[5,5]]';
    // lines.forEach((line, index) => {
    //     if (index > 0) {
    //         test____ = `[${test____},${line}]`;
    //     } else {
    //         test____ = line;
    //     }
    //     test____ = reduce(test____);
    // });
    // console.log(testnr++, test____ === expected, expected);
    //
    // numbers = [];
    // lines = ['[1,1]', '[2,2]', '[3,3]', '[4,4]', '[5,5]', '[6,6]'];
    // test____ = '';
    // expected = '[[[[5,0],[7,4]],[5,5]],[6,6]]';
    // lines.forEach((line, index) => {
    //     if (index > 0) {
    //         test____ = `[${test____},${line}]`;
    //     } else {
    //         test____ = line;
    //     }
    //     test____ = reduce(test____);
    // });
    // console.log(testnr++, test____ === expected, expected);
    //
    // numbers = [];
    // lines = [
    //     '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
    //     '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
    //     '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
    //     '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
    //     '[7,[5,[[3,8],[1,4]]]]',
    //     '[[2,[2,2]],[8,[8,1]]]',
    //     '[2,9]',
    //     '[1,[[[9,3],9],[[9,0],[0,7]]]]',
    //     '[[[5,[7,4]],7],1]',
    //     '[[[[4,2],2],6],[8,7]]'
    // ];
    // test____ = '';
    // expected = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]';
    // lines.forEach((line, index) => {
    //     if (index > 0) {
    //         test____ = `[${test____},${line}]`;
    //     } else {
    //         test____ = line;
    //     }
    //     test____ = reduce(test____);
    // });
    // console.log(testnr++, '--', test____);
    // console.log(testnr++, '--', expected);
    // console.log(testnr++, test____ === expected);


    // test____ = '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]';
    // expected = reduce(test____);
    // console.log(testnr++, test____ === expected, expected);
    //
    //
    // test____ = '[[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]]';
    // expected = '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]';
    // test____ = reduce(test____);
    // console.log(testnr++, test____ === expected, expected);


    lines = readFile();
    lines.forEach(line => {
        numbers.push(line);
    });

    let result = '';
    while (numbers.length > 1) {
        numbers[1] = `[${numbers[0]},${numbers[1]}]`;
        numbers.shift();
        result = reduce(numbers[0]);
    }

    console.log(result);

    let magnitudes = /\[\d{1,3},\d{1,3}\]/gm.exec(result);
    while (magnitudes !== null) {
        const search = magnitudes[0];
        const parts = search.substring(1).split(',');
        const varA = parseInt(parts[0]);
        const varB = parseInt(parts[1]);
        const replace = `${varA * 3 + varB * 2}`;
        result = result.replace(search, replace);
        magnitudes = /\[\d{1,3},\d{1,3}\]/gm.exec(result);
    }

    console.log(result)
}

main();
