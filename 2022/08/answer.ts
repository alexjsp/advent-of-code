// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines: string[] = data.toString().split("\n");
const trees: number[][] = lines.map(x => x.split("").map(y => parseInt(y)));

// This code is disgusting, and I'm not proud of it 😂

// Part 1
var visibleTrees = new Set<string>();
for (var x = 0; x < trees[0].length; x++) {
    var closerTreeValue = -1;
    for (var y = 0; y < trees.length; y++) {
        const treeValue = trees[y][x];
        if (treeValue > closerTreeValue) {
            visibleTrees.add(x+","+y);
            closerTreeValue = treeValue;
        }
    }
    
    var closerTreeValue = -1;
    for (var y = trees.length-1; y >= 0; y--) {
        const treeValue = trees[y][x];
        if (treeValue > closerTreeValue) {
            visibleTrees.add(x+","+y);
            closerTreeValue = treeValue;
        }
    }
}
for (var y = 0; y < trees.length; y++) {
    var closerTreeValue = -1;
    for (var x = 0; x < trees[y].length; x++) {
        const treeValue = trees[y][x];
        if (treeValue > closerTreeValue) {
            visibleTrees.add(x+","+y);
            closerTreeValue = treeValue;
        }
    }
    
    var closerTreeValue = -1;
    for (var x = trees[y].length-1; x >= 0; x--) {
        const treeValue = trees[y][x];
        if (treeValue > closerTreeValue) {
            visibleTrees.add(x+","+y);
            closerTreeValue = treeValue;
        }
    }
}
console.log("Part 1: " + visibleTrees.size + " trees are visible");

// Part 2
function calcScoreForPosition(startX: number, startY: number, trees: number[][]) {
    var leftDistance = 0;
    var ownHeight = trees[startY][startX];
    for (var x = startX - 1; x >= 0; x--) {
        const treeValue = trees[startY][x];
        leftDistance++;
        if (treeValue >= ownHeight) { break; }
    }
    
    var closerTreeValue = -1;
    var rightDistance = 0;
    for (var x = startX + 1; x < trees[startY].length; x++) {
        const treeValue = trees[startY][x];
        rightDistance++;
        if (treeValue >= ownHeight) { break; }
    }
    
    var closerTreeValue = -1;
    var upDistance = 0;
    for (var y = startY - 1; y >= 0; y--) {
        const treeValue = trees[y][startX];
        upDistance++;
        if (treeValue >= ownHeight) { break; }
    }
    
    var closerTreeValue = -1;
    var downDistance = 0;
    for (var y = startY + 1; y < trees.length; y++) {
        const treeValue = trees[y][startX];
        downDistance++;
        if (treeValue >= ownHeight) { break; }
    }
        
    return leftDistance * rightDistance * upDistance * downDistance;
}
var highestScore = -1;
for (var x = 1; x < trees[0].length-1; x++) {
    for (var y = 1; y < trees.length-1; y++) {
        const score = calcScoreForPosition(x, y, trees);
        if (score > highestScore) {
            highestScore = score;
        }
    }
}
console.log("Part 2: " + highestScore + " is the highest score possible.");