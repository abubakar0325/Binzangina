// Initialize array from localStorage or create a default array
let myArray2 = JSON.parse(localStorage.getItem('myStorage')) || [{
  inputValue: "Sleeping",
  dateValue: 'djdidj',
  completed: false // Add a 'completed' property to track task status
}];

// Function to save data to localStorage
function storageFun() {
  localStorage.setItem('myStorage', JSON.stringify(myArray2));
}

// Add event listener to the "Add" button
document.querySelector('.add-button').addEventListener('click', () => {
  let todoInput = document.getElementById('todo-input').value;
  let dateinput = document.querySelector('.date-input').value;
  myArray2.push({
    inputValue: todoInput,
    dateValue: dateinput,
    completed: false // New tasks are incomplete by default
  });
  // Save to localStorage and clear inputs
  storageFun();
  document.getElementById('todo-input').value = '';
  document.querySelector('.date-input').value = '';
  generateHTML();
});

// Function to generate HTML and display tasks
function generateHTML(filter = 'all') {
  let valueToDisplay = '';
  let taskCount = 0;
  let incompleteCount = 0;

  myArray2.forEach((element, index) => {
    // Skip completed tasks if filter is 'incomplete'
    if (filter === 'incomplete' && element.completed) return;
    // Skip incomplete tasks if filter is 'completed'
    if (filter === 'completed' && !element.completed) return;

    taskCount++;
    if (!element.completed) incompleteCount++;

    valueToDisplay += `
      <div class="todo-item ${element.completed ? 'completed' : ''}">
        <input type="checkbox" class="todo-checkbox" data-index="${index}" ${element.completed ? 'checked' : ''}>
        <p class="todo-name">${element.inputValue}</p>
        <p class="todo-date">${element.dateValue}</p>
        <button class="todo-button" data-index="${index}">Delete</button>
      </div>
    `;
  });

  // Insert HTML into the page
  document.querySelector('.generated-html').innerHTML = valueToDisplay;

  // Update task count
  document.querySelector('.task-count').innerHTML = `
    Total Tasks: ${taskCount} | Incomplete: ${incompleteCount}
  `;

  // Add event listeners to the delete buttons
  document.querySelectorAll('.todo-button').forEach(button => {
    button.addEventListener('click', () => {
      deleteItem(button.getAttribute('data-index'));
    });
  });

  // Add event listeners to the checkboxes
  document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      toggleCompleted(checkbox.getAttribute('data-index'));
    });
  });
}

// Function to delete an item
function deleteItem(index) {
  myArray2.splice(index, 1);
  storageFun();
  generateHTML();
}

// Function to toggle task completion status
function toggleCompleted(index) {
  myArray2[index].completed = !myArray2[index].completed;
  storageFun();
  generateHTML();
}

// Function to clear all tasks
function clearAllTasks() {
  myArray2 = [];
  storageFun();
  generateHTML();
}

// Add event listeners to filter buttons
document.querySelector('.filter-all').addEventListener('click', () => generateHTML('all'));
document.querySelector('.filter-completed').addEventListener('click', () => generateHTML('completed'));
document.querySelector('.filter-incomplete').addEventListener('click', () => generateHTML('incomplete'));

// Add event listener to clear all button
document.querySelector('.clear-all').addEventListener('click', clearAllTasks);

// Initial render of tasks
generateHTML();
