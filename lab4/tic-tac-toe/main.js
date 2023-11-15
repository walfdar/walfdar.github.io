"use strict";

function gameboard() {
  let elem = document.getElementById("board");
  for (let step = 0; step < 9; step++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    elem.insertAdjacentElement("beforeend", cell);
  }
}
function notnull() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    if (cells[i].textContent === "") return false;
  }
  return true;
}

function isWinnerByLine() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 3; i++) {
    let first = cells[i * 3].textContent;
    if (first == "") continue;

    let winner = first;
    for (let j = 1; j < 3; j++) {
      let element = cells[i * 3 + j].textContent;
      if (first != element) {
        winner = null;
        break;
      }
    }
    if (winner) return winner;
  }
}

function isWinnerByColumn() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 3; i++) {
    let first = cells[i].textContent;
    if (first == "") continue;

    let winner = first;
    for (let j = 1; j < 3; j++) {
      let element = cells[j * 3 + i].textContent;
      if (first != element) {
        winner = null;
        break;
      }
    }
    if (winner) return winner;
  }
}

function isWinnerByMainDiagonal() {
  let cells = document.querySelectorAll(".cell");
  let first = cells[0].textContent;
  if (first == "") return;
  for (let i = 0; i < 3; i++) {
    let element = cells[i * 3 + i].textContent;
    if (element != first) return;
  }
  return first;
}

function isWinnerBySideDiagonal() {
  let cells = document.querySelectorAll(".cell");
  let first = cells[0].textContent;
  if (first == "") return;
  for (let i = 0; i < 3; i++) {
    let element = cells[i * 3 + i].textContent;
    if (element != first) return;
  }
  return first;
}

gameboard();

let currentPlayer = "X";

function cellClick(event) {
  const cell = event.target;
  const board = document.querySelector("#board");
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "0" : "X";
  }
  let winner =
    isWinnerByLine() || isWinnerByColumn() || isWinnerByMainDiagonal();
  if (winner) {
    alert(`Игрок ${winner} победил! Начните новую игру!`);
    board.classList.add("blocked");
  }
  if (notnull() && !winner) {
    alert("У вас ничья! Начните новую игру!");
    board.classList.add("blocked");
  }
}

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});
