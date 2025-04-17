document.addEventListener("DOMContentLoaded", () => {
    const stored = JSON.parse(localStorage.getItem('tasks'));

    if (stored) {
        task = stored;
        updatetasklist();
        updatestats();
    }
});


let task = [];

const savetask = () => {
    localStorage.setItem('tasks', JSON.stringify(task));
}

const addtask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskinput.value = '';
        updatetasklist();
        updatestats();
        savetask();
    }
    console.log(task);
};

const toggletaskcomplete = (index) => {
    task[index].completed = !task[index].completed;
    updatetasklist();
    updatestats();
    savetask();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updatetasklist();
    updatestats();
    savetask();
};

const editTask = (index) => {
    const taskinput = document.getElementById("taskinput");
    taskinput.value = task[index].text;

    task.splice(index, 1);
    updatetasklist();
    savetask();
};

const updatestats = () => {
    const completetask = task.filter(task => task.completed).length;
    const totaltask = task.length;
    const progress = (completetask / totaltask) * 100;
    const progressbar = document.getElementById("Progress");
    progressbar.style.width = `${progress}%`;


    document.getElementById("Numbers").innerText = `${completetask} / ${totaltask}`;
    if (task.length && completetask == totaltask) {
        confettyy();
    }
}

const updatetasklist = () => {
    const tasklist = document.getElementById("Task-List");
    tasklist.innerHTML = "";

    task.forEach((task, index) => {
        const listitem = document.createElement('li');

        listitem.innerHTML = `
    <div class="taskitem">
        <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src="./edit.png" onClick="editTask(${index})">
            <img src="./bin.png" onClick="deleteTask(${index})">
        </div>
    </div>
`;

        listitem.addEventListener("change", () => toggletaskcomplete(index));
        tasklist.append(listitem);
    });
}

document.getElementById("newtask").addEventListener("click", function (e) {
    e.preventDefault();

    addtask();
});

const confettyy = () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });

        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 2,
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: ["🦄", "🌈"],
                },
            },
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}