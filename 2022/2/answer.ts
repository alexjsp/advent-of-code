// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const matchStrings: string[] = data.toString().split("\n");
const matchPairs = matchStrings.map(x => x.split(" ").map(y => stringToMove(y)));

enum Move {
    Rock = 1,
    Paper = 2,
    Scissors = 3
};

enum Outcome {
    Lose = 1,
    Draw = 2,
    Win = 3
};

// This is a bit cheeky with our enums, but to be fair it's annoying when Part 2 changes what things mean.
function stringToMove(moveString: string): number {
    if (moveString == "A" || moveString == "X") {
        return 1;
    }
    else if (moveString == "B" || moveString == "Y") {
        return 2;
    }
    else if (moveString == "C" || moveString == "Z") {
        return 3;
    }
    
    return 1;
}

function chooseResponse(opponent: Move, desiredOutcome: Outcome): Move {
    if (desiredOutcome == Outcome.Draw) { return opponent; }
    var move = 0;
    
    if (desiredOutcome == Outcome.Win) { move = opponent+1; }
    else if (desiredOutcome == Outcome.Lose) { move = opponent-1; }
    
    if (move < Move.Rock) { move = Move.Scissors; }
    else if (move > Move.Scissors) { move = Move.Rock; }
    
    return move;
}

function scoreForMatch(opponent: Move, response: Move): number {
    var score = 0;
    if (opponent == response) { score = 3; }
    else if (opponent + 1 == response || opponent == Move.Scissors && response == Move.Rock) { score = 6; }
    
    return score + response;
}

// Part 1
var totalScore = matchPairs.reduce((accumulator, match) => accumulator + scoreForMatch(match[0]!, match[1]!), 0);
console.log("Part 1: " + totalScore);

// Part 2
totalScore = matchPairs.reduce((accumulator, match) => accumulator + scoreForMatch(match[0]!, chooseResponse(match[0]!, match[1]!)), 0);
console.log("Part 2: " + totalScore);