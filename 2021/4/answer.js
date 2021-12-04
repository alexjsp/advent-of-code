// Read the file
var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf8');
var boards = data.toString().split("\n\n");
var numbers = boards[0].split(",");
boards.shift();
boards = boards.map(x => x.split("\n").map(y => y.split(/\s+/).filter(x => x != '')).filter(x => x.length > 0));

// Part 1
console.log("");
console.log("--------- Part 1 ---------");
var winningState = getWinningState(numbers, boards);
var winningBoard = winningState.board;
var winningNumber = winningState.lastNumber;
console.log("Answer: " + getScoreForBoard(winningBoard, winningNumber));


// Part 2
console.log("");
console.log("--------- Part 2 ---------");
var lastWinState = getLastWinner(numbers, boards);
var lastWinBoard = lastWinState.board;
var lastWinNumber = lastWinState.lastNumber;
console.log("Answer: " + getScoreForBoard(lastWinBoard, lastWinNumber));


// Helpers
function getWinningState(numbers, boards) {
	for (var i = 0; i < numbers.length; i++) {
		var number = numbers[i];
		for (var j = 0; j < boards.length; j++) {
			var board = boards[j];
			markNumberInBoard(board, number);
			if (isBoardInWinState(board)) {
				return {board: board, lastNumber: number};
			}
		}
	}
}

function getLastWinner(numbers, boards) {
	var lastWinBoard = null;
	var lastWinNumber = 0;
	for (var i = 0; i < numbers.length; i++) {
		var number = numbers[i];
		for (var j = 0; j < boards.length; j++) {
			var board = boards[j];
			if (isBoardInWinState(board)) { continue; }
			markNumberInBoard(board, number);
			if (isBoardInWinState(board)) {
				lastWinBoard = board;
				lastWinNumber = number;
			}
		}
	}

	return {board: lastWinBoard, lastNumber: lastWinNumber};
}

function getScoreForBoard(board, lastNumber) {
	var totalOfLeftOverNumbers = board.flat().filter(x => x != null && x.length > 0).map(x => parseInt(x)).reduce((previous, current) => previous + current);
	return totalOfLeftOverNumbers * lastNumber;
}

function markNumberInBoard(board, number) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j] == number) {
				board[i][j] = null;
			}
		}
	}
}

function isBoardInWinState(board) {
	for (i = 0; i < board.length; i++) {
		if (getRowFromBoard(board, i).every(x => x == null)){
			return true;
		}
	}

	for (i = 0; i < board[0].length; i++) {
		if (getColumnFromBoard(board, i).every(x => x == null)){
			return true;
		}
	}

	return false;
}

function getRowFromBoard(board, row) {
	return board[row];
}

function getColumnFromBoard(board, column) {
	var contents = Array();
	for (var i = 0; i < board.length; i++) {
		contents.push(board[i][column]);
	}
	return contents;
}