
const inputFields = document.querySelectorAll(["input", "textarea"])


inputFields.forEach(field => {
    field.addEventListener("input", e => {
        document.getElementById(`${field.id}-output`).innerText = e.target.value
    })
})

