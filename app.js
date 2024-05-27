"use strict";
const gameContainer = document.querySelector(".game-container");
const inputSize = document.querySelectorAll(".input-size");
const statusBox = document.querySelector(".status-box");
let gridSize = 5;
inputSize.forEach((element) => {
  element.addEventListener("click", (e) => {
    targetNumber = 1;
    gameOver = false;
    gridSize = element.id;
    initializeGrid(element.id);
  });
});

let targetNumber = 1;
let gameOver = false;

// Generate the random number array

// regarded randomizing array 🤓
// const gridNumbers = Array.from(Array(gridSize ** 2).keys())
//   .map((x) => x + 1)
//   .sort(() => Math.random() - 0.5);

// Initialize the game grid
function initializeGrid(sizee) {
  //fisher yates shuffling array 🗿
  let gridNumbers = Array.from(Array(sizee ** 2).keys()).map((x) => x + 1);
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
  statusUpdater(`${sizee} is the size now`);
  gameContainer.innerHTML = "";
  gameContainer.style.gridTemplateColumns = `repeat(${sizee}, 1fr)`;

  for (const number of gridNumbers) {
    const cell = document.createElement("div");
    cell.textContent = number;
    cell.className = "cell";
    gameContainer.appendChild(cell);
    cell.addEventListener("click", handleCellClick);
  }
}

//update status
function statusUpdater(message) {
  statusBox.textContent = message;
}

// Handle cell click event
function handleCellClick(event) {
  const clickedNumber = parseInt(event.target.textContent);

  if (clickedNumber === targetNumber) {
    event.target.removeEventListener("click", handleCellClick);
    event.target.classList.add("right");
    statusUpdater("right");
    targetNumber++;

    if (targetNumber > gridSize ** 2) {
      gameOver = true;
      statusUpdater("YOU WON!!!");
    }
  } else {
    statusUpdater("wrong");
    event.target.classList.add("wrong");
    setTimeout(() => event.target.classList.remove("wrong"), 1000);
  }
}

initializeGrid(gridSize);
