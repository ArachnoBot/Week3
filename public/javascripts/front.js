document.getElementById("submit-data").addEventListener("click", send)
document.getElementById("search").addEventListener("click", search)

async function send() {
    const nameData = document.getElementById("input-name").value
    const taskData = document.getElementById("input-task").value
    const feedbackElement = document.getElementById("feedback")

    fetch("/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameData,
            task: taskData
        })
    })
    .then(response => response.json())
    .then(data => {
        feedbackElement.textContent = data.msg
    })
}

async function search() {
    const searchData = document.getElementById("search-name").value
    const feedbackElement = document.getElementById("feedback")
    const userData = document.getElementById("tasks")

    const url = "/user/" + searchData

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.msg == "User not found") {
            feedbackElement.textContent = data.msg
        } else {
            console.log(data)
            let taskList = ""
            for (task of data.tasks) {
                console.log(task)
                taskList += " " + task
            }
            feedbackElement.textContent = data.name
            userData.textContent = taskList
            deleteBtn = document.createElement("input")
            deleteBtn.type = "button"
            deleteBtn.value = "delete"
            deleteBtn.id = "delete-user"
            document.body.appendChild(deleteBtn)
            deleteBtn.addEventListener("click", deleteData)
        }
    })
}

function deleteData() {
    const feedbackElement = document.getElementById("feedback")
    const userData = document.getElementById("tasks")
    const url = "/user/" + feedbackElement.textContent
    fetch(url, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        feedbackElement.textContent = data.msg
        userData.textContent = ""
    })
}
