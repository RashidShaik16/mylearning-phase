import {easyQuestions} from "./data/easyQuestions.js"
import {mediumQuestions} from "./data/mediumQuestions.js"
import {hardQuestions} from "./data/hardQuestions.js"


// load sound tracks

const sounds = {
  kbcIntro : new Audio("./public/assets/sounds/kbc-intro.mp3"),
  kbcNextQuestion : new Audio("./public/assets/sounds/kbc-next-question.mp3"),
  kbcLock : new Audio("./public/assets/sounds/kbc-lock.mp3"),
  kbcTimer : new Audio("./public/assets/sounds/kbc-timer.mp3"),
  kbcAudiencePoll : new Audio("./public/assets/sounds/kbc-audience-poll.mp3"),
  kbcWrongAnswer : new Audio("./public/assets/sounds/kbc-wrong-answer.mp3"),
  kbcSuspense : new Audio("./public/assets/sounds/kbc-suspense.mp3"),
  kbcCorrectAnswer : new Audio("./public/assets/sounds/kbc-correct-answer.mp3"),
  kbcHelplineSuspense : new Audio("./public/assets/sounds/kbc-suspense1.mp3"),
  kbcRinging : new Audio("./public/assets/sounds/kbc-ringing.mp3"),
  kbcFiftyFifty : new Audio("./public/assets/sounds/kbc-fifty-fifty.mp3")

}
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



let currentQuestionIndex = -1
let currentSelectedOption = undefined
let optionContent = undefined
const totalQuestions = 15
let seconds = 14
let prizeMoneyIndex = 15
let timerFunction
let highlightAudience
let isTimerRunning = false
let helplineOptionOpted = undefined

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
   isTimerRunning = false
   helplineOptionOpted = e.target.closest(".helpline").id
   helplineOptedText.textContent = `You want to opt ${helplineOptionOpted}`
   helplineOptionConfirmation.style.display = "flex"
   helplineOptionsContainer.style.pointerEvents = "none"
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
          sounds.kbcHelplineSuspense.pause()
          sounds.kbcTimer.play()
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
          
        }, 13000)
    }

    else if(helplineOptionOpted === "audience-poll"){
      sounds.kbcAudiencePoll.play()
      helplineDisplay.style.display = "flex"
      audienceContainer.style.display = "block"
      highlightAudience = setInterval(highlightRandom, 600)
      setTimeout(displayPollResults, 7000)
    } 

    else if(helplineOptionOpted === "50:50"){
        sounds.kbcFiftyFifty.play()
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
        const fiftyFiftyOption = document.getElementById("50:50")
        fiftyFiftyOption.style.pointerEvents = "none"
        fiftyFiftyOption.style.opacity = 0.5
        fiftyFiftyOption.classList.remove("bg-green-300")
        fiftyFiftyOption.classList.add("bg-red-300")
        fiftyFiftyOption.querySelector("p").classList.remove("text-green-600")
        fiftyFiftyOption.querySelector("p").classList.add("text-red-600")
        sounds.kbcTimer.play()
        timerFunction = setInterval(tick, 1000)
        }, 1500)
    } 
})

helplineNoBtn.addEventListener("click", () => {
  sounds.kbcTimer.play()
   helplineOptionConfirmation.style.display = "none"
   helplineOptionsContainer.style.pointerEvents = "auto"
   slider.style.pointerEvents = "auto"
   timerFunction = setInterval(tick, 1000)
})


// tailwind watch command npx tailwindcss -i ./src/input.css -o ./src/output.css --watch


// get 5 questions randomly from questions Array

const fiveEasyQuestions = getFiveRandomQuestions(easyQuestions)
const fiveMediumQuestions = getFiveRandomQuestions(mediumQuestions)
const fiveHardQuestions = getFiveRandomQuestions(hardQuestions)
const finalSet = [...fiveEasyQuestions, ...fiveMediumQuestions, ...fiveHardQuestions]


// function to get five random questions from each level
function getFiveRandomQuestions(questionsArray){
  const fiveFinalQuestions = [];

  while (fiveFinalQuestions.length < 5) {
    const index = Math.floor(Math.random() * questionsArray.length);
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
    timer.style.display = "flex"
    isTimerRunning && (timerFunction = setInterval(tick, 1000))
    sounds.kbcTimer.play()
    sounds.kbcTimer.loop = true
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
  }, 3000)
  helplineOptionsContainer.style.pointerEvents = "auto"
}

// function to get the selected option

function optionSelected(option) {
  sounds.currentTime = 0
  sounds.kbcTimer.pause()
  isTimerRunning = false
  const allOptions = option.closest(".option-group").querySelectorAll("p")
  optionContent = option.textContent
  !isTimerRunning && clearInterval(timerFunction)
  helplineOptionsContainer.style.pointerEvents = "none"
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
  optionMessage.textContent = `Computer Ji, Please lock option "${optionContent}"`
  optionMessage.style.display = "block"
  confirmationMessage.style.display = "none"
  startBtn.style.display = "none"
  !isTimerRunning && (timer.style.display = "none")
  timerCount.textContent = 15
  seconds = 14
  slider.style.pointerEvents = "none"
  helplineOptionsContainer.style.pointerEvents = "none"

  // reveals answer after 1.5 seconds
  setTimeout(() => {
    const targetQuestion = finalSet[currentQuestionIndex - 1]
  if(currentSelectedOption.textContent === targetQuestion.answer){
    sounds.kbcLock.pause()
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
   setTimeout(()=>{
    optionMessage.style.display = "none"
    startBtn.style.display = "block"
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
  sounds.kbcTimer.play()
  confirmationMessage.style.display = "none"
  currentSelectedOption.classList.remove("bg-orange-500")
  currentSelectedOption.classList.add("bg-blue-600")
  timerFunction = setInterval(tick, 1000)
  timer.style.display = "flex"
  helplineOptionsContainer.style.pointerEvents = "auto"
  slider.style.pointerEvents = "auto"
})


// Timer callback function
function tick() {
  if(seconds < 0){
        timer.style.display = "none"
        seconds = 15
        clearInterval(timerFunction)
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
    setTimeout(() => {
    timerStartsNow.style.display = "block"
    }, 2000)

    setTimeout(() => {
      
      sounds.kbcTimer.play()
      helplineDisplay.style.display = "none"
      audienceContainer.style.display = "none"
      helplineOptionConfirmation.style.display = "none"
      timerFunction = setInterval(tick, 1000)
      slider.style.pointerEvents = "auto"
      const audiencePollOption = document.getElementById("audience-poll")
      audiencePollOption.style.pointerEvents = "none"
      audiencePollOption.style.opacity = 0.5
      audiencePollOption.classList.remove("bg-green-300")
      audiencePollOption.classList.add("bg-red-300")
      audiencePollOption.querySelector("i").classList.remove("text-green-600")
      audiencePollOption.querySelector("i").classList.add("text-red-600")
    
    }, 6000)
}



// Inital rendering

renderFinalQuestions()