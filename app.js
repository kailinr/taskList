//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load All Event Listeners 
loadEventListeners();

//Load All Event Listeners Function
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add Task Event
  form.addEventListener('submit', addTask);
  //Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Add Clear Button Event
  clearbtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
}

//GET SAVED TASKS FROM STORAGE WHEN PAGE Loads
function getTasks() {
  //get tasks saved in localStorage 
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
    tasks.forEach(function(task){

      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li)
    });
  }


//ADD TASKS
function addTask(e){
  if (taskInput.value === ''){
    alert('Add a Task!');
  } else {
  //Create li element
  const li = document.createElement('li')
  //Add li class
  li.className = 'collection-item';
  //create text node & append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content'
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  //** NEW ADD* save to local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = "";
  //prevent default behavior
  e.preventDefault();
  }
}

//STORE TO LOCAL STORAGE FUNCTION
function storeTaskInLocalStorage(task){
  let tasks;
  //check if local storage has empty tasks string
  if (localStorage.getItem('tasks') === null) {
      //and set tasks to empty array if so (for future items)
    tasks = []; //make array

  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //get string array saved in storage and turn to array
  }
    tasks.push(task); //push onto array
    localStorage.setItem('tasks', JSON.stringify(tasks)); //stringify it and save it back to storage.

}


//REMOVE TASKS
function removeTask(e){

  const deleteLink = e.target.parentElement.classList;
  const deleteLinkList = e.target.parentElement.parentElement;

  if(deleteLink.contains('delete-item')){
    if (confirm('Are You Sure?')) {
      deleteLinkList.remove();
      //Remove from Local Storage function call
        removeTaskFromLocalStorage(deleteLinkList);
    }
  }
}

//REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(deleteTaskItem){
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //Look through the tasks in storage.
    //taskItem is the item selected for delete
    tasks.forEach(function(task, index){
      if (deleteTaskItem.textContent === task) { 
        //if the text in task we want to delete matches the text in local storage that loop is currently iterating on,        
        tasks.splice(index, 1)  //delete it (index = start index, 1 = only delete 1)
      } 
    });


  }



//CLEAR ALL TASKS
function clearTasks() {
  //Method #1: Set innerhtml to nothing
  //taskList.innerHTML = "";

    console.log(taskList.firstChild);
  //Method #2:* While Loop - faster than M#1:
  while (taskList.firstChild) { //while there is a first child 

    taskList.removeChild(taskList.firstChild);
    //node.removeChild(child)
    //https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
  }
}


//FILTER TASKS
function filterTasks(e){
  const text = e.target.value.toLowerCase(); //keypress in filter task box to lowercase, for proper matching.

    const totalList = document.querySelectorAll('.collection-item');  //Get NodeList of task list to loop (and search) through //note: using ALL so its NodeList

    totalList.forEach(function(task){
        const item = task.firstChild.textContent; //first child because task is the entire UL
          //Hide or Display Task Items if Found
          if (item.toLowerCase().indexOf(text) != -1) {
            //if the text being typed (lowercase) is not found (if not found, returns -1), show it.

            task.style.display = 'block'; //show block

          } else {
            task.style.display = 'none'; //hide block
          }
    });
}

