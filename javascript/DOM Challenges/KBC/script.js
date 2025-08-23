import {easyQuestions} from "./data/easyQuestions.js"
import {mediumQuestions} from "./data/mediumQuestions.js"
import {hardQuestions} from "./data/hardQuestions.js"
import { triggerConfetti } from "./confetti.js"
import { preloadAssets, sounds } from "./preloaders.js"


initGame()



async function initGame() {
    // Wait until all images + sounds are loaded
  await preloadAssets()
  console.log("✅ All assets ready! Starting game...")

  // Hide loader
  document.getElementById("loader").style.display = "none"

  // Show app
  document.getElementById("app").classList.remove("hidden")
 

// load sound tracks

// const sounds = {
//   kbcIntro : new Audio("./public/assets/sounds/kbc-intro.mp3"),
//   kbcNextQuestion : new Audio("./public/assets/sounds/kbc-next-question.mp3"),
//   kbcLock : new Audio("./public/assets/sounds/kbc-lock.mp3"),
//   kbcTimer : new Audio("./public/assets/sounds/kbc-timer.mp3"),
//   kbcAudiencePoll : new Audio("./public/assets/sounds/kbc-audience-poll.mp3"),
//   kbcWrongAnswer : new Audio("./public/assets/sounds/kbc-wrong-answer.mp3"),
//   kbcSuspense : new Audio("./public/assets/sounds/kbc-suspense.mp3"),
//   kbcCorrectAnswer : new Audio("./public/assets/sounds/kbc-correct-answer.mp3"),
//   kbcHelplineSuspense : new Audio("./public/assets/sounds/kbc-suspense1.mp3"),
//   kbcRinging : new Audio("./public/assets/sounds/kbc-ringing.mp3"),
//   kbcFiftyFifty : new Audio("./public/assets/sounds/kbc-fifty-fifty.mp3"),
//   kbcHooter : new Audio("./public/assets/sounds/kbc-hooter.mp3"),
//   kbcSuspense1 : new Audio("./public/assets/sounds/kbc-suspense1.mp3")
// }


// const totalAudios = Object.keys(sounds).length;
// let loadedCount = 0

// // Preload all audios
// Object.entries(sounds).forEach(([key, audio]) => {
//   audio.preload = "auto"
//   audio.load()

//   audio.addEventListener("canplaythrough", () => {
//     loadedCount++
//     console.log(`${key} is fully preloaded ✅`)

//     // When all audios are ready → hide loader & show app
//     if (loadedCount === totalAudios) {
//       document.getElementById("loader").style.display = "none"
//       document.getElementById("app").classList.remove("hidden")
//       console.log("✅ All sounds ready, app started!")
//     }
//   });

//   audio.addEventListener("error", () => {
//     console.error(`${key} failed to load ❌`)
//   })
// })

const curtainL = document.getElementById("curtain-l")
const curtainR = document.getElementById("curtain-r")
const helplineContainer = document.getElementById("helpline-container")
const helplineOptionsContainer = document.getElementById("helpline-options-container")
const timer = document.getElementById("timer")
const timerCount = document.getElementById("timer-count")
const startBtn = document.getElementById("start-btn")
const slider = document.getElementById("questions-slider")
const confirmationMessage = document.getElementById("confirmation")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")
const prizeMoneyContainer = document.getElementById("prize-money-container")
const optionMessage = document.getElementById("message")
const audienceContainer = document.getElementById("audience-container")
const helplineDisplay = document.getElementById("helpline-display")
const helplineOptionConfirmation = document.getElementById("helpline-option-confirmation")
const helplineOptedText = document.getElementById("helpline-opted-text")
const helplineYesBtn = document.getElementById("helpline-yes-btn")
const helplineNoBtn = document.getElementById("helpline-no-btn")
const timerStartsNow = document.getElementById("timer-starts-now")
const checkpointConfirmation = document.getElementById("checkpoint-message")
const amount = document.getElementById("amount")
const timeupMessage = document.getElementById("timeup-message")
const prizeMoneyWon = document.getElementById("prize-money-won")
let prizeMoneyWonText = document.getElementById("prize-money-won-text")



let currentQuestionIndex = -1
let currentSelectedOption = undefined
let optionContent = undefined
const totalQuestions = 15
let seconds = 19
let prizeMoneyIndex = 15
let timerFunction
let highlightAudience
let isTimerRunning = false
let helplineOptionOpted = undefined
let isHelplineUsed = false
let CheckPointsReached = 0

// Open curtains
curtainL.addEventListener("click", () => {
  curtainL.style.width = 0
  curtainR.style.width = 0
  sounds.kbcIntro.play()
  setTimeout(() => {
    startBtn.style.display = "block"
  }, 7000)
})

curtainR.addEventListener("click", () => {
  curtainL.style.width = 0
  curtainR.style.width = 0
  sounds.kbcIntro.play()
  setTimeout(() => {
    startBtn.style.display = "block"
  }, 7000)
})


// Audience poll eventListener
helplineContainer.addEventListener("click", (e) => {
  sounds.kbcTimer.pause()
  sounds.kbcSuspense1.pause()
   isTimerRunning = false
   helplineOptionOpted = e.target.closest(".helpline").id
   helplineOptedText.textContent = `You want to opt ${helplineOptionOpted}`
   helplineOptionConfirmation.style.display = "flex"
   helplineOptionsContainer.style.pointerEvents = "none"
   helplineContainer.style.pointerEvents = "none"
   slider.style.pointerEvents = "none"
  !isTimerRunning && clearInterval(timerFunction)
  
})


helplineYesBtn.addEventListener("click", () => {
  const currentQuestion = finalSet[currentQuestionIndex-1]
  document.getElementById("call-a-friend-question").textContent = currentQuestion.question
  document.getElementById("friend-answer").textContent = currentQuestion.answer
  const allOptions = document.getElementById("call-a-friend-4").querySelectorAll(".call-a-friend-option")
  
 
  allOptions.forEach((option, index) => {
    option.textContent = currentQuestion.options[index].text
  })

     if(helplineOptionOpted === "phone-a-friend"){
        sounds.kbcRinging.play()
        isHelplineUsed = true
        setTimeout(() => {sounds.kbcHelplineSuspense.play()}, 2000) 
        helplineDisplay.style.display = "flex"
        const callAFriend = document.getElementById("call-a-friend")
        callAFriend.style.display = "flex"
        const allConvoDivs = callAFriend.querySelectorAll("div").forEach((div, index) => {
          setInterval(() => {
            div.style.display = "flex"
          }, 2000*index)
        })

        setTimeout(() => {
          if(CheckPointsReached < 10){
              timer.style.display = "flex"
              isTimerRunning && (timerFunction = setInterval(tick, 1000))
              sounds.kbcTimer.play()
              sounds.kbcTimer.loop = true
          } else {
            sounds.kbcSuspense1.play()
          }
          sounds.kbcHelplineSuspense.pause()
          helplineDisplay.style.display = "none"
          callAFriend.style.display = "none"
          slider.style.pointerEvents = "auto"
          helplineOptionConfirmation.style.display = "none"
          timerFunction = setInterval(tick, 1000)
          const phoneAFriend = document.getElementById("phone-a-friend")
          phoneAFriend.style.pointerEvents = "none"
          phoneAFriend.style.opacity = 0.5
          phoneAFriend.classList.remove("bg-green-300")
          phoneAFriend.classList.add("bg-red-300")
          phoneAFriend.querySelector("i").classList.remove("text-green-600")
          phoneAFriend.querySelector("i").classList.add("text-red-600")
          
        }, 11000)
    }

    else if(helplineOptionOpted === "audience-poll"){
      sounds.kbcAudiencePoll.play()
      isHelplineUsed = true
      helplineDisplay.style.display = "flex"
      audienceContainer.style.display = "block"
      highlightAudience = setInterval(highlightRandom, 600)
      setTimeout(displayPollResults, 7000)
    } 

    else if(helplineOptionOpted === "50:50"){
        sounds.kbcFiftyFifty.play()
        isHelplineUsed = true
        helplineOptionConfirmation.style.display = "none"
        const currentQuestion = finalSet[currentQuestionIndex-1]
        const currentOptions = currentQuestion.options.map(option => option.text)
        const correctAnswerIndex = currentOptions.indexOf(currentQuestion.answer)
        const wrongOptions = currentOptions.filter(option => currentOptions.indexOf(option) != correctAnswerIndex)
        const randomIndex = Math.floor(Math.random() * wrongOptions.length)
        const twoWrongsOptions = wrongOptions.filter(option => wrongOptions.indexOf(option) != randomIndex)

        setTimeout(() =>{
          document.getElementById(`${currentQuestion.id}`).querySelectorAll("p").forEach(option => {
          if(twoWrongsOptions.includes(option.textContent)){
            option.classList.add("bg-gray-500", "line-through")
            option.style.pointerEvents = "none"
          }
        })
        
        
        slider.style.pointerEvents ="auto"
        helplineOptionsContainer.style.pointerEvents = "none"
        helplineContainer.style.pointerEvents = "none"
        const fiftyFiftyOption = document.getElementById("50:50")
        fiftyFiftyOption.style.pointerEvents = "none"
        fiftyFiftyOption.style.opacity = 0.5
        fiftyFiftyOption.classList.remove("bg-green-300")
        fiftyFiftyOption.classList.add("bg-red-300")
        fiftyFiftyOption.querySelector("p").classList.remove("text-green-600")
        fiftyFiftyOption.querySelector("p").classList.add("text-red-600")
        if(CheckPointsReached < 10){
          sounds.kbcTimer.play()
          timerFunction = setInterval(tick, 1000)
        } else {
          sounds.kbcSuspense1.play()
        }
        
        }, 1500)
    } 
})

helplineNoBtn.addEventListener("click", () => {
  if(CheckPointsReached < 10) {
    sounds.kbcTimer.play()
    sounds.kbcSuspense1.pause()
    timerFunction = setInterval(tick, 1000)
  } else {
    sounds.kbcSuspense1.play()
  }
  
   helplineOptionConfirmation.style.display = "none"
   helplineOptionsContainer.style.pointerEvents = "auto"
   helplineContainer.style.pointerEvents = "auto"
   slider.style.pointerEvents = "auto"
   
})


// tailwind watch command npx tailwindcss -i ./src/input.css -o ./src/output.css --watch


// get 5 questions randomly from questions Array

const fiveEasyQuestions = getFiveRandomQuestions(easyQuestions)
const fiveMediumQuestions = getFiveRandomQuestions(mediumQuestions)
const fiveHardQuestions = getFiveRandomQuestions(hardQuestions)
const finalSet = [...fiveEasyQuestions, ...fiveMediumQuestions, ...fiveHardQuestions]


// function to get five random questions from each level
function getFiveRandomQuestions(questionsArray){
  const fiveFinalQuestions = []

  while (fiveFinalQuestions.length < 5) {
    const index = Math.floor(Math.random() * questionsArray.length)
    const question = questionsArray[index];

    if (!fiveFinalQuestions.includes(question)) {
      fiveFinalQuestions.push(question)
    }
  }

  return fiveFinalQuestions;
}

function renderFinalQuestions() {
  let getHtml = ""
  finalSet.forEach((item, index) => {
    getHtml += ` <div id="question-container" class="min-w-full flex flex-col items-center px-2 py-4 mb-5">
                    <p class="text-white font-serif"><span id="question-num">${index + 1}. </span><span class="question-text" data-full="${item.question}"></span></p>
                    <div id=${item.id} class="grid grid-cols-2 [grid-auto-rows:1fr] w-full mt-2 px-1.5 gap-2 option-group">
                        <p id=${item.options[0].id} class="bg-blue-700 text-white text-md py-1 text-center rounded-full cursor-pointer flex items-center justify-center">${item.options[0].text}</p>
                        <p id=${item.options[1].id} class="bg-blue-700 text-white text-md py-1 text-center rounded-full cursor-pointer flex items-center justify-center">${item.options[1].text}</p>
                        <p id=${item.options[2].id} class="bg-blue-700 text-white text-md py-1 text-center rounded-full cursor-pointer flex items-center justify-center">${item.options[2].text}</p> 
                        <p id=${item.options[3].id} class="bg-blue-700 text-white text-md py-1 text-center rounded-full cursor-pointer flex items-center justify-center">${item.options[3].text}</p>
                    </div>  
                </div>`
  })

  slider.innerHTML = getHtml

  slider.addEventListener("click", (e) => {
    if(e.target.tagName.toLowerCase() === "p" && e.target.closest(".option-group")){
      currentSelectedOption = e.target
      optionSelected(e.target)
    }
  })
}





// Functionality on next btn
startBtn.addEventListener("click", () => {
  sounds.kbcNextQuestion.play()
  slider.style.pointerEvents = "none"
  startBtn.textContent = "Next question"
  startBtn.style.display = "none"
  isTimerRunning = true
  isHelplineUsed = false
  optionMessage.classList.remove("bg-green-200", "text-green-900")
  // slides the next question and bring into the view
    if (currentQuestionIndex <= totalQuestions) {
        const slideIndex = currentQuestionIndex === -1 ? 1 : currentQuestionIndex + 1
        slider.style.transform = `translateX(-${slideIndex * 100}%)`
    }

    currentQuestionIndex === -1 && currentQuestionIndex++

      // Get the question to display
    setTimeout(() => {
    const allQuestions = slider.querySelectorAll(".question-text")
    const currentQuestion = allQuestions[currentQuestionIndex]
    
    // call the function for typing effect on question text
    typeQuestionText(currentQuestion, 50, 600)
    currentQuestionIndex++
  }, 800)

  // display the helpline options and timer after 5 secs 
  setTimeout(() => {
    helplineOptionsContainer.style.transform = `translateX(100%)`
    if(CheckPointsReached < 10){
      timer.style.display = "flex"
      isTimerRunning && (timerFunction = setInterval(tick, 1000))
      sounds.kbcTimer.play()
      sounds.kbcTimer.loop = true
    } else {
      sounds.kbcSuspense1.play()
      sounds.kbcSuspense1.loop = true
      sounds.kbcSuspense1.currentTime = 0
    }
    
  }, 5000)
 
});



// typing effect function to reveal question

function typeQuestionText(element, delay,  startDelay) {
  const fullText = element.getAttribute("data-full");
  element.textContent = ""; // start empty
  
  setTimeout(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      element.textContent += fullText[index];
      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval);
      }
      
    }, delay)
  }, startDelay)

  setTimeout(() => {
    slider.style.pointerEvents = "auto"
    helplineOptionsContainer.style.pointerEvents = "auto"
    helplineContainer.style.pointerEvents = "auto"
  }, 3000)
  
}

