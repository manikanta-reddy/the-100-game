// MY VERSION
'use strict';
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const closeBtn = document.querySelector('.button__close');
const msgBox = document.querySelector('.msg-box');
const overlay = document.querySelector('.overlay');

let score, currentScore, activePlayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  //1. GENERATE A RANDOM NUMBER
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      //3. ADD DICEVALUE TO CURRENT SCORE.
      //IF THE DICE VALUE IS GREATER THEN 1
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // ADDING CURRENTSCORE TO SCORE
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // CHECK SCORE >= 100
    //IF 100 ACTIVE PLAYER WIN
    if (score[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
closeBtn.addEventListener('click', function () {
  overlay.classList.add('hidden');
  msgBox.classList.add('hidden');
});
