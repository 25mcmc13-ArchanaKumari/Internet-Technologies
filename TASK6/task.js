var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task(text, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.toggleStatus = function () {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    };
    return Task;
}());
var tasks = [];
var currentFilter = "all";
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dateInput = document.getElementById("dueDate");
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }
    var task = new Task(taskInput.value, dateInput.value);
    tasks.push(task);
    taskInput.value = "";
    dateInput.value = "";
    sortTasks();
    displayTasks();
}
function sortTasks() {
    tasks.sort(function (a, b) {
        return new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime();
    });
}
function displayTasks() {
    var list = document.getElementById("taskList");
    list.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) {
        if (currentFilter === "completed")
            return task.status === TaskStatus.Completed;
        if (currentFilter === "pending")
            return task.status === TaskStatus.Pending;
        return true;
    });
    filteredTasks.forEach(function (task, index) {
        var li = document.createElement("li");
        var taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        var textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        if (task.status === TaskStatus.Completed) {
            textSpan.classList.add("completed");
        }
        var dateSpan = document.createElement("span");
        dateSpan.textContent = "Due: " + task.dueDate;
        taskInfo.appendChild(textSpan);
        taskInfo.appendChild(document.createElement("br"));
        taskInfo.appendChild(dateSpan);
        var actions = document.createElement("div");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.status === TaskStatus.Completed;
        checkbox.onclick = function () { return toggleTask(index); };
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () { return deleteTask(index); };
        actions.appendChild(checkbox);
        actions.appendChild(deleteBtn);
        li.appendChild(taskInfo);
        li.appendChild(actions);
        list.appendChild(li);
    });
}
function toggleTask(index) {
    tasks[index].toggleStatus();
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
