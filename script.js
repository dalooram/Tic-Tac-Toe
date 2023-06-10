let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let overlayRef = document.getElementById("overlay");
let overlayMessageRef = document.getElementById("overlay-message");
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
let xTurn = true;
let count = 0;
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};
const drawFunction = () => {
  let isWin = false;
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        isWin = true;
        break;
      }
    }
  }

  if (isWin) {
    disableButtons();
    if (xTurn) {
      msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    } else {
      msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
  } else {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  }
};

// Win Logic
const winChecker = () => {
  let isWin = false;
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        isWin = true;
        winFunction(element1);
        break;
      }
    }
  }
  if (!isWin && count === 9) {
    drawFunction();
  }
};
const aiMove = () => {
  overlayRef.style.display = "block";
  let availableCells = [];
  setTimeout(() => {
    overlayRef.style.display = "none";
    for (let i = 0; i < btnRef.length; i++) {
      if (btnRef[i].innerText === "") {
        availableCells.push(i);
      }
    }

    if (availableCells.length > 0) {
      let randomCellIndex = Math.floor(Math.random() * availableCells.length);
      let randomCell = availableCells[randomCellIndex];
      btnRef[randomCell].innerText = "O";
      btnRef[randomCell].disabled = true;
      xTurn = true;
      count += 1;
      winChecker();
      if (count === 9 && !winChecker()) {
        drawFunction();
      }
    }
    if (count < 9 && !winChecker()) {
      btnRef.forEach((cell) => {
        cell.removeEventListener("click", cellClickHandler);
        cell.addEventListener("click", cellClickHandler);
      });
    }
  }, 1000);
};
const cellClickHandler = (event) => {
  if (xTurn) {
    xTurn = false;
    event.target.innerText = "X";
    event.target.disabled = true;
    count += 1;
    winChecker();
    if (count === 9) {
      drawFunction();
    }
    aiMove();
  }
};
btnRef.forEach((cell) => {
  cell.addEventListener("click", cellClickHandler);
});
enableButtons();
