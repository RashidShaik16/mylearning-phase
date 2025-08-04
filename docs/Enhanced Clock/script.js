const digitalTime = document.getElementById("digital-time")
const displayeDate = document.getElementById("date")

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]






window.onload = function () {
  const clock = document.getElementById("clock");
  const numbers = clock.querySelectorAll(".number");

  const radius = clock.offsetWidth / 2 - 30; // Adjust padding
  const centerX = clock.offsetWidth / 2.15;
  const centerY = clock.offsetHeight / 2.15;

  numbers.forEach((el, i) => {
    const num = i + 1;
    const angle = (num * 30 - 90) * (Math.PI / 180); // -90 starts at top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = "translate(-50%, -50%)";
  });
};




// Function call for every 1 second
setInterval(updateClock, 1000)
setInterval(updateDigitalClock, 1000)


// function to update wall clock
function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12 + minutes / 60;

  const secondDeg = seconds * 6;       // 360 / 60
  const minuteDeg = minutes * 6;       // 360 / 60
  const hourDeg = hours * 30;          // 360 / 12

  document.getElementById("seconds-hand").style.transform = `rotate(${secondDeg}deg)`;
  document.getElementById("minutes-hand").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("hours-hand").style.transform = `rotate(${hourDeg}deg)`;
}


// Function to update digital clock
function updateDigitalClock() {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const milliseconds = now.getMilliseconds()
    const ampm = hours >= 12 ? "PM" : "AM"


    let displayHour = hours % 12
    displayHour = displayHour === 0 ? 12 : displayHour
    const displayHourWithPad = displayHour < 10 ? `0${displayHour}` : `${displayHour}`
    const displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    digitalTime.innerText = `${displayHourWithPad}:${displayMinutes}:${displaySeconds} ${ampm}`
    
}


function dayAndDate() {
  const now = new Date()
  const dayIndex = now.getDay()
  const date = now.getDate().toString().padStart(2, "0")
  const monthIndex = now.getMonth()
  const year = now.getFullYear()

  const dayName = days[dayIndex]
  const monthName = months[monthIndex]

  displayeDate.innerText = `${dayName}, ${date} ${monthName} ${year}`
}


// Onetime function call
updateClock()
updateDigitalClock()
dayAndDate()