// function to get the selected option

function optionSelected(option) {
  sounds.currentTime = 0
  sounds.kbcTimer.pause()
  sounds.kbcSuspense1.pause()
  isTimerRunning = false
  const allOptions = option.closest(".option-group").querySelectorAll("p")
  optionContent = option.textContent
  !isTimerRunning && clearInterval(timerFunction)
  helplineOptionsContainer.style.pointerEvents = "none"
  helplineContainer.style.pointerEvents = "none"
  slider.style.pointerEvents = "none"
  

  allOptions.forEach((p) => {
    if(p.id === option.id){
      p.classList.remove("bg-blue-700")
      p.classList.add("bg-orange-500")
    } else {
      p.classList.remove("bg-orange-500")
      p.classList.add("bg-blue-700")
    }
  })
  confirmationMessage.style.display = "flex"

}


// Evaluate the selected option with the correct answer

yesBtn.addEventListener("click", () => {
  sounds.kbcLock.play()
  sounds.kbcTimer.pause()
  sounds.kbcSuspense1.pause()
  optionMessage.textContent = `Computer Ji, Please lock option "${optionContent}"`
  optionMessage.style.display = "block"
  confirmationMessage.style.display = "none"
  startBtn.style.display = "none"
  !isTimerRunning && (timer.style.display = "none")
  CheckPointsReached < 4 ? timerCount.textContent = 20 : timerCount.textContent = 30
  CheckPointsReached < 4 ? seconds = 19 : seconds = 29
  slider.style.pointerEvents = "none"
  helplineOptionsContainer.style.pointerEvents = "none"
  helplineContainer.style.pointerEvents = "none"

  // reveals answer after 1.5 seconds
  setTimeout(() => {
    const targetQuestion = finalSet[currentQuestionIndex - 1]
  if(currentSelectedOption.textContent === targetQuestion.answer){
    CheckPointsReached++
    CheckPointsReached === 5 ? checkPoint5() : CheckPointsReached === 10 ? checkPoint10() : CheckPointsReached === 15 ? checkPoint15() : null
    sounds.kbcLock.pause()
    sounds.kbcSuspense1.pause()
    sounds.kbcLock.currentTime = 0
    sounds.kbcCorrectAnswer.play()
    optionMessage.textContent = `"${optionContent}", is the right answer`
    optionMessage.classList.add("bg-green-200", "text-green-900") 
    currentSelectedOption.classList.add("bg-green-500")
    currentSelectedOption.classList.remove("bg-orange-500")
   const allPrizeMoney = prizeMoneyContainer.querySelectorAll("p")
   allPrizeMoney.forEach((p, index) => {
      if(index === prizeMoneyIndex - 1){
        p.classList.remove("bg-gray-500")
        p.classList.add("bg-green-500")
      } else {
        p.classList.remove("bg-green-500")
        p.classList.add("bg-gray-500")
      }
   })
    
   prizeMoneyIndex--

   if(CheckPointsReached === 15){
    triggerConfetti("main", 11000)
   }

   setTimeout(()=>{
    optionMessage.style.display = "none"
    CheckPointsReached < 15 && (startBtn.style.display = "block")
    if(CheckPointsReached === 15){
      prizeMoneyWonText.textContent = amount.textContent
      prizeMoneyWon.style.display = "flex"
      checkpointConfirmation.style.display = "none"
      setTimeout(() => {
       curtainL.style.width = "50%"
       curtainR.style.width = "50%"
       curtainL.style.pointerEvents = "none"
       curtainR.style.pointerEvents = "none"
       sounds.kbcIntro.play()
    }, 2000)
    } else {
      checkpointConfirmation.style.display = "none"
    }
   }, 5000)
   
   timer.style.display = "none"

  } else {
    sounds.kbcLock.pause()
    sounds.kbcWrongAnswer.play()
    optionMessage.textContent = `"${optionContent}", is the wrong answer`
    optionMessage.classList.add("bg-red-200", "text-red-900")
    currentSelectedOption.classList.add("bg-red-500")
    currentSelectedOption.classList.remove("bg-orange-500")
    
    const correctAnswer = currentSelectedOption.closest(".option-group").querySelectorAll("p")
    correctAnswer.forEach(p => {
      if(p.textContent === targetQuestion.answer) {
        p.classList.add("bg-green-500")
      }
    })

    if(CheckPointsReached >= 5){
          setTimeout(() => {
             timeupMessage.style.display = "none"
              prizeMoneyWonText.textContent = amount.textContent
              prizeMoneyWon.style.display = "flex"
              optionMessage.style.display = "none"
              triggerConfetti("main", 8000)
          }, 3000)
        } 

    setTimeout(() => {
       curtainL.style.width = "50%"
       curtainR.style.width = "50%"
       curtainL.style.pointerEvents = "none"
       curtainR.style.pointerEvents = "none"
       sounds.kbcIntro.play()
    }, 4000)
  }

  confirmationMessage.style.display = "none"
  }, 5000)
  
})


