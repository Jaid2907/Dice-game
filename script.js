'use strict';
const btnRoll = document.querySelector('.btn--roll');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player0Current = document.querySelector('#current--0');
const player1Cureent = document.querySelector('#current--1');
const player0Total = document.querySelector('#score--0');
const player1Total = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

let currentScore = 0;
let player0TotalScore = 0;
let player1TotalScore = 0;

player0Total.textContent = '0';
player1Total.textContent = '0';

btnRoll.addEventListener('click', function () {
  if (
    player0.classList.contains('player--winner') ||
    player1.classList.contains('player--winner')
  ) {
    return;
  }

  let throwResult = Math.trunc(Math.random() * 6) + 1;

  dice.setAttribute('src', `dice-${throwResult}.png`);

  if (throwResult != 1) {
    currentScore += throwResult;

    player0.classList.contains('player--active')
      ? (player0Current.textContent = currentScore)
      : (player1Cureent.textContent = currentScore);
  } else {
    currentScore = 0;
    if (player0.classList.contains('player--active')) {
      player0Current.textContent = currentScore;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else {
      player1Cureent.textContent = currentScore;
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }

  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (
    player0.classList.contains('player--winner') ||
    player1.classList.contains('player--winner')
  ) {
    return;
  }

  if (player0.classList.contains('player--active')) {
    player0TotalScore += currentScore;
    currentScore = 0;
    player0Current.textContent = currentScore;
    player0Total.textContent = player0TotalScore;
    if (player0TotalScore >= 100) {
      player0.classList.add('player--winner');
    } else {
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    }
  } else {
    player1TotalScore += currentScore;
    currentScore = 0;
    player1Cureent.textContent = currentScore;
    player1Total.textContent = player1TotalScore;
    if (player1TotalScore >= 100) {
      player1.classList.add('player--winner');
    } else {
      player1.classList.remove('player--active');
      player0.classList.add('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  currentScore = 0;
  player0TotalScore = 0;
  player1TotalScore = 0;
  player0Total.textContent = player0TotalScore;
  player1Total.textContent = player1TotalScore;
  player0Current.textContent = currentScore;
  player1Cureent.textContent = currentScore;
  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

document.querySelector('.close-modal').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape') {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  }
});
