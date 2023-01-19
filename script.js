'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// console.log(score0El, typeof score0El);
// console.log(score1El, typeof score1El);
//console.log(currentScore0, currentScore1);
// console.log(player0El.);

let currentScore;
let score;
let activePlayer;
let playing;

//starting conditions
const initialize = () => {
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialize();

//SWITCH PLAYER FUNCTION
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling the dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generating random dice number
    const diceNumber = Math.ceil(Math.random() * 6);
    //   console.log(diceNumber);

    //displaying dice number image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    //checking for roll 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    // console.log(score[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //   currentScore = 0;
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialize);
