import {readFileSync} from 'fs';

const prod = true;

class Digit {
    a = false;
    b = false;
    c = false;
    d = false;
    e = false;
    f = false;
    g = false;
}

class Position {
    a = '';
    b = '';
    c = '';
    d = '';
    e = '';
    f = '';
    g = '';
}

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function str2digit(segment: string): Digit {
    const digit: any = new Digit();
    segment.split('').forEach(part => {
        digit[part] = true;
    });
    return digit;
}

function main() {
    const lines = readFile();

    let total = 0;
    lines.forEach(line => {
        const segments = line.split('|');
        const output = segments[1].split(' ');
        output.forEach(segment => {
            const length = segment.length;
            if (length === 2 || length === 3 || length === 4 || length === 7) {
                total++;
            }
        });
    });
    console.log(total);

    let superTotal = 0;

    lines.forEach(line => {
        console.log(line);
        const digits: Digit[] = [];
        const positions: Position = new Position();
        const digitMap: Map<number, any> = new Map<number, any>();
        const segments = line.split('|');
        const output = segments[1].split(' ');
        const input = segments[0].split(' ');
        [...input, ...output].forEach(segment => {
            const length = segment.length;
            let digit: Digit;
            switch (length) {
                case 2:
                    digit = str2digit(segment);
                    digitMap.set(1, digit);
                    break;
                case 3:
                    digit = str2digit(segment);
                    digitMap.set(7, digit);
                    break;
                case 4:
                    digit = str2digit(segment);
                    digitMap.set(4, digit);
                    break;
                case 7:
                    digit = str2digit(segment);
                    digitMap.set(8, digit);
                    break;
            }
        });
        // Pos a is het verschil tussen 7 en 1
        Object.getOwnPropertyNames(digitMap.get(7)).forEach(name => {
            if (digitMap.get(7)[name] && !digitMap.get(1)[name]) {
                positions.a = name;
            }
        });
        // 3 is lengte van 5 waarbij 1 volledig aanwezig is.
        [...input, ...output].forEach(segment => {
            const length = segment.length;
            let digit: any;
            if (length === 5) {
                digit = str2digit(segment);
                Object.getOwnPropertyNames(digitMap.get(1)).forEach(name => {
                    if (digitMap.get(1)[name] && digit[name]) {
                        digitMap.set(3, digit);
                    }
                });
            }
        });
        // 6 is lengte van 6 waarbij 1 van de posities van 1 niet aanwezig is
        [...input, ...output].forEach(segment => {
            const length = segment.length;
            let digit: any;
            if (length === 6) {
                digit = str2digit(segment);
                Object.getOwnPropertyNames(digitMap.get(1)).forEach(name => {
                    if (digitMap.get(1)[name] && !digit[name]) {
                        digitMap.set(6, digit);
                    }
                });
            }
        });
        // Als we 6 hebben, weten we ook wat pos c en f moeten zijn
        Object.getOwnPropertyNames(digitMap.get(1)).forEach(name => {
            if (digitMap.get(1)[name]) {
                if (digitMap.get(6)[name]) {
                    positions.f = name;
                } else {
                    positions.c = name;
                }
            }
        });
        // als we 1 weten, dan kunnen we ook 2 en 5 bepalen
        [...input, ...output].forEach(segment => {
            const length = segment.length;
            let digit: any;
            if (length === 5) {
                digit = str2digit(segment);
                // console.log(segment, digit.a, digit.b, digit.c, digit.d, digit.e, digit.f, digit.g);
                if (digit[positions.c] && !digit[positions.f]) {
                    digitMap.set(2, digit);
                } else if (!digit[positions.c] && digit[positions.f]) {
                    digitMap.set(5, digit);
                } else {
                    // deze hebben we al gehad.
                    digitMap.set(3, digit);
                }
            }
        });
        // We kunnen nu b en e bepalen
        Object.getOwnPropertyNames(digitMap.get(2)).forEach(name => {
            if (digitMap.get(2)[name] && !digitMap.get(5)[name]) {
                if (name !== positions.c) {
                    positions.e = name;
                }
            }
        });
        Object.getOwnPropertyNames(digitMap.get(5)).forEach(name => {
            if (digitMap.get(5)[name] && !digitMap.get(2)[name]) {
                if (name !== positions.f) {
                    positions.b = name;
                }
            }
        });
        [...input, ...output].forEach(segment => {
            const length = segment.length;
            let digit: any;
            if (length === 6) {
                digit = str2digit(segment);
                if (!digit[positions.e]) {
                    digitMap.set(9, digit);
                } else if (!digit[positions.c]) {
                    // deze hebben we al gehad.
                    // digitMap.set(6, digit);
                } else {
                    digitMap.set(0, digit);
                }
            }
        });
        let total = '';
        output.forEach(segment => {
            const digit = str2digit(segment);
            digitMap.forEach((value, key) => {
                // if (digit === value) {
                if (digit.a === value.a && digit.b === value.b && digit.c === value.c && digit.d === value.d && digit.e === value.e && digit.f === value.f && digit.g === value.g) {
                    total += '' + key;
                }
            });
        });
        console.log(total);
        superTotal += +total;
    });

    console.log(superTotal);

}

main();
