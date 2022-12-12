// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');

enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

type Instruction = {
    direction: Direction,
    distance: number
}

type Position = {
    x: number,
    y: number
}

function positionToString(position: Position) {
    return position.x+","+position.y;
}

const lines: string[] = data.toString().split("\n");
const instructions: Instruction[] = lines.map(i => {
    const parts = i.split(" ");
    return {
        direction: parts[0] as Direction,
        distance: parseInt(parts[1])
    };
});

function moveHeadPosition(head: Position, direction: Direction) {
    switch (direction) {
        case Direction.Up:
            return {x: head.x, y: head.y + 1}
        case Direction.Down:
            return {x: head.x, y: head.y - 1}
        case Direction.Left:
            return {x: head.x - 1, y: head.y}
        case Direction.Right:
            return {x: head.x + 1, y: head.y}
    }
}

function updateTrailingPosition(leading: Position, trailing: Position) {
    // If it's close enough, don't move
    if (Math.abs(leading.x - trailing.x) <= 1 && Math.abs(leading.y - trailing.y) <= 1) {
        return trailing;
    }
    
    var newX = trailing.x;
    var newY = trailing.y;
    
    if (trailing.x < leading.x) { newX++; }
    else if (trailing.x > leading.x) { newX--; }
    
    if (trailing.y < leading.y) { newY++; }
    else if (trailing.y > leading.y) { newY--; }
    
    return {x: newX, y: newY};
}

// Part 1
var headPosition: Position = {x:0,y:0};
var tailPosition: Position = {x:0,y:0};
var tailVisitedPositions = new Set<String>();

for (const instruction of instructions) {
    for (var i = 0; i < instruction.distance; i++) {
        headPosition = moveHeadPosition(headPosition, instruction.direction);
        tailPosition = updateTrailingPosition(headPosition, tailPosition);
        
        tailVisitedPositions.add(positionToString(tailPosition));
    }
}
console.log("Part 1: Tail visited " + tailVisitedPositions.size + " unique positions");

// Part 2
var headPosition: Position = {x:0,y:0};
var trailingPositions: Position[] = [];
for (var i = 0; i < 9; i++) { trailingPositions[i] = {x:0,y:0}; }
var tailVisitedPositions = new Set<String>();

for (const instruction of instructions) {
    for (var i = 0; i < instruction.distance; i++) {
        headPosition = moveHeadPosition(headPosition, instruction.direction);
        var leadingPos = headPosition;
        for (var j = 0; j < trailingPositions.length; j++) {
            trailingPositions[j] = updateTrailingPosition(leadingPos, trailingPositions[j]);
            leadingPos = trailingPositions[j];
        }
        
        tailVisitedPositions.add(positionToString(trailingPositions[trailingPositions.length - 1]));
    }
}
console.log("Part 2: Tail visited " + tailVisitedPositions.size + " unique positions");