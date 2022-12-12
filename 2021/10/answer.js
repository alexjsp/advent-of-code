// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var lines = data.toString().split("\n").map(l => l.split(""));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
var syntaxErrorScore = 0;
var completionScores = new Array();
for (var i = 0; i < lines.length; i++) {
	var line = lines[i];
	var brackets = new Array();
	var illegalChar = null;
	for (var j = 0; j < line.length; j++) {
		var char = line[j];
		if (char == "(" || char == "[" || char == "{" || char == "<") { 
			brackets.push(char);
		}
		else if (char == ")" && brackets[brackets.length - 1] == "(") { brackets.pop(); }
		else if (char == "]" && brackets[brackets.length - 1] == "[") { brackets.pop(); }
		else if (char == "}" && brackets[brackets.length - 1] == "{") { brackets.pop(); }
		else if (char == ">" && brackets[brackets.length - 1] == "<") { brackets.pop(); }
		else {
			illegalChar = char;
			break;
		}
	}

	if (illegalChar == null) {
		// Part 2
		var lineScore = 0;
		for (var j = brackets.length - 1; j >= 0; j--) {
			lineScore *= 5;
			var c = brackets[j];
			if (c == "(") { lineScore += 1; }
			else if (c == "[") { lineScore += 2; }
			else if (c == "{") { lineScore += 3; }
			else if (c == "<") { lineScore += 4; }
		}
		completionScores.push(lineScore);
	}
	else {
		// Part 1
		if (illegalChar == ")") { syntaxErrorScore += 3; }
		if (illegalChar == "]") { syntaxErrorScore += 57; }
		if (illegalChar == "}") { syntaxErrorScore += 1197; }
		if (illegalChar == ">") { syntaxErrorScore += 25137; }
	}
}
console.log("Answer: " + syntaxErrorScore);
console.log("");
console.log("--------- Part 2 ---------");
completionScores.sort(function(a, b) {
	return a - b;
});
console.log("Answer: " + completionScores[(completionScores.length-1) / 2]);