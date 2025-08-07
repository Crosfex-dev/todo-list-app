const form = document.getElementById('todo-form'); // get the form element
const input = document.getElementById('todo-input'); // get the input element
const list = document.getElementById('todo-list'); // get the list element
const deleteElement = document.getElementById('todo-remover'); // get the delete element
const deleteAllElements = document.getElementById('todo-remover-all') // get the delete all element
const markAll = document.getElementById('todo-mark-all'); // get the mark all element
const unmarkAll = document.getElementById('todo-unmark-all'); // get the unmark all element
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get memory from localStorage


/* 
Here are the "backend" functions handled with localStorage
*/

function renderTasks(){
    list.innerHTML='';
    tasks.forEach((task, index)=>{

        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const label = document.createElement('label');
        label.textContent = task.name;
        label.style.marginLeft = '8px';

        checkbox.addEventListener('change',()=>{
        tasks[index].completed = checkbox.checked;
        saveTasks(); 
    })

    li.appendChild(checkbox);
    li.appendChild(label);
    list.appendChild(li)
    })
}

//Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*
Below are the functions that return feedback to the screen.
*/

//Add tasks to the list with a lambda function
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const name = input.value.trim();

    if (name === '') return;

    tasks.push({name, completed: false});

    saveTasks();
    renderTasks();

    input.value = '';
});

//Delete the selected task
deleteElement.addEventListener('click', function(event){
    event.preventDefault();
    tasks = tasks.filter((task)=> !task.completed);
    renderTasks();
})

//Delete all tasks
deleteAllElements.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear();
    tasks=[];
    renderTasks();
})

markAll.addEventListener('click', ()=>{
    tasks.forEach(task => task.completed = true);
    renderTasks();
})

unmarkAll.addEventListener('click', ()=>{
    tasks.forEach(task => task.completed = false);
    renderTasks();
})

renderTasks();