let firebaseConfig = {
    apiKey: "unAPIkey",
    authDomain: "batman.firebaseapp.com",
    databaseURL: "https://base-de-datos",
    projectId: "un-id-de-proyecto",
    storageBucket: "un-storage",
    messagingSenderId: "000000000",
    appId: "una-app-id"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const day = new Date();
const time = day.getTime();
let counter = time;

document.getElementById("form").addEventListener("submit", (e) => {
    let task = document.getElementById("task").value;
    let description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task, description);
    form.reset();
});

function createTask(taskName, description) {
    console.log(counter);
    counter+=1;
    console.log(counter);
    let task = {
        task: taskName,
        id: counter,
        description: description
    }
    let db = firebase.database().ref("tareas/"+counter);
    db.set(task);
    document.getElementById("cardSection").innerHTML='';
    readTask();
}

function readTask() {
    let task = firebase.database().ref("tareas/")
    task.on("child_added", function(data) {
        let taskValue = data.val();
        console.log(taskValue);
        document.getElementById("cardSection").innerHTML+=`
            <div class="box">
                <p>
                    <strong>${taskValue.task}</strong>
                    <br>
                    ${taskValue.description}
                </p>
                <button type="submit" class="button is-warning is-rounded" onclick="updateTask(${taskValue.id}, '${taskValue.task}', '${taskValue.description}')">Editar tarea</button>
                <button type="submit" class="button is-danger is-rounded" onclick="deleteTask(${taskValue.id})">Borrar tarea</button>
            </div>
        `
    })
}

function reset() {
    document.getElementById("firstSection").innerHTML=`
    <form action="" id="form">
        <div class="field">
            <label class="label">Tarea</label>
            <div class="control">
                <input class="input" type="text" id="task" placeholder="Hacer de comer">
            </div>
        </div>

        <div class="field">
            <label class="label">Descripción</label>
            <div class="control">
                <input class="input" type="text" id="description" placeholder="Descripción">
            </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button type="submit" class="button is-primary is-rounded" id="submit">Guardar</button>
            </p>
        </div>
    </form>
    `;

    document.getElementById("form").addEventListener("submit", (e) => {
        let task = document.getElementById("task").value;
        let description = document.getElementById("description").value;
        e.preventDefault();
        createTask(task, description);
        form.reset();
    });
}

function updateTask(id, name, description) {
    document.getElementById("firstSection").innerHTML=`
    <form action="" id="form2">
        <div class="field">
            <label class="label">Tarea</label>
            <div class="control">
                <input class="input" type="text" id="task" placeholder="Hacer de comer">
            </div>
        </div>

        <div class="field">
            <label class="label">Descripción</label>
            <div class="control">
                <input class="input" type="text" id="description" placeholder="Descripción">
            </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button style="display: none" type="submit" class="button is-primary is-rounded" id="button1">Guardar</button>
                <button type="submit" style="display: inline-block" id="button2" class="button is-link is-rounded">Actualizar</button>
                <button style="display: inline-block" id="button3" class="button is-light is-rounded">Cancelar</button>
            </p>
        </div>
    </form>
    `;
    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("button2").addEventListener("click", (e) => {
        updateTask2(id, document.getElementById("task").value,document.getElementById("description").value);
    });
    document.getElementById("task").value=name;
    document.getElementById("description").value=description;
}

function updateTask2(id, name, description) {
    let taskUpdated = {
        task: name,
        id: id,
        description: description
    }
    let db = firebase.database().ref("tareas/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
}

function deleteTask(id) {
    let task = firebase.database().ref("tareas/"+id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
}