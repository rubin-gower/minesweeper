document.addEventListener('DOMContentLoaded', startGame)
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
function startGame() {
   board.cells = generateBoard(6)
   assignSurrounding()
   lib.initBoard()
}
document.onclick = checkForWin
window.oncontextmenu = checkForWin
// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
    var isTheWinner = true
    for (var i = 0; i < board.cells.length; i++) {
        var cell = board.cells[i]
        if (cell.isMine && !cell.isMarked) {
            isTheWinner = false
        }
    }
    if (isTheWinner) {
        lib.displayMessage('You win!') 
    }
}
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