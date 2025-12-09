// Add Task
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const message = document.getElementById('message');

  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (taskList) {
    renderTasks();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('taskName').value;
      const date = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;

      tasks.push({ name, date, priority });
      localStorage.setItem('tasks', JSON.stringify(tasks));

      message.textContent = '✅ Task added successfully!';
      form.reset();
      setTimeout(() => message.textContent = '', 2000);
    });
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.name} - ${task.date} (${task.priority})</span>
        <button onclick="deleteTask(${index})">❌</button>
      `;
      taskList.appendChild(li);
    });
  }

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  };
});
