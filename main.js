/**
 * Getting the audio
 */
let flipSound = new Audio("sounds/flip-sound.mp3");
let startSound = new Audio("./sounds/game-unlock.wav");
let victorySound = new Audio("./sounds/victory.mp3");
let matchedSound = new Audio("./sounds/matched.mp3");

/**
 *Selecting the elements
 */
let containers = document.querySelectorAll(".card-container");
let gameStarter = document.querySelector(".game-starter-line");
let victoryContainer = document.querySelector(".victory-container");
let victoryContainerPlay = document.querySelector(".victory-container-play");
let flipCounter = 0;
let finalCount = null;

/**
 * Starting the game
 */
gameStarter.addEventListener("click", startTheGame);

function startTheGame() {
  gameStarter.parentElement.classList.add("hide-class");
  startSound.play();
  /**
   * Creating the varibales
   */
  let hasCardFlipped = false;
  let lockBoard = false;
  let firstCard, secondCard;

  containers.forEach((container) => {
    container.addEventListener("click", flipCard);
  });

  /**
   * 02.Creating the flip card function
   */
  function flipCard() {
    /**
     * Playing the sound
     */
    flipSound.play();
    /**
     * Locking the board functionality
     */
    if (lockBoard) return;
    /**
     * Preventing the user for matching the same card again!
     */
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!hasCardFlipped) {
      hasCardFlipped = true;
      firstCard = this;
    } else {
      hasCardFlipped = false;
      secondCard = this;
      checkForMatch();
    }
    /**
     * Move Holder
     */
    flipCounter = 0;
    finalCount = allMatches();
    if (finalCount === 12) {
      showVictory();
    }
  }

  /**
   * Match Checking function
   */
  function checkForMatch() {
    // console.log(firstCard.dataset.name, secondCard.dataset.name);
    if (firstCard.dataset.name === secondCard.dataset.name) {
      matchedSound.play();
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
    } else {
      /**
       * Reason for using the setTimeout Function
       */
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 915);
    }
  }

  /**
   * Resetting function
   */
  function resetBoard() {
    [hasCardFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  /**
   * Suffling the cards...
   */
  //We make the IIFE as we want our function to run quickly when the window loads
  (function suffleCards() {
    containers.forEach((container) => {
      let randomNum = Math.floor(Math.random() * 12);
      container.style.order = randomNum;
    });
  })();
}

/**
 * Showing the Congratulation modal if all matches.
 */
function allMatches() {
  containers.forEach((container) => {
    if (container.classList.contains("flip")) {
      flipCounter++;
    }
  });
  return flipCounter;
}

/**
 * Creating the victory function
 */
function showVictory() {
  setTimeout(() => {
    victoryContainer.style.display = "flex";
    victorySound.play();
  }, 500);
}

/**
 * Victory container
 */
victoryContainerPlay.addEventListener("click", () => {
  flipCounter = 0;
  containers.forEach((container) => {
    container.classList.remove("flip");
  });
  startTheGame();
  victoryContainer.style.display = "none";
});
