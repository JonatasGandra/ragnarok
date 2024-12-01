const ic = document.querySelector('.ic');
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector('.x');
const taskInput = document.getElementById('task-input');
const taskList = document.querySelector('.task');
const circles = document.querySelectorAll('.e11, .e22, .e33');


let selectedUrgency = null;

ic.onclick = function () {
    modal.showModal();
};

buttonClose.onclick = function() {
    modal.close();
};

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDate = document.querySelector('.birthday').value; 

    if (taskText && selectedUrgency) {

        const formattedDate = formatDate(taskDate);

        const li = document.createElement('li');
        li.innerHTML = `
            <button class="${selectedUrgency}"></button> 
            <span>${taskText}</span> 
            <span class="date">${formattedDate}</span> <!-- Exibe a data formatada -->
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>`;

        const urgencyButton = li.querySelector(`.${selectedUrgency}`);
        urgencyButton.addEventListener('click', function() {
            this.classList.toggle('active');
        });

        li.querySelector('.bi-trash3').addEventListener('click', function() {
            li.remove();
        });

        taskList.appendChild(li);
        taskInput.value = ''; 
        document.querySelector('.birthday').value = ''; 
        selectedUrgency = null; 
    }
}


function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
}




taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
        modal.close(); 
    }
});

document.querySelectorAll('.urgencias button').forEach(button => {
    button.addEventListener('click', function() {
        selectedUrgency = this.classList[0];
    });
});

document.querySelector('.ok').addEventListener('click', addTask);
document.querySelectorAll('.e111 button, .e222 button, .e333 button').forEach(button => {
    button.addEventListener('click', function() {
    
        this.classList.toggle('active');

    
        document.querySelectorAll('.e111 button.active, .e222 button.active, .e333 button.active').forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('active');
            }
        });
    });
});
