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
                btn = document.createElement("input")
                btn.type = "button"
                btn.value = task
                document.body.appendChild(btn)
                btn.addEventListener("click", deleteTodo)
            }
            feedbackElement.textContent = data.name
            oldBtn = document.getElementById("delete-user")
            if (oldBtn){
                oldBtn.remove()
            }
            deleteBtn = document.createElement("input")
            deleteBtn.type = "button"
            deleteBtn.value = "delete"
            deleteBtn.id = "delete-user"
            document.body.appendChild(deleteBtn)
            deleteBtn.addEventListener("click", deleteUser)
        }
    })
}

function deleteUser() {
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

function deleteTodo() {
    const user = document.getElementById("feedback").textContent
    const task = event.srcElement.value
    const feedbackElement = document.getElementById("feedback")
    
    fetch("/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            task: task
        })
    })
    .then(response => response.json())
    .then(data => {
        feedbackElement.textContent = data.msg
    })
    event.srcElement.remove()
}
