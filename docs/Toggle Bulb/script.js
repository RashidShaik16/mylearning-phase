const toggleBtn = document.getElementById("toggle-btn")
const main = document.getElementById("main")
const bulb = document.getElementById("bulb")


let isBulbOn = false


toggleBtn.addEventListener("click", () => {
    isBulbOn = !isBulbOn
    toggleBtn.textContent = isBulbOn ? "Turn Off" : "Turn On"
    document.body.classList.toggle("bg-gray-700")
    main.classList.toggle("bg-gray-500")
    main.classList.toggle("text-white")
    bulb.classList.toggle("bg-yellow-400")
    bulb.classList.toggle("shadow-2xl")
    bulb.classList.toggle("shadow-amber-300")
})


    