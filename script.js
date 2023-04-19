// script.js

// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
// Get the new DOM element
const dueDateInput = document.getElementById('dueDateInput');
// Load saved tasks on page load
document.addEventListener('DOMContentLoaded', loadSavedTasks);

// Add a task when the "Add" button is clicked
addTaskButton.addEventListener('click', addTask);

// Function to add a task
// Modify the addTask function
function addTask() {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;

    if (taskText.trim() !== '' && dueDate !== '') {
        const newTask = createTaskElement(taskText, dueDate);

        // Save the task in localStorage
        saveTask({taskText, dueDate});

        taskList.appendChild(newTask);
        taskInput.value = '';
        dueDateInput.value = '';
    }
}

// Function to create a task element
function createTaskElement(taskText, dueDate) {
    const newTask = document.createElement('li');

    // Create a container for the task text and due date
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerHTML = `<span>${taskText}</span> - <span>${dueDate}</span>`;
    newTask.appendChild(taskContent);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(newTask);

        // Remove the task from localStorage
        removeTask(taskText);
    });

    newTask.appendChild(deleteButton);

    newTask.addEventListener('click', () => {
        newTask.classList.toggle('completed');
    });

    return newTask;
}

// Function to save a task in localStorage
function saveTask(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = tasks.filter(task => task.taskText !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load saved tasks from localStorage
function loadSavedTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(({taskText, dueDate}) => {
        const taskElement = createTaskElement(taskText, dueDate);
        taskList.appendChild(taskElement);
    });
}