
    // addTodo(item)
    // renderTodos(todos)
    // addToLocalStorage(todos)
    // getFromLocalStorage()
    // toggle(id)
    // deleteTodo(id)


    // select everything
    // select the todo-form
    // this will grab the content from these querySelectors
    const todoForm = document.querySelector('.todo-form');
    // select the input box
    const todoInput = document.querySelector('.todo-input');
    // select the todo items
    const todoItemsList = document.querySelector('.todo-items');

    //create a array to hold all of the todos      
    //each item in the arr will be a js obj-id, name & completed status.   
    let todos = [];


    //whenever user types a new todo into the Input.  going to grab that value and make a 
    //obj and push to todos arr.

    //add eventListener on form and listen for submit event
    todoForm.addEventListener('submit', function(event) {
        //prevent page from reloading when submitting the form
        event.preventDefault();
        addTodo(todoInput.value); // call addTodo function with input
    });
    
    // func to add todo 
    function addTodo(item)  {
        // if item is not empty
        if (item !== '') {
            //make a todo obj, which has id, name and completed
            const todo = {
                id: Date.now(),
                name: item,
                completed: false 
            };
            // then add it to todos arr
            todos.push(todo);
            // renderTodos(todos); // then renders them between <ul> </ul>
            addToLocalStorage(todos); //store it in localStorage

            //finally clear the input box value
            todoInput.value = '';
        }
    }
// this addTodo() will take the 1st arg: 
// check if item is empty or not.  if empty 
//construct a new todo ; then push the obj into todos arr; then calls renderTodos()
// that is responsible for rendering ea item on the screen.  Finally it will clear input box.


//func to render given todos to screen
function renderTodos(todos) {
    //clear everything inside <ul> w/ clss=todo-todo-items 
    todoItemsList.innerHTML = '';

    //run through ea item inside of todos
    todos.forEach(function(item){
        //check if each item is completed
        const checked = item.completed ? 'checked' : null;

        // make a li element and fill it                                
        const li = document.createElement('li');
        // <li class="item"></li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li> 
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */

        // if item is completed, then add a class to <li> called 'checked', which will add 
        //line-through style
        if(item.completed === true) {
            li.classList.add('checked');
        }
       li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li)  
    });
}
// this func clears everything inside the .tod-items--ul which holds the todo item
// next it will loop through ea item inside the todos arr. which is passed as/a arg
// and for each item it will create a li; but the val will get replaced by the 
// corresponding item val.
// finally we are appending the li we made to the todo-items --ul
// Also doing two other things

////////////////////////////////////


// add local storage capability
//function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the arr to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // render them to screen          
    renderTodos(todos);
}
// we can store items in localStor using setItem. we need a key and a value.
// name key todos and the val is our todos arr itself. I can't store an arr inside
// localStor.   I need to convert it to a string.--JSON.stringify()
// finaly calling renderTodos, whenever we added something to localStor,
// we will render those changes to the screen. That's why add renderTodoss() to the end.
// now replace renderTodos inside addTodo func w/ addLocalStor
// they are vanishing from the screen when we refresh our screen.
// to solve that make a func called getLocalStorage
// this will help parse all items from localStor whenever we load our web page.
// JSON.parse() used here is to convert the stringified arr back into a real arr.

//function helps to get everything from local local storage 
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exist
    if (reference) {
        // converts back to arr and store it in todos arr
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});