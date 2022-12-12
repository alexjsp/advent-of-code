// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var commands = data.toString().split("\n").filter(x => x.length > 0).map(x => x.split(" "));

// Part 1
var horizontal = 0;
var depth = 0;
for (var i = 0; i < commands.length; i++)
{
	var command = commands[i][0];
	var distance = parseInt(commands[i][1]);
	switch(command) {
		case "forward":
			horizontal += distance;
			break;
		case "down":
			depth += distance;
			break;
		case "up":
			depth -= distance;
			break;
	}
}

console.log("");
console.log("--------- Part 1 ---------");
console.log("Horizontal Position: " + horizontal);
console.log("Depth: " + depth);
console.log("Answer: " + (horizontal * depth));

// Part 2
var horizontal = 0;
var depth = 0;
var aim = 0;
for (var i = 0; i < commands.length; i++)
{
	var command = commands[i][0];
	var distance = parseInt(commands[i][1]);
	switch(command) {
		case "forward":
			horizontal += distance;
			depth += aim * distance; 
			break;
		case "down":
			aim += distance;
			break;
		case "up":
			aim -= distance;
			break;
	}
}
console.log("");
console.log("--------- Part 2 ---------");
console.log("Horizontal Position: " + horizontal);
console.log("Depth: " + depth);
console.log("Final Aim: " + aim);
console.log("Answer: " + (horizontal * depth));