// preloaders.js

const imagesToPreload = [
  "./public/assets/images/background.png",
  "./public/assets/images/curtain.png",
  "./public/assets/images/helpline.png",
  "./public/assets/images/kbc-logo.png",
]

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
  kbcFiftyFifty : new Audio("./public/assets/sounds/kbc-fifty-fifty.mp3"),
  kbcHooter : new Audio("./public/assets/sounds/kbc-hooter.mp3"),
  kbcSuspense1 : new Audio("./public/assets/sounds/kbc-suspense1.mp3")
}

export function preloadAssets() {
  return new Promise((resolve) => {
    const totalAssets = imagesToPreload.length + Object.keys(sounds).length
    let loadedAssets = 0

    const progressBar = document.getElementById("progress-bar")
    const progressText = document.getElementById("progress-text")

    function updateProgress() {
      loadedAssets++
      const percent = Math.floor((loadedAssets / totalAssets) * 100)
      progressBar.style.width = percent + "%"
      progressText.textContent = percent + "%"
      if (loadedAssets === totalAssets) {
        setTimeout(() => {
          document.getElementById("loader").style.display = "none"
          resolve()
        }, 500) // tiny delay for smoothness
      }
    }

    // Preload images
    imagesToPreload.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = updateProgress
      img.onerror = updateProgress
    })

    // Preload sounds
    Object.values(sounds).forEach(audio => {
      audio.preload = "auto"
      audio.addEventListener("canplaythrough", updateProgress, { once: true })
      audio.addEventListener("error", updateProgress, { once: true })
      audio.load()
    })
  })
}

export { sounds }
