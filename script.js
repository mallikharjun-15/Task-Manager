let tasks = [];
const taskInput = document.getElementById("taskInput");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const progressBar = document.getElementById("progressBar");
const toggleThemeButton = document.getElementById("toggleTheme");
const body = document.getElementById("body");

document.getElementById("addTask").addEventListener("click", addTask);
toggleThemeButton.addEventListener("click", toggleTheme);

function addTask() {
    const taskName = taskInput.value;
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
        updateProgressBar();
    }
}

function renderTasks() {
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerText = task.name;

        const editButton = document.createElement("button");
        editButton.className = "btn btn-sm btn-warning";
        editButton.innerText = "Edit";
        editButton.onclick = () => editTask(index);

        const completeButton = document.createElement("button");
        completeButton.className = "btn btn-sm btn-success";
        completeButton.innerText = "Complete";
        completeButton.onclick = () => completeTask(index);

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-sm btn-danger";
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        // Append buttons to the pending tasks
        if (!task.completed) {
            listItem.appendChild(editButton);
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);
            pendingTasks.appendChild(listItem);
        } else {
            // For completed tasks, show only the Undo button
            const undoButton = document.createElement("button");
            undoButton.className = "btn btn-sm btn-info";
            undoButton.innerText = "Undo";
            undoButton.onclick = () => undoTask(index);
            listItem.appendChild(undoButton);
            completedTasks.appendChild(listItem);
        }
    });
}

function editTask(index) {
    const newName = prompt("Edit task:", tasks[index].name);
    if (newName !== null) {
        tasks[index].name = newName;
        renderTasks();
        updateProgressBar();
    }
}

function completeTask(index) {
    tasks[index].completed = true;
    renderTasks();
    updateProgressBar();
}

function undoTask(index) {
    tasks[index].completed = false;
    renderTasks();
    updateProgressBar();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    updateProgressBar();
}

function updateProgressBar() {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;
    const percentage = totalTasksCount ? (completedTasksCount / totalTasksCount) * 100 : 0;

    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.innerText = Math.round(percentage) + '%';
}

function toggleTheme() {
    body.classList.toggle("dark-mode");
}

