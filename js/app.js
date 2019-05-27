/*
 * Create a list that holds all of your cards
 */
const card = ["fa fa-anchor", "fa fa-anchor",
  "fa fa-bolt", "fa fa-bolt",
  "fa fa-bomb", "fa fa-bomb",
  "fa fa-bicycle", "fa fa-bicycle",
  "fa fa-cube", "fa fa-cube",
  "fa fa-diamond", "fa fa-diamond",
  "fa fa-leaf", "fa fa-leaf",
  "fa fa-paper-plane-o", "fa fa-paper-plane-o"
];

////////////////////////////////////////////////////////////////////////
// Shuffle function from http://stackoverflow.com/a/2450976//
/////////////////////////////////////////////////////////////////////

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const cardboard = document.querySelector('#cardboard');
let checkCards = [];
let matchedCards = [];
let timerOn = false;
// CREATE CARDS OF DECK AND SHUFFLE

createCardDeck();


function createCardDeck() {
  const cardDeck = document.createElement('ol');
  cardDeck.classList.add('deck');
  // CREATING DECK AND SHUFFLING CARDS
  let shuffleCard = shuffle(card);
  for (let i = 0; i < shuffleCard.length; i++) {
    const newList = document.createElement('li');
    newList.classList.add('card');
    let shuffled = `<i class="${shuffleCard[i]}"></i>`;
    newList.innerHTML = shuffled;
    cardDeck.appendChild(newList);
  }
  cardboard.appendChild(cardDeck);
  cardboard.addEventListener('click', respondToClick);
}

// ON RESPONSE TO USER CLICK ON THE CARD, IT OPENS
function respondToClick(e) {
  let clickedCard = e.target;
  if (clickedCard.classList.contains("card") &&
    !clickedCard.classList.contains("open", "show", "match")) {
    if (timerOn === false) {
      startTimer();
      timerOn = true;
    }
    clickedCard.classList.add("open", "show");
    checkCards.push(clickedCard);
  }
  // IF CARD MATCHES, IT PROCEEDS TO CHECK OTHER CARDS
  if (checkCards.length === 2) {
    cardboard.classList.add("stop-event");
    movesNum();
    if (checkCards[0].innerHTML === checkCards[1].innerHTML) {
      matched();
    } else {
      // IF CARD DOES NOT MATCH, IT RETURNS BACK TO ITS ORIGINAL FORM
      notMatched();
    }
    gameComplete();
  }
}

//MACTHING CARDS FUNCTION
function matched() {
  checkCards[0].classList.add("match");
  checkCards[1].classList.add("match");
  matchedCards.push(checkCards[0]);
  matchedCards.push(checkCards[1]);
  checkCards = [];
  cardboard.classList.remove("stop-event");
}
// IF CARDS DOES NOT MATCH, THEN THIS IS THE FUNCTION
function notMatched() {
  setTimeout(function() {
    checkCards[0].classList.remove("open", "show");
    checkCards[1].classList.remove("open", "show");
    checkCards = [];
    cardboard.classList.remove("stop-event");
  }, 1000);
}

// COUNTING THE NUMBER OF MOVES PER 2 CLICKS ON 2 CARDS
let moves = 0;
const counter = document.querySelector(".moves");

function movesNum() {
  moves++;
  counter.innerHTML = `${moves} Moves`;
  rating();
}


// RATING CALCULATED BASED ON THE TOTAL NUMBER OF MOVES
const stars = document.querySelector('.stars').childNodes;

let rateStep = 6;
const exactMoves = card.length / 2;
const maxStars = exactMoves + rateStep;
const minStars = exactMoves + (2 * rateStep);

function rating() {
  if (moves === maxStars) {
    stars[5].classList.add('grey');
  } else if (moves === minStars) {
    stars[3].classList.add('grey');
  }
}

// CALCULATING TIME ON SECONDS, MINUTES & HOURS
let seconds = 0;
let minutes = 0;
let hours = 0;

const timer = document.querySelector(".timer");
const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");
let totalTime = 0;
let timeCounter;

function startTimer() {
  timeCounter = setInterval(function() {
    totalTime += 1;
    hours = Math.floor(totalTime / 60 / 60);
    minutes = Math.floor((totalTime / 60) % 60);
    seconds = totalTime % 60;
    hourTimer.innerHTML = `${hours} hrs`;
    minuteTimer.innerHTML = ` ${minutes} mins`;
    secondsTimer.innerHTML = ` ${seconds} secs`;
  }, 1000);
}

// RESTART THE GAME WHENEVER YOU WANT
const restart = document.querySelector(".restart");

function initial() {
  timerOn = false;
  moves = 0;
  counter.innerHTML = `0 Moves`;
  matchedCards = [];
  checkCards = [];
  seconds = 0;
  minutes = 0;
  hours = 0;
  secondsTimer.innerText = "0 secs";
  minuteTimer.innerText = " 0 mins";
  hourTimer.innerText = "0 secs";
}

function restartGame() {
  initial();
  cardboard.innerHTML = "";
  createCardDeck();
  clearInterval(timeCounter);
  stars[5].classList.remove('grey');
  stars[3].classList.remove('grey');
}
restart.addEventListener("click", restartGame);

//WHEN THE GAME IS COMPLETE, RESULT SUMMARY IS DISPLAYED
const popup = document.querySelector('.popup');
const timepopup = document.querySelector('.time-popup');
const ratingpopup = document.querySelector('.rating-popup');
const movespopup = document.querySelector('.moves-popup');
const buttonpopup = document.querySelector('.button-popup');
const starsForRate = document.querySelector('.stars');

function gameComplete() {
  if (matchedCards.length === 16) {
    timepopup.innerText = timer.innerText;
    ratingpopup.innerHTML = starsForRate.innerHTML;
    movespopup.innerHTML = counter.innerHTML.slice(0, 3);
    clearInterval(timeCounter);
    popup.style.display = 'block';
  }
}

buttonpopup.addEventListener('click', function() {
  popup.style.display = 'none';
  restartGame();
  timerOn = false;
})

////////////////////////////////////////////////////
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
