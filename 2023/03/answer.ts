// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines: string[] = data.toString().split("\n");
const grid = lines.map((line) => line.split(""));

var possibleGearLocations: any = {};

// Find all * locations that might be gears in Part 2.
for (const l in lines) {
    const lineNumber = parseInt(l);
    const line = lines[lineNumber];
    const stars = line.matchAll(/(\*)/g);
    for (const s of stars) {
        possibleGearLocations[`${lineNumber},${s.index || 0}`] = [];
    }
}

var total = 0;
for (const l in lines) {
    const lineNumber = parseInt(l);
    const line = lines[lineNumber];
    const numbers = line.matchAll(/(\d+)/g);
    for (const n of numbers) {
        const isPartNum = processPossiblePartNumber(n[0], lineNumber, n.index || 0);
        if (isPartNum) {
            total += parseInt(n[0]);
        }
    }
}
console.log(`Part 1: ${total}`);

var part2Total = 0;
for (const possibleGearCoords in possibleGearLocations) {
    const possibleGear = possibleGearLocations[possibleGearCoords];
    if (possibleGear.length == 2) {
        part2Total += possibleGear[0] * possibleGear[1];
    }
}
console.log(`Part 2: ${part2Total}`);

function processPossiblePartNumber(nString: string, lineNumber: number, index: number) {
    const nLength = nString.length;
    var result = false;
    for (var y = Math.max(lineNumber - 1, 0); y <= lineNumber + 1 && y < lines.length; y++) {
        for (var x = Math.max(index - 1, 0); x <= index + nLength && x < lines[lineNumber].length; x++) {
            const c = grid[y][x];
            if (c != "0" && c != "1" && c != "2" && c != "3" && c != "4" && c != "5" && c != "6" && c != "7" && c != "8" && c != "9" && c != ".") {
                result = true;
            }
            if (c == '*') {
                possibleGearLocations[`${y},${x}`].push(nString);
            }
        }
    }
    
    return result;
}
