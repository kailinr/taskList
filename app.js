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
}

//Add Task
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



function removeTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
    }
  }
}