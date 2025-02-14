// Initialize array from localStorage or create a default array
let myArray2 = JSON.parse(localStorage.getItem('myStorage')) || [{
  inputValue: "Sleeping",
  dateValue: 'djdidj'
}];

// Function to save data to localStorage
function storageFun() {
  localStorage.setItem('myStorage', JSON.stringify(myArray2));
}

// Add event listener to the "Add" button
document.querySelector('.add-button').addEventListener('click', () => {
  let todoInput = document.getElementById('todo-input').value.trim();
  let dateinput = document.querySelector('.date-input').value.trim();

  // Check if inputs are not empty
  if (todoInput && dateinput) {
    myArray2.push({
      inputValue: todoInput,
      dateValue: dateinput,
    });
    // Save to localStorage and clear inputs
    storageFun();
    document.getElementById('todo-input').value = '';
    document.querySelector('.date-input').value = '';
    generateHTML();
  } else {
    alert("Please fill in both fields.");
  }
});

// Function to generate HTML and display tasks
function generateHTML() {
  let valueToDisplay = '';
  myArray2.forEach((element, index) => {
    valueToDisplay += `
      <div class="todo-item">
        <p class="todo-name">${element.inputValue}</p>
        <p class="todo-date">${element.dateValue}</p>
        <button class="todo-button" data-index="${index}">Delete</button>
      </div>
    `;
  });

  // Insert HTML into the page
  document.querySelector('.generated-html').innerHTML = valueToDisplay;

  // Add event listeners to the delete buttons
  document.querySelectorAll('.todo-button').forEach(button => {
    button.addEventListener('click', () => {
      deleteItem(button.getAttribute('data-index'));
    });
  });
}

// Function to delete an item
function deleteItem(index) {
  myArray2.splice(index, 1); // Remove the item from the array
  storageFun(); // Save the updated array to localStorage
  generateHTML(); // Regenerate the HTML to reflect the changes
}

// Initial render of tasks
generateHTML();
