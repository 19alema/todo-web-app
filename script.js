// Constants;
const addBtn = document.querySelector('.btn');
const title_input = document.getElementById("title_input");
const textarea = document.getElementById("textarea");
const alertPara = document.querySelector(".alert");
const completed_tasks = document.getElementById("completed");
const clearBtn = document.querySelector(".clearCompleted");
const pending_tasks = document.getElementById("pending_tasks");


// Event Listener

addBtn.addEventListener("click", addTask);
window.addEventListener('DOMContentLoaded', setTask)


// Add task to pending list container

function addTask() {
    let title = title_input.value;
    let desc = textarea.value;
    let id = new Date().getTime().toString()

        if (!title && !desc) {
        
         }
      else if (title && desc) {
        //   Add Tas to display
        createTasks(title, desc, id);
        
        // Add task to local storage
        addTaskToLocalStorage(title, desc, id)

        alert("Task added", "success");
        // SetApp to Default()
        setToDefault()
    }
    else {
        alert("Please enter value", "danger")
    }
}


function addTaskToLocalStorage(title, desc,id) {
    const task = { title, desc, id }
    const taskList = getFromLocalStorage();
    taskList.push(task);

    localStorage.setItem("task", JSON.stringify(taskList));
} 

// Remove from local storage

function removeFromLocalStorage(id) {
    let taskList = getFromLocalStorage();
    taskList = taskList.filter(function (task) {
        console.log(task.id);
        console.log(task)
        if (task.id !== id) {
           return task
         }
    })

    localStorage.setItem("task", JSON.stringify(taskList));
}
// GET TASK FROM LOCAL STORAGE
function getFromLocalStorage() {
    return localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
}


function setToDefault() {
     title_input.value = " ";
     textarea.value = " ";
}

// Alert function

function alert(text, action) {
    alertPara.innerText = text;
    alertPara.classList.add(`alert-${action}`)

    setTimeout( function (){
     alertPara.textContent = "";
     alertPara.classList.remove(`alert-${action}`)
    }, 1000)
}


// function to remove task from pending tasks and add in completed tasks

function removeTask(e) {
    const taskElem = e.currentTarget.parentElement;
    pending_tasks.removeChild(taskElem);
    let taskId = taskElem.dataset.id;
    // REMOVE TASK FROM LOCAL STORAGE
    removeFromLocalStorage(taskId)
    // Append task to completed task list
    addCompletedTasks(taskElem)
    alert("Task completed", "success");
    setToDefault()  
}



// Function to add completed tasks;

function addCompletedTasks(task) {

    task.classList.add("completed");
    task.classList.remove("task_box")
    completed_tasks.appendChild(task);
    
    let completedTaskBtn = task.querySelector(".del_btn");
    completedTaskBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
    alert("Task deleted", "danger");
    // Remove completed Task
    completedTaskBtn.addEventListener("click", (e) => {
        const elem = e.currentTarget.parentElement;
        completed_tasks.removeChild(elem);
       alert("Task completed and removed", "danger")
    })


}

// Clear entire completed Task
const clear_btn = document.querySelector(".clearCompleted");

clear_btn.addEventListener("click", clearCompleted)

function clearCompleted() {
    completed_tasks.innerHTML = "";
    if (completed_tasks.innerHTML) {
        alert("No Completed Task to Clear", "cleared")
    } else if(completed_tasks !== "") {
        alert("Completed Tasks Cleared", "cleared")
    }
}


// Create Task
function createTasks(title, desc, id) {
    const taskBox = document.createElement("div");

        // H3 for title
        let h3 = document.createElement("h4");
        h3.innerText = title;
        // Paragraph for task description
        let para = document.createElement("p");
        para.innerText = desc;
        //   Unique id for each task.

        let attr = document.createAttribute("data-id");
        attr.value = id;
    
        taskBox.setAttributeNode(attr);
        taskBox.classList.add("task_box");
       
       // button for removing task;
       let delBtn = document.createElement('button');
       delBtn.classList.add("del_btn");
       delBtn.innerHTML = `<i class="fa fa-check" fa-2x></i>`
        delBtn.addEventListener("click", removeTask);
       // Appending Tasks to container
        taskBox.appendChild(h3);
        taskBox.appendChild(para);
        taskBox.appendChild(delBtn);
       
        
     pending_tasks.appendChild(taskBox);
    
}
function setTask() {
    let taskList = getFromLocalStorage();
    if (taskList.length > 0) {
        taskList.forEach(task => {
            createTasks(task.title, task.desc, task.id)
        })
    }
}
// Setting Date:

const date = document.querySelector(".date");

const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const number = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
]
const days = [
     'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Friday', 'Sat'
]

let todays = new Date();

let today = days[todays.getDay()]
let month = months[todays.getMonth()];
let year = todays.getFullYear();
let day = number[todays.getDate()];

date.innerHTML = `${day} ${today}, ${month} ${year}`







