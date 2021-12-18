import {readFileSync} from 'fs';

const prod = true;

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

function readCheck(): string[] {
    const stringInput = readFileSync('check.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}

interface Risk {
    coord: string,
    value: number,
    left?: string,
    right?: string
}


const tree: Map<string, Risk> = new Map<string, Risk>();
const unvisited: string[] = [];
const distances: Map<string, number> = new Map<string, number>();

function procesDistance(key: string) {
    const node = tree.get(key);
    if (node) {
        const currDistance = distances.get(key);
        if (currDistance !== undefined) {
            // distances[key] = 0;

            if (node.left) {
                const nodeA = tree.get(node.left);
                distances.set(node.left, Math.min(distances.get(node.left)!, currDistance + +nodeA!.value));
            }
            if (node.right) {
                const nodeB = tree.get(node.right);
                distances.set(node.right, Math.min(distances.get(node.right)!, currDistance + +nodeB!.value));
            }

            unvisited.splice(unvisited.indexOf(node.coord), 1);
            const size = unvisited.length;
            if (size % 100 === 0) {
                console.log(unvisited.length, distances.size);
            }
        }
    }
}

function findSmallestUnvisitedNode() {
    let minValue = Infinity;
    let minValueProp = '-1';
    for (let x = 0; x < unvisited.length; x++) {
        const value = distances.get(unvisited[x]);
        if (value && value < minValue) {
            minValue = value;
            minValueProp = unvisited[x];
        }
    }

    return minValueProp;
}

function printmatrix() {
    matrix.forEach(line => {
        console.log(line.join(''));
    });
    console.log('---------------------------------------------');
}

let matrix: number[][] = [];
const cmatrix: number[][] = [];

function main() {
    const lines = readFile();

    lines.forEach((line, lindex) => {
        matrix.push([]);
        matrix[lindex] = line.split('').map(value => +value);
    });

    const mLenght = matrix.length;
    const lLength = matrix[0].length;


    const size = matrix.length;

    // printmatrix();

    for (let lindex = 0; lindex < size; lindex++) {
        matrix[lindex] = [
            ...JSON.parse(JSON.stringify(matrix[lindex])),
            ...JSON.parse(JSON.stringify(matrix[lindex])),
            ...JSON.parse(JSON.stringify(matrix[lindex])),
            ...JSON.parse(JSON.stringify(matrix[lindex])),
            ...JSON.parse(JSON.stringify(matrix[lindex]))
        ];
    }
    matrix = [
        ...JSON.parse(JSON.stringify(matrix)),
        ...JSON.parse(JSON.stringify(matrix)),
        ...JSON.parse(JSON.stringify(matrix)),
        ...JSON.parse(JSON.stringify(matrix)),
        ...JSON.parse(JSON.stringify(matrix))
    ];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let y = i * mLenght; y < (i + 1) * mLenght; y++) {
                for (let x = j * lLength; x < (j + 1) * lLength; x++) {
                    matrix[y][x] += i + j;
                    if (matrix[y][x] > 9) matrix[y][x] = matrix[y][x] % 9;
                }
            }
        }
    }


    if (!prod) {
        printmatrix();
        const clines = readCheck();

        clines.forEach((line, lindex) => {
            cmatrix.push([]);
            cmatrix[lindex] = line.split('').map(value => +value);
        });

        console.log(JSON.stringify(cmatrix) === JSON.stringify(matrix));

        for (let y = 0; y < 50; y++) {
            for (let x = 0; x < 50; x++) {
                if (matrix[y][x] !== cmatrix[y][x]) {
                    console.log(y, x, matrix[y][x], cmatrix[y][x]);
                }
            }
        }
    }

    matrix.forEach((line, lindex) => {
        line.forEach((value, vindex) => {
            let left, right;
            if (lindex + 1 < matrix.length) left = vindex + ',' + (lindex + 1);
            if (vindex + 1 < line.length) right = (vindex + 1) + ',' + lindex;
            tree.set(vindex + ',' + lindex, {
                coord: vindex + ',' + lindex,
                value: value,
                left: left,
                right: right
            });
            unvisited.push(vindex + ',' + lindex);
            distances.set(vindex + ',' + lindex, Infinity);
        });
    });

    distances.set('0,0', 0);
    unvisited.shift();

    procesDistance('0,0');
    while (unvisited.length > 0) {
        const currentNode = findSmallestUnvisitedNode();
        procesDistance(currentNode);
    }

    console.log(distances.get('49,49'));
    console.log(distances.get('499,499'));


}

main();
