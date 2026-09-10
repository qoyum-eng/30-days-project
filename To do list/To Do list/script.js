const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTask.addEventListener("click", function() {

    const task = taskInput.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

li.textContent = task;

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "Delete";

li.appendChild(deleteBtn);

deleteBtn.addEventListener("click", function() {
    li.remove();
});

taskList.appendChild(li);
    li.addEventListener("click", function() {
    li.classList.toggle("completed");
});

    taskInput.value = "";
});