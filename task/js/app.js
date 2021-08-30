important = false
serverUrl = "https://fsdiapi.azurewebsites.net/";

function toggleImp(){
    $(`#impStar`).toggleClass(`far fas`);
    if(important){
        important = false;
    }else{
        important = true
    }
    console.log(`task is ${important}`);
}

function displayTasks(task){
    let star = ``
    if(important){
        star = `<i id="impStar" class="fas fa-star"></i>`
    }
    let syntax = `
    <div id="${task._id}" class="task" style="border: 2px solid ${task.color};">
        <div class="import">
            ${star}
        </div>
        <div class="task-body">
            <label><strong>${task.title}</strong></label><br>
            <label>${task.des}</label><br>
            <label class="small">Location: ${task.location}</label>
            <label class="small">Due: ${task.dueDate}</label>
        </div>
        <div class="task-btn">
            <button class="btn btn-success">Done</button>
        </div>
    </div>
    `
    $(`#pendingTasks`).append(syntax);
}

function saveTasks(){
    let title=$(`#title`).val();
    let dueDate=$(`#date`).val();
    let location=$(`#location`).val();
    let priority=$(`#priority`).val();
    let color=$(`#color`).val();
    let contact=$(`#contact`).val();
    let des=$(`#des`).val();

    let task = new Task(title,important,dueDate,location,priority,color,contact,des);

    $.ajax({
        type: `POST`,
        url: serverUrl + `api/tasks/`,
        data: JSON.stringify(task),
        contentType: `application/json`,
        success: function(res){
            console.log(`Task Added!`,res);
            let t = JSON.parse(res);
            displayTasks(t);
        }
    })

    console.log(task);
}


function init(){
    console.log(`Task Site`);
    // Load Data


    // Hook Events
    $(`#impStar`).click(toggleImp);
    $(`#btnSave`).click(saveTasks);
}

window.onload=init;