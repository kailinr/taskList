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
  //Add Task Event
  form.addEventListener('submit', addTask);
  //Remove Task Event
  taskList.addEventListener('click', removeTask);
  //Add Clear Button Event
  clearbtn.addEventListener('click', clearTasks);
  //Filter Tasks
  filter.addEventListener('keyup', filterTasks);
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

  //clear input
  taskInput.value = "";

  //prevent default behavior
  e.preventDefault();
  }
};

//REMOVE TASKS
function removeTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks(e) {
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


//Filter Tasks
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

