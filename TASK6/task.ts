enum TaskStatus {
    Pending,
    Completed
}

class Task {
    text: string;
    dueDate: string;
    status: TaskStatus;

    constructor(text: string, dueDate: string) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }

    toggleStatus(): void {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    }
}

let tasks: Task[] = [];
let currentFilter: string = "all";

function addTask(): void {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const dateInput = document.getElementById("dueDate") as HTMLInputElement;

    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    const task = new Task(taskInput.value, dateInput.value);
    tasks.push(task);

    taskInput.value = "";
    dateInput.value = "";

    sortTasks();
    displayTasks();
}

function sortTasks(): void {
    tasks.sort(
        (a, b) =>
            new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()
    );
}

function displayTasks(): void {
    const list = document.getElementById("taskList") as HTMLUListElement;
    list.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed")
            return task.status === TaskStatus.Completed;
        if (currentFilter === "pending")
            return task.status === TaskStatus.Pending;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        if (task.status === TaskStatus.Completed) {
            textSpan.classList.add("completed");
        }

        const dateSpan = document.createElement("span");
        dateSpan.textContent = "Due: " + task.dueDate;

        taskInfo.appendChild(textSpan);
        taskInfo.appendChild(document.createElement("br"));
        taskInfo.appendChild(dateSpan);

        const actions = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.status === TaskStatus.Completed;
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

function toggleTask(index: number): void {
    tasks[index].toggleStatus();
    displayTasks();
}

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    displayTasks();
}

function setFilter(filter: string): void {
    currentFilter = filter;
    displayTasks();
}