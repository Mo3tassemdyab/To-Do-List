let taskInputBtn = document.getElementById("taskInput");
let todoBtn = document.getElementById("todo-button");
let todosContainer = document.getElementById("todos-container");
let mySelect = document.getElementById("mySelect");
let searchInput = document.getElementById("searchInput");

let allToDos = [];
if (localStorage.getItem("allToDos") != null) {
  allToDos = JSON.parse(localStorage.getItem("allToDos"));
  displayData(allToDos);
}

todoBtn.addEventListener("click", function () {
  let task = {
    taskDetails: taskInputBtn.value,
    isCompleted: false,
    id: `${Math.random() * 10000}-${Math.random() * 10000}`,
  };

  allToDos.push(task);
  localStorage.setItem("allToDos", JSON.stringify(allToDos));
  displayData(allToDos);
  clearInput();
});

function displayData(arr) {
  let cartoona = "";
  for (const task of arr) {
    cartoona += `  <div class="col-11 todo  ${
      task.isCompleted == true ? "completed" : ""
    }">
            <div class="row text-dark  bg-warning">
              <div class="col-8  py-3 fs-5">${task.taskDetails}</div>
              <div class="col-2  py-3 bg-success d-flex justify-content-center" onclick =" beCompleted('${
                task.id
              }')"  ><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
              <div class="col-2  py-3 bg-danger d-flex justify-content-center"onclick="deleteToDo('${task.id}')" ><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
            </div>
          </div>
         `;
  }
  todosContainer.innerHTML = cartoona;
}

function clearInput() {
  taskInputBtn.value = "";
}

function beCompleted(id) {
  let currentIndex = allToDos.findIndex(function (task) {
    return task.id == id;
  });
  console.log(currentIndex);
  allToDos[currentIndex].isCompleted =
    allToDos[currentIndex].isCompleted == true ? false : true;
  localStorage.setItem("allToDos", JSON.stringify(allToDos));
  displayValue();
}

mySelect.addEventListener("change", function () {
  displayValue();
});

function displayValue() {
  switch (mySelect.options[mySelect.options.selectedIndex].value) {
    case "all":
      displayData(allToDos);
      break;
    case "completed":
      let completedFilter = allToDos.filter(function (task) {
        return task.isCompleted == true;
      });
      displayData(completedFilter);
      break;
    case "uncompleted":
      let unnCompletedFilter = allToDos.filter(function (task) {
        return task.isCompleted == false;
      });
      displayData(unnCompletedFilter);
      break;
  }
}

function deleteToDo(id){

    let index = allToDos.findIndex(function(task){return task.id == id}); 
    allToDos.splice(index,1);
    displayData(allToDos);
    localStorage.setItem('allToDos', JSON.stringify(allToDos));
}

searchInput.addEventListener('input', function(e){
    let search = [];
    for(let i = 0; i < allToDos.length; i++){
        if ( allToDos[i].taskDetails.toLowerCase().includes(e.target.value.toLowerCase())) {
            search.push(allToDos[i])
        }
    }


    displayData(search)
})