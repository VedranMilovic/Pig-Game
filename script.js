"use strict";

//selecting elements

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const currPlayer0Element = document.querySelector("#current--0");
const currPlayer1Element = document.querySelector("#current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // počinjemo s player--0, koji ima score= 0. player--0 je na poziciji 0 u arrayu, a player--1 na poziciji 1
  playing = true;

  currPlayer0Element.textContent = 0;
  currPlayer1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  diceElement.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //reset broja na 0

  activePlayer = activePlayer === 0 ? 1 : 0; // mijenjamo aktiven igrače. Ako je 0, anda 1, ako nije 0 ( dakle 1), onda 0.
  currentScore = 0;
  player0Element.classList.toggle("player--active"); // izmjenično pali i gasi (toggle) player--active klasu za igrače
  player1Element.classList.toggle("player--active");
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // ako igramo, pokreni sve, ako je igra gotova, nema funkcionalnosti
    //1.activating random number generator
    let dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    //. add to current score; if 1, activate the next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //mijenja se active current score
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. submit the sctive score to the players score total
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]); // provjera dal sve radi
    //ili scores[1] += scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if the score is => 100/if yes,  end the game

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`) // mora biti ., jer je klasa
        .classList.add("player--winner"); // uzimamo klase iz css-a
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init); //JS zove funkciju, ne ti
