// Get references to elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelector = document.getElementById("priority-selector");

// Function to add a task
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task!");
    return;
 }
 
  // Create a new list item for the task
  const li = document.createElement("li");
  li.className = prioritySelector.value; // Set priority class

  // Add task text inside a <p> tag
  const taskText = document.createElement("p");
  taskText.textContent = inputBox.value;

  // Add a remove button
  const removeButton = document.createElement("span");
  removeButton.textContent = "×";

  // Append elements to the list item
  li.appendChild(taskText);
  li.appendChild(removeButton);
  listContainer.appendChild(li);

  // Clear input and save tasks
  inputBox.value = "";
  saveData();
}

// Event listener for list item actions
listContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked"); // Toggle completed task
    saveData();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove(); // Remove task
    saveData();
  }
});

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function loadData() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

// Clear all tasks
function clearAll() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks"); // Remove tasks from storage
    listContainer.innerHTML = ""; // Clear tasks from the screen
  }
}

loadData()
