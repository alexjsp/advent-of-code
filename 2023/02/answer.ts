// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const gameStrings: string[] = data.toString().split("\n");

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

var part1Total = 0;
var part2Total = 0;
for (const gameString of gameStrings) {
    const gameId = parseInt([...gameString.matchAll(/Game (\d+):/g)][0][1]);
    const reds = [...gameString.matchAll(/(\d+) red/g)].map((x) => parseInt(x[1]));
    const greens = [...gameString.matchAll(/(\d+) green/g)].map((x) => parseInt(x[1]));
    const blues = [...gameString.matchAll(/(\d+) blue/g)].map((x) => parseInt(x[1]));
    
    // Part 1
    if (!reds.some((x) => x > maxRed)
        && !greens.some((x) => x > maxGreen)
        && !blues.some((x) => x > maxBlue)) {
        part1Total += gameId;
    }
    
    // Part 2
    const largestRed = Math.max(...reds);
    const largestGreen = Math.max(...greens);
    const largestBlue = Math.max(...blues);
    part2Total += largestRed * largestGreen * largestBlue;
}
console.log(`Part 1: ${part1Total}`);
console.log(`Part 2: ${part2Total}`);
