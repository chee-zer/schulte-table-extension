"use strict";
const gameContainer = document.querySelector(".game-container");
const gridSize = 2;

let targetNumber = 1;
let gameOver = false;

// Generate the random number array

// regarded randomizing array 🤓
// const gridNumbers = Array.from(Array(gridSize ** 2).keys())
//   .map((x) => x + 1)
//   .sort(() => Math.random() - 0.5);

//fisher yates shuffling array 🗿
let gridNumbers = Array.from(Array(gridSize ** 2).keys()).map((x) => x + 1);
const fisherYates = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
console.log(`${gridNumbers}`);
gridNumbers = fisherYates(gridNumbers);
console.log(`${gridNumbers}`);

// Initialize the game grid
function initializeGrid() {
  gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (const number of gridNumbers) {
    const cell = document.createElement("div");
    cell.textContent = number;
    cell.className = "cell";
    gameContainer.appendChild(cell);
    cell.addEventListener("click", handleCellClick);
  }
}

// Handle cell click event
function handleCellClick(event) {
  const clickedNumber = parseInt(event.target.textContent);

  if (clickedNumber === targetNumber) {
    event.target.removeEventListener("click", handleCellClick);
    event.target.classList.add("right");
    targetNumber++;

    if (targetNumber > gridSize ** 2) {
      gameOver = true;
      console.log("YOU WON!!!");
    }
  } else {
    console.log("wrong");
  }
}

initializeGrid();
