const prod = true;

function main() {
    let start: number[] = [];
    const score = [0, 0];

    if (prod) {
        start = [7, 9];
    } else {
        start = [4, 8];
    }

    let dice = 0;
    let totalRoles=0;
    const pos: number[] = [start[0], start[1]];
    while (score[0] < 1000 && score[1] < 1000) {
        let move = 0;
        let roled = '';
        for (let role = 1; role < 4 && (score[0] < 1000 && score[1] < 1000); role++) {
            move += role + dice;
            roled += `${role + dice},`;
            totalRoles++;
        }
        let newPos = pos[0] + move;
        newPos = newPos % 10;
        if (newPos === 0) newPos = 10;
        score[0] += newPos;
        pos[0] = newPos;
        dice += 3;
        console.log(`Player 1 roles ${roled} ande moves to space ${pos[0]} for a total score of ${score[0]}`);

        if (score[0] < 1000 && score[1] < 1000) {
            move = 0;
            roled = '';
            for (let role = 1; role < 4 && (score[0] < 1000 && score[1] < 1000); role++) {
                move += role + dice;
                roled += `${role + dice},`;
                totalRoles++;
            }
            newPos = pos[1] + move;
            newPos = newPos % 10;
            if (newPos === 0) newPos = 10;
            score[1] += newPos;
            pos[1] = newPos;
            dice += 3;
        }
        console.log(`Player 2 roles ${roled} ande moves to space ${pos[1]} for a total score of ${score[1]}`);
    }

    if (score[0] > score[1]) {
        console.log(`Player 1 won, score: ${score[1] * totalRoles} (${score[1]}*${totalRoles})`);
    } else {
        console.log(`Player 2 won, score: ${score[0] * totalRoles} (${score[0]}*${totalRoles})`);

    }

}

main();
