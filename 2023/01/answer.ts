// Read the file
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
const lines: string[] = data.toString().split("\n");

// Part 1
const numberPairs = lines.map(x => {
    var matches = x.match(/\d/g) || [];
    return [matches[0], matches.at(-1)];
});
var total = 0;
numberPairs.forEach((pair) => total += parseInt(`${pair[0]}${pair[1]}`));
console.log(`Part 1: ${total}`);

// Part 2
const upgradedNumberPairs = lines.map(x => {
    const matches = [...x.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)]
                     .map((match) => match[1])
                     .map((match) => numberTextStringToIntString(match));
    return [matches[0], matches.at(-1)];
});
var total = 0;
upgradedNumberPairs.forEach((pair) => total += parseInt(`${pair[0]}${pair[1]}`));
console.log(`Part 2: ${total}`);

function numberTextStringToIntString(string: string) {
    return string.replace("one", "1")
    .replace("two", "2")
    .replace("three", "3")
    .replace("four", "4")
    .replace("five", "5")
    .replace("six", "6")
    .replace("seven", "7")
    .replace("eight", "8")
    .replace("nine", "9");
}