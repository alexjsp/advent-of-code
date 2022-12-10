// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const instructions: string[] = data.toString().split("\n");

var cycleCount = 0;
var x = 1;
var sum = 0;
var picture = "";

function incrementCycleCount() {
    picture += Math.abs((cycleCount % 40) - x) <= 1 ? "█" : " ";
    cycleCount++;
    if (cycleCount % 40 == 0) { picture += "\n"; }
    if ((cycleCount-20) % 40 == 0) {
        const signalStrength = cycleCount * x;
        // console.log("Signal strength during "+cycleCount+"th cycle is "+cycleCount+" * "+x+" == "+signalStrength);
        sum += signalStrength;
    }
} 

for (const i of instructions) {
    const parts = i.split(" ");
    const instruction = parts[0];
    const value = parseInt(parts[1]);
    if (instruction == "noop") {
        incrementCycleCount();
        continue;
    }
    
    if (instruction == "addx") {
        incrementCycleCount();
        incrementCycleCount();
        x += value;
    }
}
console.log("Part 1: " + sum);

// Part 2
console.log("Part 2: \n" + picture);
