let tasks = [];
let currentFilter = "all";

function addTask() {
    const taskText = document.getElementById("taskInput").value;
    const dueDate = document.getElementById("dueDate").value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        dueDate: dueDate,
        completed: false
    });

    sortTasks();
    displayTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

function sortTasks() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) taskText.classList.add("completed");

        const dateText = document.createElement("span");
        dateText.textContent = "Due: " + task.dueDate;

        taskInfo.appendChild(taskText);
        taskInfo.appendChild(document.createElement("br"));
        taskInfo.appendChild(dateText);

        const actions = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(checkbox);
        actions.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    displayTasks();
}
