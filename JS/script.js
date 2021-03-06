//Assign HTML Elements to variables
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#newTask');
let filter = document.querySelector('#task_Filter');
let clearBtn = document.querySelector('#clear_task_btn');
let taskList = document.querySelector('ul');

//Define Event Listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('keyup', search);
//Event Listeners for local storage
document.addEventListener('DOMContentLoaded', loadTaskList);

//Functions
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please write a task');
        e.preventDefault();//To stop form refreshing page on submit
    } else {
        e.preventDefault();//To stop form refreshing page on submit
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let deleteTask = document.createElement('a');
        deleteTask.setAttribute('href', '#');
        deleteTask.innerText = 'x';
        li.appendChild(deleteTask); //adding cross after the tasks
        taskList.appendChild(li); //adding tasks

        storeTaskInStorage(taskInput.value); //to save tasks in local storage

        taskInput.value = '';
    }
}

function removeTask(e) {
    //The target event property returns element that triggered the event
    if (e.target.hasAttribute('href')) {
        if (confirm("Sure?")) {
            elm = e.target.parentElement;
            elm.remove();
            removeFromStorage(elm);
        }
    }
}

function clearAll(e) {
    //taskList.innerHTML = "";
    while(taskList.firstChild){
        //console.log(taskList.firstChild.innerText);
        taskList.removeChild(taskList.firstChild);
    }
    //localStorage.clear(); //removes everything in local storage
    localStorage.removeItem('taskListStorage'); //deletes specific key
}

function search(e){
    let text= e.target.value.toLowerCase(); //storing the search item in lower case

    document.querySelectorAll('li').forEach(task=>{
        let item= task.textContent.toLowerCase();
        
        if(item.indexOf(text)!=-1){
            task.style.display= 'block';
        }else{
            task.style.display= 'none';
        }
    });
}

//Functions for local storage data
function storeTaskInStorage(task) {
    let taskListStorage;
    if (localStorage.getItem('taskListStorage') === null) {
        taskListStorage = []; //will create one when it doesn't exist
    } else {
        taskListStorage = JSON.parse(localStorage.getItem('taskListStorage')); //get the saved data from storage and parse
    }
    taskListStorage.push(task); //push current input into the list of task
    localStorage.setItem('taskListStorage', JSON.stringify(taskListStorage)); //saves to the local storage
}

function loadTaskList() {
    let taskListStorage; //for keeping tasks in the storage 
    if (localStorage.getItem('taskListStorage') === null) {
        taskListStorage = []; //will create one when it doesn't exist
    } else {
        taskListStorage = JSON.parse(localStorage.getItem('taskListStorage')); //get the saved data from storage and parse
    }
    taskListStorage.forEach(taskItem => {
        //from addTask()
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskItem + " "));
        let deleteTask = document.createElement('a');
        deleteTask.setAttribute('href', '#');
        deleteTask.innerText = 'x';
        li.appendChild(deleteTask); //adding cross after the tasks
        taskList.appendChild(li); //adding tasks
    });
}

function removeFromStorage(taskItem) {
    let taskListStorage;
    if (localStorage.getItem('taskListStorage') === null) {
        taskListStorage = []; //will create one when it doesn't exist
    } else {
        taskListStorage = JSON.parse(localStorage.getItem('taskListStorage')); //get the saved data from storage and parse
    }
    let item = taskItem;
    item.removeChild(item.lastChild); //this removes <a> x </a> before removing the list item in the storage

    taskListStorage.forEach((task, index) => {
        if (item.innerText.trim() === task) {
            taskListStorage.splice(index); //removes the array element without putting gap in array
        }
    });
    localStorage.setItem('taskListStorage', JSON.stringify(taskListStorage));
}
