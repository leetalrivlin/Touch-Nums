'use strict';

var gBoard;
var gNums = [];
var gNumsCopy = [];
var gCountNum = 1;
var className = '';
var gStartTime;
var gTimerInteral;
var gElClock = document.querySelector('.clock');
var gElNextNum = document.querySelector('.next-num');
var gElPlayAgainDiv = document.querySelector('.play-again');

function changeSize(elSizeBtn) {
  var elBoardSize = elSizeBtn.getAttribute('data-size');
  console.log(elBoardSize);
  init(elBoardSize);
}

function init(boardSize) {
  gNums = createNums(boardSize);
  gBoard = createBoard();
}

function createNums(length) {
  gNums = [];
  for (var i = 1; i <= length; i++) {
    gNums.push(i);
  }
  gNumsCopy = gNums.slice();
  return gNums;
}

function createBoard() {
  var strHTML = '';
  var rowLength = Math.sqrt(gNums.length);
  for (var i = 0; i < rowLength; i++) {
    strHTML += `<tr>`;
    for (var j = 0; j < rowLength; j++) {
      strHTML += `<td class="bgc ${className}" onclick="cellClicked(this)">${getRandomGNum()}</td>`;
    }
    strHTML += `</tr>`;
  }
  var elBoard = document.querySelector('.board');
  elBoard.innerHTML = strHTML;
}

function cellClicked(clickedCell) {
  var clickedNum = +clickedCell.innerText;
  if (clickedNum === gCountNum) {
    if (clickedNum === 1) {
      gStartTime = Date.now();
      renderTime();
    } else if (clickedNum === gNums[gNums.length - 1]) {
      clearInterval(gTimerInteral);
      var score = gElClock.innerText;
      console.log(score);
      showPlayAgain(score);
    }
    clickedCell.className = 'bgc-correct';
    gCountNum++;
    gElNextNum.innerText = gCountNum;
  } else console.log('Wrong!');
}

function renderTime() {
  gTimerInteral = setInterval(function startClock() {
    var substractTime = Date.now() - gStartTime;
    var timeAsStr = (substractTime / 1000).toFixed(3);
    gElClock.innerText = `${timeAsStr}`;
  }, 10);
}

function getRandomGNum() {
  var idxToPop = getRandomInteger(0, gNumsCopy.length);
  return +gNumsCopy.splice(idxToPop, 1);
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function showPlayAgain(score) {
  var elSpanScore = document.querySelector('.span-score');
  gElPlayAgainDiv.style.visibility = 'visible';
  elSpanScore.innerText = score;
}

function playAgain() {
  var currBoardSize = gNums.length;
  gElPlayAgainDiv.style.visibility = 'hidden';
  gElClock.innerText = '0.000';
  gNumsCopy = gNums.slice();
  gCountNum = 1;
  gElNextNum.innerText = gCountNum;
  init(currBoardSize);
}
