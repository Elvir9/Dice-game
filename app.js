/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = dice; //another way for above method
// document.querySelector('.dice').style.display = 'none'; // pozivanje css selektora i dodavanje atributa

//document.querySelector('.btn-roll').addEventListener('click', imeFunkcije); //imeFunckije je callback fja koju moramo definisati prije i ovdje je pozvati

let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  //This is Anonymous function instead of callback function. Just one way to handle this.

  if (gamePlaying) {
    //What to do in this function
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display number
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. Update the round score if the rolled number was not a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    //Update user UI

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if the player won the game

    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player

      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 1 ? (activePlayer = 2) : (activePlayer = 1);
  roundScore = 0;

  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-2").textContent = "0";

  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".player-2-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0, 0];
  roundScore = 0;
  activePlayer = 1;

  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-2").textContent = "0";
  document.getElementById("current-2").textContent = "0";
  document.getElementById("name-1").textContent = "Player 1";
  document.getElementById("name-2").textContent = "Player 2";

  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-2-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-2-panel").classList.remove("active");

  document.querySelector(".player-1-panel").classList.add("active");
}
