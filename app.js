"use strict";
const gameContainer = document.querySelector(".game-container");
const inputSize = document.querySelectorAll(".input-size");
const statusBox = document.querySelector(".status-box");
const timerElement = document.querySelector(".timer");

let gridSize = 5;
let targetNumber = 1;
let gameOver = false;
let timer;
let time = 0;

inputSize.forEach((element) => {
  element.addEventListener("click", (e) => {
    targetNumber = 1;
    gameOver = false;
    gridSize = element.id;
    stopTimer(timer);
    resetTimer(timer);
    initializeGrid(element.id);
  });
});
gameContainer.addEventListener("click", () => {
  gameContainer.style.filter = "none";
  if (time == 0) startTimer();
});

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    updateTimer(timer);
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  time = 0;
  updateTimer();
}

function updateTimer() {
  const seconds = Math.floor(time / 100);
  const milliSeconds = time - seconds * 100;
  timerElement.textContent = `${padTimer(seconds)}:${padTimer(milliSeconds)}`;
}

function padTimer(number) {
  return number.toString().padStart(2, "0");
}

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
  //console.log(`${gridNumbers}`);
  gridNumbers = fisherYates(gridNumbers);
  //console.log(`${gridNumbers}`);
  statusUpdater(`${sizee} is the size now`);
  setTimeout(() => {
    if (statusBox.textContent.includes("is the size now"))
      statusUpdater("Click to start the game!");
  }, 2000);
  gameContainer.innerHTML = "";
  gameContainer.style.gridTemplateColumns = `repeat(${sizee}, 1fr)`;

  for (const number of gridNumbers) {
    const cell = document.createElement("div");
    cell.textContent = number;
    cell.className = "cell";
    gameContainer.appendChild(cell);
    cell.addEventListener("click", handleCellClick);
  }
  gameContainer.style.filter = "blur(60px)";
}

//update status
function statusUpdater(message) {
  if (message == "Wrong!") statusBox.style.color = "red";
  else statusBox.style.color = "yellowgreen";
  statusBox.textContent = message;
}

// Handle cell click event
function handleCellClick(event) {
  if (gameContainer.style.filter != "none") return;
  const clickedNumber = parseInt(event.target.textContent);

  if (clickedNumber === targetNumber) {
    event.target.removeEventListener("click", handleCellClick);
    event.target.classList.add("right");
    statusUpdater("Correct!!");
    targetNumber++;

    if (targetNumber > gridSize ** 2) {
      gameOver = true;
      stopTimer();
      statusUpdater("YOU WON!!!");
    }
  } else {
    statusUpdater("Wrong!");
    event.target.classList.add("wrong");
    setTimeout(() => event.target.classList.remove("wrong"), 1000);
  }
}

initializeGrid(gridSize);
