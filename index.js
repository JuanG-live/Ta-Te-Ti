/*DOM ELEMENTS*/ 
const boardElement = document.querySelector('[board]');
const cellElements = document.querySelectorAll('[cell]');
const dialogElement = document.querySelector('dialog');
const modalMessage = document.querySelector('.[winner-message]');
const crossesScore = document.querySelector('[crosses-score]');
const circleScore = document.querySelector('[circles-score]');

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
startGame();

/* EVENT LISTENERS */
boardElement.addEventListener("click", (handleClick));

dialogElement.addEventListener("close", () => {
    resetGame(); 
    updateScoreOnBoard();   
});

/* GAME FUNCTION */
function startGame() {
    setBoardHover(crossTurn);
    crossTurn = true;
    clearBoard();
}
function clearBoard() {
    cellElements.forEach(cell => {
        cell.classList.remove(crossClass);
        cell.classList.remove(circleClass);
    })
}
function setBoardHover(crossTurn) {
    crossTurn ?
        boardElement.classList.replace('circle-plays', 'cross-plays') :
        boardElement.classList.replace('cross-plays', 'circle-plays');
}
function updateScoreOnBoard() {
    if (Number(crossesScoreElement.textContent) !== crossesCumulativeScore) {
        crossesScoreElement.textContent = crossesCumulativeScore;
        animateElement(crossesScoreElement, 'blink', 500);
    }
    
    if (Number(circlesScoreElement.textContent) !== circlesCumulativeScore) {
        circlesScoreElement.textContent = circlesCumulativeScore;
        animateElement(circlesScoreElement, 'blink', 500);
    }
}
function resetCumulativeScores() {
    crossesCumulativeScore = 0;
    circlesCumulativeScore = 0;
    updateScoreOnBoard();
}
function handleClick(e) {
    const cell = e.target;
    const currentMark = crossTurn ? crossClass : circleClass;
    const cellIsMarked = 
    cell.classList.contains(crossClass) ||
    cell.classList.contains(circleClass); 

    if (cellIsMarked) return;

    placeMark(cell, currentMark);

    if (currentMarkWins(currentMark)) {
        incrementScore(currentMark);
        showWinner(currentMark);
        return;
    } 
    
    if (boardIsFull(currentMark)) {
        showModal(`It's a DRAW!`);
        return;
    } 
    
    swapTurns();
    setBoardHover(crossTurn);
}
function placeMark(cell, markToAdd) {
    cell.classList.add(markToAdd);
}
function clearBoardHover() {
    boardElement.classList.remove('cross-plays')
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
function showWinner(currentMark){
    showModal(`${currentMark} wins!`);
}
function resetGame() {
    crossTurn = true;
    startGame();
}
function showModal(element, message){
    modalMessage.textContent = message;
    dialogElement.showModal();
}
function animateElement(element, animationClass, timeout) {
    element.classList.add(animationClass);
    setTimeout(() => element.classList.remove(animationClass), timeout);
}