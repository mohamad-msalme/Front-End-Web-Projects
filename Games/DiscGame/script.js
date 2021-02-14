'use strict';
// Buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnNewValue = document.querySelector('.btn--val');
// Images
const diceImg = document.querySelector('.dice');

const view = {
  updateUI() {
    const player = document.querySelector(`.player--${model.indCurrPlayer}`);
    const scrplayer = player.querySelector('.score');
    const currScrplayer = player.querySelector('.current-score');
    scrplayer.textContent = `${model.scores[model.indCurrPlayer]}`;
    currScrplayer.textContent = `${model.currScores[model.indCurrPlayer]}`;
  },
  updateActivePlayer() {
    const player = document.querySelector(`.player--${model.indCurrPlayer}`);
    player.classList.toggle('player--active');
  },
};
const model = {
  players: 2, //Number of players
  scores: [0, 0], //Scores for all players
  currScores: [0, 0], // current Score For All players
  indCurrPlayer: 0,
  maxPoints: 50,
  minPoint: 1,
  isWin: false,

  randNum: (max = 6, min = 1) => Math.trunc(Math.random() * max) + min,
  handelRollBtn() {
    if (this.isWin) return false;
    const discNum = this.randNum();
    diceImg.src = `dice-${discNum}.png`;
    diceImg.classList.remove('hidden');
    if (discNum !== 1) {
      this.currScores[this.indCurrPlayer] += discNum;
      view.updateUI();
    } else {
      this.currScores[this.indCurrPlayer] = 0;
      view.updateUI();
      this.handelChangPlayer();
    }
  },
  handelHoldBtn() {
    if (this.isWin) return false;

    this.scores[this.indCurrPlayer] += this.currScores[this.indCurrPlayer];
    if (this.scores[this.indCurrPlayer] >= this.maxPoints) {
      this.isWin = true;
      view.updateUI();
      this.handelWinGame();
    } else {
      this.currScores[this.indCurrPlayer] = 0;
      view.updateUI();
      this.handelChangPlayer();
    }
  },
  handelNewGameBtn() {
    this.isWin = false;
    this.scores = this.scores.map(score => score * 0);
    this.currScores = this.currScores.map(curr => curr * 0);
    this.handelWinGame();
    // just if second player win change player
    this.indCurrPlayer && this.handelChangPlayer();
    //this.indCurrPlayer ? this.handelChangPlayer() : false;
    for (let i = this.players - 1; i >= 0; i--) {
      this.indCurrPlayer = i;
      view.updateUI();
    }
  },
  handelChangPlayer() {
    view.updateActivePlayer(); // reset Activate to  Cureent player
    this.indCurrPlayer = this.indCurrPlayer ? 0 : 1; // change player
    view.updateActivePlayer(); // Add Activate to  second player
  },
  handelWinGame() {
    diceImg.classList.add('hidden');
    const player = document.querySelector(`.player--${this.indCurrPlayer}`);
    const namePlayer = player.querySelector('.name');
    if (this.isWin) {
      player.classList.add('player--winner');
      namePlayer.classList.add('player--winner');
    } else {
      player.classList.remove('player--winner');
      namePlayer.classList.remove('player--winner');
    }
  },
  handelWinValue() {
    const input = parseFloat(
      prompt(
        `Enter Max point between ${this.minPoint} && ${this.maxPoints} default is ${this.maxPoints}`
      )
    );
    this.maxPoints =
      input >= this.minPoint && input <= this.maxPoints
        ? input
        : this.maxPoints;
    this.handelNewGameBtn();
  },
  initEvents() {
    btnRoll.addEventListener('click', this.handelRollBtn.bind(this));
    btnHold.addEventListener('click', this.handelHoldBtn.bind(this));
    btnNew.addEventListener('click', this.handelNewGameBtn.bind(this));
    btnNewValue.addEventListener('click', this.handelWinValue.bind(this));
  },
};
window.addEventListener('load', model.initEvents.bind(model));
