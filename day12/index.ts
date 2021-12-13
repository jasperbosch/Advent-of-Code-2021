import {readFileSync} from 'fs';

const prod = true;

const connections: Map<string, string[]> = new Map<string, string[]>();
const paths: string[][] = [];

function readFile(): string[] {
    const stringInput = readFileSync(prod ? 'input.txt' : 'test.txt', 'utf-8');
    const input = stringInput.split('\r\n');
    input.pop();
    return input;
}


function addConnection(caveA: string, caveB: string) {
    if (connections.has(caveA)) {
        const connection = connections.get(caveA);
        if (!connection!.find(c => c === caveB)) {
            connection!.push(caveB);
        }
    } else {
        connections.set(caveA, [caveB]);
    }
}

function isConnectionAllowed(connection: string, path: string[]): boolean {
    if (connection === 'start') {
        return false;
    } else if (connection.toLowerCase() === connection) {
        let foundDouble = false;
        let foundSingle = false;
        for (let i = 1; i < path.length - 1 && !foundDouble; i++) {
            if (path[i].toLowerCase() === path[i]) {
                for (let j = i + 1; j < path.length && !foundDouble; j++) {
                    foundDouble = path[i] === path[j];
                    if (foundDouble) {
                        console.log('**', i, j, path[i], path[j], connection);
                    }
                }
            }
        }
        for (let i = 1; i < path.length - 1; i++) {
            if (path[i] === connection) {
                foundSingle = true;
            }
        }

        return !foundDouble || !foundSingle;
    }
    // niet gevonden
    return true;
}

function findPath(connection: string, path: string[]): void {
    // console.log(path.join('-'), connection);

    if (connection === 'end') {
        paths.push([...path, 'end']);
    } else if (isConnectionAllowed(connection, path)) {
        path.push(connection);
        connections.get(connection)!.forEach(subconnection => {
            // console.log('sub', connection, subconnection);
            findPath(subconnection, [...path]);
        });
    }
}

function main() {
    const lines = readFile();

    lines.forEach(line => {
        const caves = line.split('-');
        addConnection(caves[0], caves[1]);
        addConnection(caves[1], caves[0]);
    });

    connections.get('start')!.forEach(connection => {
        findPath(connection, ['start']);
    });

    console.log(connections);
    console.log('-----');
    paths.forEach(path => {
        console.log(path.join(','));
    });
    console.log(paths.length);

}

main();
