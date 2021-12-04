import {readFileSync} from 'fs';

function readFile() {
    const stringInput = readFileSync('input.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function filterOxygen(value: string, lines: string[], index: number) {
    let zeros = 0;
    let ones = 0;
    lines.forEach(line => {
        if (line.substr(index, 1) === '0') {
            zeros++;
        } else {
            ones++;
        }
    });
    if (zeros > ones) {
        return value.substr(index, 1) === '0';
    }
    return value.substr(index, 1) === '1';
}

function filterCo2(value: string, lines: string[], index: number) {
    let zeros = 0;
    let ones = 0;
    lines.forEach(line => {
        if (line.substr(index, 1) === '0') {
            zeros++;
        } else {
            ones++;
        }
    });
    if (zeros > ones) {
        return value.substr(index, 1) === '1';
    }
    return value.substr(index, 1) === '0';
}

function main() {
    const lines = readFile();

    const report: { zeros: number, ones: number }[] = [];

    lines.forEach(line => {
        line.split('').forEach((bit, index) => {
            try {
                report[index][bit === '0' ? 'zeros' : 'ones']++;
            } catch (e) {
                report[index] = {zeros: 0, ones: 0};
                report[index][bit === '0' ? 'zeros' : 'ones']++;
            }
        });
    });

    let most = '';
    let least = '';
    report.forEach((entry) => {
        if (entry.zeros > entry.ones) {
            most += '0';
            least += '1';
        } else {
            most += '1';
            least += '0';
        }
    });
    // console.log(report);
    // console.log(most, least);
    // console.log(parseInt(most, 2), parseInt(least, 2));
    // console.log(parseInt(most, 2) * parseInt(least, 2));

    let filtered = lines;
    for (let i = 0; i < lines[0].length && filtered.length > 1; i++) {
        filtered = filtered.filter(value => {
            return filterOxygen(value, filtered, i)
        });
    }

    const oxygen = parseInt(filtered[0], 2);

    filtered = lines;
    for (let i = 0; i < lines[0].length && filtered.length > 1; i++) {
        filtered = filtered.filter(value => {
            return filterCo2(value, filtered, i)
        });
        console.log(filtered);
    }

    const co2 = parseInt(filtered[0], 2);

    console.log(oxygen, co2);
    console.log(oxygen * co2);

}

main();
