/*DOM ELEMENTS*/ 
const boardElement = document.querySelector('[board]');
const cellElements = document.querySelectorAll('[cell]');

/* GLOBALS */
let crossTurn = true; //Initial turn for the CROSS
const crossClass = 'cross';
const circleClass = 'circle';
const winningCombinations = [
    [0,1,2], // horizontal wins
    [3,4,5],
    [6,7,8],

    [0,3,6], // vertical wins
    [1,4,7],
    [2,5,8],

    [0,4,8], // diagonal wins
    [2,4,6],
]; 

/* EVENT LISTENERS */
boardElement.addEventListener("click", handleClick);

/* GAME FUNCTION */
function handleClick(e) {
    const cell = e.target;
    const currentMark = crossTurn ? crossClass : circleClass;
    const cellIsMarked = cell.classList.contains(crossClass) || cell.classList.contains(circleClass);

    if(cellIsMarked) return;

    placeMark(cell,currentMark);
    if(checkWin(currentMark)) {
        alert(`WINS: ${currentMark}`);
    } else if (boardIsFull(currentMark)) {
        alert(`It's a DRAW`);
    }else {
        swapTurn();
    }
}

function placeMark(cell, markToAdd) {
    cell.classList.add(markToAdd);
}

function swapTurn() {
    crossTurn = !crossTurn;
}

function checkWin(currentMark) {
   return winningCombinations.some(combinations => {
        return combinations.every(cell =>{
            return cellElements[cell].classList.contains(currentMark);
        })
    });
}

function boardIsFull(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(crossClass) || 
               cell.classList.contains(circleClass);
    })
} 