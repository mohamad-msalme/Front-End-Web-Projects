'use strict';
// Buttons
const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');
// variables
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const scoreElem = document.querySelector('.score');
const highscoreElem = document.querySelector('.highscore');
const inputElem = document.querySelector('.guess');
// Array for update UI
const elements = [number, message, scoreElem, highscoreElem, inputElem];
const elementsHeighLow = [message, scoreElem, inputElem];

const view = {
  updateUI: (elemNode, msg) => {
    elemNode.slice().pop().value = '';
    elemNode.forEach((el, ind) => (el.textContent = msg[ind]));
  },
  updateUIWin: function () {
    const msgElemntsWin = [
      `${model.randNum}`,
      'You Are Win...',
      `${model.score}`,
      `${model.heighScore}`,
    ];
    document.body.style.backgroundColor = '#60b347';
    number.style.width = '30rem';
    this.updateUI(elements, msgElemntsWin);
    model.score = 0;
  },
};

const model = {
  heighScore: 0,

  getRandomNum: (max, min) => Math.trunc(Math.random() * (max - min)) + min,
  initEvents: function () {
    btnCheck.addEventListener('click', this.getInput.bind(model));
    btnAgain.addEventListener('click', this.resetGame.bind(model));
    document.addEventListener('keydown', e =>
      e.key == 'Enter' ? model.getInput() : false
    );
  },
  resetGame: function () {
    this.score = 20;
    const msgElemntsinit = [
      '?',
      'Start Guessing...',
      `${this.score}`,
      `${this.heighScore}`,
    ];
    this.randNum = this.getRandomNum(this.score, 1); // between ( 1 => 20)
    view.updateUI(elements, msgElemntsinit);
    document.body.style.backgroundColor = '#222';
    number.style.width = '15rem';
  },
  getInput: function () {
    const input = parseFloat(inputElem.value);
    if (input >= 1 && input <= 20) {
      this.handleInput(input);
    } else {
      view.updateUI([message, inputElem], ['Enter Valid Number']);
    }
  },
  handleLoseGame: function () {
    this.score = 0;
    view.updateUI(elementsHeighLow, [`You Lose`, `${this.score}`]);
  },
  handleInput: function (guess) {
    // && && model.score to prevent continue game after guess Number
    if (guess === this.randNum && this.score) {
      if (this.score > this.heighScore) {
        this.heighScore = this.score;
      }
      view.updateUIWin();
    } else if (guess > this.randNum && this.score) {
      if (this.score-- > 1)
        view.updateUI(elementsHeighLow, [`Too Heigh..`, `${this.score}`]);
      else this.handleLoseGame();
    } else if (guess < this.randNum && this.score) {
      if (this.score-- > 1)
        view.updateUI(elementsHeighLow, [`Too Low..`, `${this.score}`]);
      else this.handleLoseGame();
    } else {
      view.updateUI([message, inputElem], ['Press Play Again...']);
    }
  },
};
window.addEventListener('load', model.initEvents.bind(model));
window.addEventListener('load', model.resetGame.bind(model));

