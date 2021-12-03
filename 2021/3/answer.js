// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var numbers = data.toString().split("\n").filter(x => x.length > 0).map(x => x.split(""));

// Part 1
var totalOnesPerPosition = Array();
for (var i = 0; i < numbers.length; i++) {
	var number = numbers[i];
	for (var j = 0; j < number.length; j++) {
		var currentValue = totalOnesPerPosition[j] == null ? 0 : totalOnesPerPosition[j];
		totalOnesPerPosition[j] = currentValue + parseInt(number[j]);
	}
}

console.log(totalOnesPerPosition);

var gammaRate = "";
var epsilonRate = "";
for (var i = 0; i < totalOnesPerPosition.length; i++) {
	var oneMoreCommon = totalOnesPerPosition[i] >= numbers.length/2;
	gammaRate += oneMoreCommon ? "1" : "0";
	epsilonRate += oneMoreCommon ? "0" : "1";
}
var gammaRateDecimal = parseInt(gammaRate, 2);
var epsilonRateDecimal = parseInt(epsilonRate, 2);

console.log("");
console.log("--------- Part 1 ---------");
console.log("Gamma Rate: " + gammaRate + " (" + gammaRateDecimal + ")");
console.log("Epsilon Rate: " + epsilonRate + " (" + epsilonRateDecimal + ")");
console.log("Answer: " + (gammaRateDecimal * epsilonRateDecimal));

// Part 2
console.log("");
console.log("--------- Part 2 ---------");