noBtn.addEventListener("click", () => {
  if(CheckPointsReached < 10){
    sounds.kbcTimer.play()
    isTimerRunning = true
    timerFunction = setInterval(tick, 1000)
    timer.style.display = "flex"
  } else {
    sounds.kbcSuspense1.play()
    isTimerRunning = true
  }
  
  confirmationMessage.style.display = "none"
  currentSelectedOption.classList.remove("bg-orange-500")
  currentSelectedOption.classList.add("bg-blue-600")
  
  if(!isHelplineUsed && isTimerRunning){
      helplineOptionsContainer.style.pointerEvents = "auto"
      helplineContainer.style.pointerEvents = "auto"
  }
  slider.style.pointerEvents = "auto"
})


// Timer callback function
function tick() {
  if(seconds < 0){
        sounds.kbcTimer.pause()
        sounds.kbcHooter.play()
        timer.style.display = "none"
        slider.style.pointerEvents = "none"
        helplineContainer.style.pointerEvents = "none"
        helplineOptionsContainer.style.pointerEvents = "none"
        timeupMessage.style.display = "flex"
        seconds = 15
        clearInterval(timerFunction)

        if(CheckPointsReached >= 5){
          setTimeout(() => {
             timeupMessage.style.display = "none"
              prizeMoneyWonText.textContent = amount.textContent
              prizeMoneyWon.style.display = "flex"
              triggerConfetti("main", 8000)
          }, 3000)
        }

        setTimeout(() => {
        curtainL.style.width = "50%"
        curtainR.style.width = "50%"
        curtainL.style.pointerEvents = "none"
        curtainR.style.pointerEvents = "none"
        sounds.kbcIntro.play()
    }, 4000)
      }
      timerCount.innerText = seconds
      seconds--
}


