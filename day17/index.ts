const prod = true;

const minX = prod ? 60 : 20;
const maxX = prod ? 94 : 30;
const minY = prod ? -171 : -10;
const maxY = prod ? -136 : -5;


function isInRange(x: number, y: number): boolean {
    // console.log(x, y, x >= minX, x <= maxX, y > minY, y <= maxY, x >= minX && x <= maxX && y > minY && y <= maxY);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
}

function isOutOfRange(x: number, y: number): boolean {
    return x > maxX || y < minY;
}

function main() {


    let x = 0;
    let y = 0;

    let maxH = 0;
    let counter = 0;
    let velocities = 0;

    for (let vx = 1; vx <= maxX; vx++) {
        for (let vy = minY; vy <= minY * -1; vy++) {
            x = 0;
            y = 0;
            let veloX = vx;
            let veloY = vy;
            let height = 0;
            while (!isOutOfRange(x, y)) {
                // console.log(x, y, vx, vy, maxX, maxY, isInRange(x, y), isOutOfRange(x, y));
                // console.log(x,y,veloX,veloY)
                counter++;
                x += veloX;
                y += veloY;
                height = Math.max(height, y);

                veloX--;
                if (veloX < 0) veloX = 0;
                veloY--;
                if (isInRange(x, y)) {
                    maxH = Math.max(maxH, height);
                    // console.log(x,y ,vx, vy);
                    velocities++;
                    break;
                }
                // if (height < maxH && y < height) break;
            }
        }
    }

    console.log(maxH, counter, velocities);

}

main();
