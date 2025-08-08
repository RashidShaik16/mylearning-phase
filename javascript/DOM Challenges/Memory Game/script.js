let cardGrid = document.getElementById('card-grid')
const startGame = document.getElementById("start")
const cardSelectionContainer = document.getElementById("card-selection-container")
const timer = document.getElementById("timer")
const time = document.getElementById("time")


// card arrays
const arraySets = {
  animals : ["dog", "cat", "lion", "tiger", "elephant", "deer", "panther", "zebra"],
  sports : ["sachin", "rohit", "kohli", "bumrah", "warner", "ronaldo", "messi", "dhoni"],
  celebrities : ["mahesh", "pawan", "shahrukh", "surya", "rajni", "priyanka", "samantha", "pooja"],
  fruits : ["apple", "orange", "banana", "kiwi", "watermelon", "mango", "pineapple", "strawberry",]
}

// load audio






let flippedCards = []     // array to track the 2 currently flipped cards
let lockBoard = false     // prevents interaction while flipping back unmatched cards
let matchedPairs = 0
let cardSelectedByUser = "sports" //by default sport, changes on user click
let cardType = arraySets[cardSelectedByUser]
const pairs = 8
let isCardTypeSelected = false
let timerInterval = null
let secondsElapsed = 0


//get card type from user click
function getCardType(clickedBtn) {
  cardSelectedByUser = clickedBtn.id
  cardType = arraySets[cardSelectedByUser]

  document.querySelectorAll(".option").forEach(btn => {
    if(btn.id === cardSelectedByUser){
      btn.classList.remove("bg-yellow-200", "text-yellow-700")
      btn.classList.add("bg-yellow-700", "text-yellow-200")
    } else {
        btn.classList.remove("bg-yellow-700", "text-yellow-200")
        btn.classList.add("bg-yellow-200", "text-yellow-700")
        
    }
  })

  
}


startGame.addEventListener("click", () => {
  cardGrid.innerHTML = ""
  deck()
  isCardTypeSelected = true
  cardSelectionContainer.classList.add("hidden")
  startGame.classList.add("hidden")
  timer.classList.remove("hidden")

  secondsElapsed = 0;
  time.textContent = formatTime(secondsElapsed);

  timerInterval = setInterval(() => {
  secondsElapsed++;
  time.textContent = formatTime(secondsElapsed);
}, 1000);

})

// shuffle deck 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function deck() {
  const deck = shuffle([...cardType, ...cardType]); // 16 total (8 pairs)
  deck.forEach(type => {
  const card = createCard(type)
  cardGrid.appendChild(card)
})
}

deck() //For initial decks

// Creat cards deck

function createCard(type) {
  const card = document.createElement('div');
  card.className = 'w-20 h-20 perspective cursor-pointer mx-auto';
  card.setAttribute('data-type', type);
  card.setAttribute('onclick', 'flipCard(this)');

  card.innerHTML = `
    <div class="relative h-full w-full transition-transform duration-500 transform-style preserve-3d" data-flipped="false">
      <div class="absolute w-full h-full backface-hidden">
        <img src="./images/card-front.jpg" class="w-full h-full object-cover rounded-xl" />
      </div>
      <div class="absolute w-full h-full rotate-y-180 backface-hidden">
        <img src="./images/${cardSelectedByUser}/${type}.jpeg" class="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  `;

  return card;
}



function flipCard(card) {
  if(!isCardTypeSelected) return
  if (lockBoard) return
  const flipper = card.querySelector('[data-flipped]');
  if (flipper.getAttribute('data-flipped') === 'true') return;
  if (flippedCards.length === 2) return;

  // Flip the card
  playTapSound()
  flipper.classList.add('rotate-y-180');
  flipper.setAttribute('data-flipped', 'true');

  flippedCards.push(card);

  // Check for match if 2 cards are flipped
  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const type1 = card1.getAttribute('data-type');
    const type2 = card2.getAttribute('data-type');

    if (type1 === type2) {
          playMatchSound()
        matchedPairs++

        if(matchedPairs === pairs){
          playWinSound()
          clearInterval(timerInterval)
          setTimeout(() => {
            showWinMessage()
          }, 700)
          
          
        }

      flippedCards = []

    } else {
      // No match: flip them back after delay
      lockBoard = true;

      setTimeout(() => {
        for (const card of flippedCards) {
          const flipper = card.querySelector('[data-flipped]');
          flipper.classList.remove('rotate-y-180');
          flipper.setAttribute('data-flipped', 'false');
        }

        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}




function showWinMessage() {
  const timeTaken = time.textContent
  timer.classList.add("hidden")
  document.getElementById('win-message').innerHTML = `
    <p class="mb-3 px-2 py-1 bg-yellow-400">🎉 You Win! Time taken: ${timeTaken}</p>
    <button onclick="restartGame()" class="ml-4 mb-2 bg-blue-600 px-6 py-2 rounded-2xl text-white font-bold cursor-pointer">Play Again</button>
  `;
  document.getElementById('win-message').classList.remove('hidden');
}


function restartGame() {
  location.reload(); // Refreshes the entire page
}


// Timer function



function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(secs).padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}



// tap audio function

function playTapSound() {
  const tap = new Audio("./sounds/tap.mp3")
  tap.play()
}


function playMatchSound() {
  const match = new Audio("./sounds/match.mp3")
  match.play()
}

function playWinSound() {
  const win = new Audio("./sounds/win.mp3")
  win.play()
}
    
    