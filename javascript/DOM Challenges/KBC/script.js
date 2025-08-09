const curtainL = document.getElementById("curtain-l")
const curtainR = document.getElementById("curtain-r")

curtainL.addEventListener("click", () => {
  curtainL.style.width = 0
  curtainR.style.width = 0
})