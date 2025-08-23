// celebration.js
export function triggerConfetti(containerId, duration = 5000) {
  const container = document.getElementById(containerId)
  if (!container) return

  // Create canvas inside container
  let canvas = document.createElement("canvas")
  canvas.style.position = "absolute"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  container.appendChild(canvas)

  // Create confetti instance bound to this canvas
  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true })

  let end = Date.now() + duration

  ;(function frame() {
    myConfetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    })
    myConfetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    } else {
      // remove canvas after done
      container.removeChild(canvas)
    }
  })()
}