// Audience poll random colors function

function highlightRandom() {
    const icons = audienceContainer.querySelectorAll("i")
    icons.forEach(icon => icon.classList.remove("text-orange-500"))

    const randomIndex = Math.floor(Math.random() * icons.length)
    icons[randomIndex].classList.add("text-orange-500")
}


function removeHighlight() {
  sounds.kbcAudiencePoll.pause()
  const icons = audienceContainer.querySelectorAll("i")
    icons.forEach(icon => icon.classList.remove("text-orange-500"))
}

function displayPollResults(){
    const percentages = ["w-[10%]", "w-[15%]", "w-[25%]"]
    let percentIndex = 0
    const currentQuestion = finalSet[currentQuestionIndex-1]
    document.getElementById("audience-results").querySelectorAll("p").forEach((p, index) => {
      p.textContent = currentQuestion.options[index].text
      if(p.textContent === currentQuestion.answer){
        p.closest(".result-option").querySelector(".result-bar").classList.add("w-[50%]")
      } else {
        p.closest(".result-option").querySelector(".result-bar").classList.add(percentages[percentIndex])
        percentIndex++
      }
       
    })  
    clearInterval(highlightAudience)
    removeHighlight()
    // setTimeout(() => {
    // timerStartsNow.style.display = "block"
    // }, 2000)

    setTimeout(() => {
      if(CheckPointsReached < 10) {
        sounds.kbcTimer.play()
        timerFunction = setInterval(tick, 1000)
      } else {
        sounds.kbcSuspense1.play()
      }
      
      helplineDisplay.style.display = "none"
      audienceContainer.style.display = "none"
      helplineOptionConfirmation.style.display = "none"
      
      slider.style.pointerEvents = "auto"
      const audiencePollOption = document.getElementById("audience-poll")
      audiencePollOption.style.pointerEvents = "none"
      audiencePollOption.style.opacity = 0.5
      audiencePollOption.classList.remove("bg-green-300")
      audiencePollOption.classList.add("bg-red-300")
      audiencePollOption.querySelector("i").classList.remove("text-green-600")
      audiencePollOption.querySelector("i").classList.add("text-red-600")
    
    }, 4000)
}

// checkpoints functions
function checkPoint5(){
  checkpointConfirmation.style.display = "flex"
  amount.textContent = "10,000"
}

function checkPoint10(){
  checkpointConfirmation.style.display = "flex"
  amount.textContent = "3,20,000"
}

function checkPoint15(){
  checkpointConfirmation.style.display = "flex"
  amount.textContent = "1 Crore"
}

// Inital rendering

renderFinalQuestions()
}