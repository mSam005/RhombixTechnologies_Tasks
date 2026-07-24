const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task}</span>

            <div class="actions">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    const task = input.value.trim();

    if(task===""){
        alert("Please enter a task");
        return;
    }

    tasks.push(task);

    saveTasks();

    displayTasks();

    input.value="";
}

function deleteTask(index){
    tasks.splice(index,1);

    saveTasks();

    displayTasks();
}

function editTask(index){

    const updated = prompt("Edit task",tasks[index]);

    if(updated!==null && updated.trim()!==""){

        tasks[index]=updated.trim();

        saveTasks();

        displayTasks();
    }
}

addBtn.addEventListener("click",addTask);

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        addTask();
    }

});

displayTasks();