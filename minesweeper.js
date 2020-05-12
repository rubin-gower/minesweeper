document.addEventListener('DOMContentLoaded', startGame)
var timer = 0
var score = 0;
var pause = false;
function tracker() {
	if(!pause)timer++;
	
	score = timer / 100
	//console.log(timer / 100)
	document.getElementById("timer").innerHTML = score;
}
// Define your `board` object here!
var board = {}
function generateBoard(size) {
    var cells = []
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var randomNumber = Math.floor(Math.random() * 10) + 1  
            var cell = {
                row: i,
                col: j,
                isMine: randomNumber < 3,
                hidden: true
            }
            cells.push(cell)
        }
    }
    return cells
}
function assignSurrounding() {
    for (var i = 0; i < board.cells.length; i++) {
        var cell = board.cells[i]
        cell.surroundingMines = countSurroundingMines(cell)
    }
}

function mineplacer() {
	for (i = 0; i < board.cells.length; i++) {

	}
}

function startGame () {
console.log("starting game")	
	board.cells = generateBoard(6)
	assignSurrounding()
	
	window.setInterval(function test(){tracker()}, 10);
	addEventListener('click', checkForWin)
	
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  var timer = 0;
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i = 0; i < board['cells'].length; i++){
    
    if ((board.cells[i].isMine === true) && 
      (board.cells[i].isMarked === false)) {
      return;
    } else if ((board.cells[i].hidden === true) && (board.cells[i].isMine === false)) {
      return;
    }
    // else if (board.cells[i].isMine === true && 
    //   board.cells[i].isMarked === true) {
    //   hasWon = true;
    // } 
    
    // if (board.cells[i].isMine === true && 
    //   board.cells[i].isMarked === true) {
    //   hasWon = true;
    // } else if (board.cells[i].isMine === true && 
    //   board.cells[i].isMarked === false) {
    //   hasWon = false;
    // } else if (board.cells[i].hidden === true) {
    //   hasWon = false;
    // }
  }
  lib.displayMessage('You win!');
  pause = true;
  document.getElementById("uwin").style.display = "block";
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    var count = 0
    var surrounding = lib.getSurroundingCells(cell.row, cell.col)
    for (var i = 0; i < surrounding.length; i++) {
        var cell = surrounding[i]
        if (cell.isMine) {
            count++
        }
    }
    return count
}

