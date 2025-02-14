
// creating array for storing data from Imputs
let myArray2 = JSON.parse(localStorage.getItem('myStorage')); 
if (!myArray2){
  myArray2 = [{
    inputValue: "Sleeping",
    dateValue: 'djdidj'}]};

function storageFun(){
localStorage.setItem('myStorage', JSON.stringify(myArray2));
}
//function for collecting data from inputs and put it in the array
document.querySelector('.add-button')
  .addEventListener('click', () => {
    let todoInput = document.getElementById('todo-input').value;
    let dateinput = document.querySelector('.date-input').value;
    myArray2.push({
      inputValue: todoInput,
      dateValue: dateinput,
    });
    //clear input after collecting data
    storageFun();
    document.getElementById('todo-input').value = '';
    document.querySelector('.date-input').value = '';
    generateHTML();
  })
  //function for generating HTMl by using our array data and display it in the page
  function generateHTML(){
  let valueToDisplay = '';
  //loop through the array
  myArray2.forEach((element, index) => {
    valueToDisplay+= `
      <p class="todo-name">${element.inputValue}</p>
      <p class="todo-date">${element.dateValue}</p>
      <button class="todo-button" onclick="deleteItem(${index})">Delete</button>
    `;
  });
  storageFun();
  //put the HTML in the page
  document.querySelector('.generated-html').innerHTML = valueToDisplay;
}


function deleteItem(index) {
  myArray2.splice(index, 1);
  storageFub();
  generateHTML();
};


document.getElementById('todo-input').addEventLinstner('input', () => {

  generateHTML();
});
