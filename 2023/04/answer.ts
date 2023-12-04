// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines: string[] = data.toString().split("\n");

const verbose = false;

var totalPoints = 0;

// Part 1
for (const line of lines) {
    const card = parseLine(line);
    var points = (card.numberOfWinningNumbers > 0 ? Math.pow(2, card.numberOfWinningNumbers-1) : 0);
    if (verbose) {
        console.log(`${card.card} has ${card.numberOfWinningNumbers} winning numbers (${card.myWinningNumbers}) so it is worth ${points} points.`);
    }
    totalPoints += points;
}

if (verbose) {
    console.log("");
}

console.log(`Part 1: ${totalPoints}`);

if (verbose) {
    console.log("============================================================================");
}


// Part 2

var cardTotals: any = {};

// Loop through from the bottom up so it doesn't get exponentially crazy.
for (var x = lines.length - 1; x >= 0; x--) {
    const line = lines[x];
    const card = parseLine(line);
    
    // 1 for the card itself
    if (cardTotals[card.card] == null) {
        cardTotals[card.card] = 1;
    }
    
    // Add the total from Z lower cards where Z is how many winning numbers are on this card.
    for (var c = x + 1; c < x + 1 + card.numberOfWinningNumbers; c++) {
        const lowerLine = lines[c];
        const lowerCard = parseLine(lowerLine);
        cardTotals[card.card] += cardTotals[lowerCard.card];
    }
}

if (verbose) {
    console.log(cardTotals);
    console.log("");
}

var totalCardsProcessed = 0;
for (const cardName in cardTotals) {
    const cardTotal = cardTotals[cardName];
    totalCardsProcessed += cardTotal;
}

console.log(`Part 2: ${totalCardsProcessed}`);

function parseLine(line: string) {
    const sections = line.split(/[:|]/g);
    const card = sections[0];
    const winningNumbers = (sections[1].match(/(\d+)/g) || []).map((n) => parseInt(n));
    const myNumbers = (sections[2].match(/(\d+)/g) || []).map((n) => parseInt(n));
    const myWinningNumbers = myNumbers.filter((n) => winningNumbers.includes(n));
    const numberOfWinningNumbers = myWinningNumbers.length;
    
    return {card: card, myWinningNumbers: myWinningNumbers, numberOfWinningNumbers: numberOfWinningNumbers};
}
