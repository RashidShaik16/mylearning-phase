const inputField = document.getElementById("input-field")
const todoItems = document.getElementById("todo-items")
const addBtn = document.getElementById("add-btn")
const totalTasks = document.getElementById("total-tasks")
const tasksDone = document.getElementById("tasks-done")
const main = document.getElementById("main")
const tasksDoneMessage = document.getElementById("tasks-done-message")
const enterYourMessage = document.getElementById("enter-your-message")
const taskExistMessage = document.getElementById("task-exist-message")

let tasksCount = 0
let tasksDoneCount = 0

addBtn.addEventListener("click", () => {
    const value = inputField.value.charAt(0).toUpperCase() + inputField.value.slice(1).toLowerCase()
    const allTaskTexts = todoItems.querySelectorAll(".task-text")

    const isDuplicate = Array.from(allTaskTexts).some(task =>
    task.textContent === value
    )

    if(!value){
        enterYourMessage.style.display = "block"
        setTimeout(() => {
            enterYourMessage.style.display = "none"
        }, 1000)
    }


    if(isDuplicate){
        taskExistMessage.style.display = "block"
        setTimeout(() => {
            taskExistMessage.style.display = "none"
        }, 1000)
        return
    }

    if(value) {
         const taskHtml =   `<div class="flex justify-between items-center bg-gray-200 p-2 mb-3 rounded-md task">
                            <div class="flex gap-3">
                                <input type="checkbox" class="task-checkbox">
                                <p class="task-text">${value}</p>
                            </div>
                            <button class="bg-red-500 px-2 py-1 rounded-sm cursor-pointer text-white font-semibold delete-btn">Delete</button>
                        </div>`
           
    todoItems.insertAdjacentHTML("beforeend", taskHtml)
    tasksCount++
    totalTasks.textContent = tasksCount
    inputField.value = ""
     handleTasksCompletedMessage()
    }

})


// Adding event listeners to todo items container
todoItems.addEventListener("click", (e) => {
    const clickedTarget = e.target

    // handle deleting tasks
    if(clickedTarget.classList.contains("delete-btn")){
        const taskDiv = clickedTarget.closest(".task")
        taskDiv.remove()
        tasksCount--
        if(taskDiv.querySelector(".task-checkbox").checked){
            tasksDoneCount--
        } 
        totalTasks.textContent = tasksCount
        tasksDone.textContent = tasksDoneCount
        handleTasksCompletedMessage()
    }


    // handling checkbox
    if(clickedTarget.classList.contains("task-checkbox")){
        const taskText = clickedTarget.closest(".task").querySelector(".task-text")
        const task = clickedTarget.closest(".task")
        taskText.classList.toggle("line-through")
        taskText.classList.toggle("text-green-700")
        task.classList.toggle("bg-green-200")

        if(clickedTarget.checked)  {
            tasksDoneCount++
            tasksDone.textContent = tasksDoneCount
        } else {
            tasksDoneCount--
            tasksDone.textContent = tasksDoneCount
        }

        handleTasksCompletedMessage()
    }
    
})


function handleTasksCompletedMessage() {
    if(tasksDoneCount > 0 && tasksCount === tasksDoneCount) {
        tasksDoneMessage.style.display = "block"
    } else {
        tasksDoneMessage.style.display = "none"
    }
}






