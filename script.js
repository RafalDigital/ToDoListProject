
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBTN = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const todosContainer = document.querySelector('.todo-container');


    const ToggleEmptyState = () => {
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    }

    // Fungsi Mengsave Ke LocalStorage
    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Fungsi Memuat Data Dari LocalStorage
    const LoadtasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed}) => AddTask(text, completed, false));
        // ToggleEmptyState();
    }

    // Fungsi Menambah Tugas
    const AddTask = (text, completed = false) => {
                // event.preventDefault()
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return
        }

        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}><span>${taskText}</span>
        <div class="task-buttons">
        <button class="edit-btn"></button>
        <button class="delete-btn"></button>
    </div>`;

        const checkbox = li.querySelector('.checkbox')
        const editBTN = li.querySelector('.edit-btn');

        if(completed) {
            li.classList.add('completed');
            editBTN.disabled = true;
            editBTN.style.opacity = '.5';
            editBTN.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBTN.disabled = isChecked;
            editBTN.style.opacity = isChecked ? '0.5' : '1';
            editBTN.style.pointerEvents = isChecked ? 'none' : 'auto';
            saveTaskToLocalStorage();
        })

        editBTN.addEventListener('click', () => {
            if(!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                // ToggleEmptyState();
                saveTaskToLocalStorage();
            }
        })

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.style.animation = 'FadeOut .3s forwards';
            
            setTimeout(function() {
            li.remove();
        }, 300);
li.remove();
        saveTaskToLocalStorage();
        })
        
        taskList.appendChild(li);
        taskInput.value = '';
        saveTaskToLocalStorage();
    }

    addTaskBTN.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah form submit dan reload
        AddTask(); // Panggil fungsi tanpa argumen
    });
    taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault(); // Mencegah form submit dan reload
            AddTask(); // Panggil fungsi tanpa argumen
        }
    })

    LoadtasksFromLocalStorage();
});