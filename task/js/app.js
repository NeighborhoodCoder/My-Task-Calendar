important = false
allMyTasks = [];
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
    let star = ``;
    if(task.important){
        star = `<i id="impStar" class="fas fa-star"></i>`
    }
    let btn = `<button onclick="doneTask('${task._id}')" class="btn btn-success">Done</button>`;
    if(task.done){
        btn = `COMPLETED`;
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
            ${btn}
        </div>
    </div>
    `

    if(task.done){
        $(`#completedTasks`).append(syntax);
    }else{
        $(`#pendingTasks`).append(syntax);
    }
    
}

function doneTask(id){
    console.log(`Done Task`,id);
    for(i in allMyTasks){
        let task = allMyTasks[i];
        if(task._id === id){
            task.done = true ;
            console.log(task);

            $.ajax({
                type: `PUT`,
                url: serverUrl + `api/tasks`,
                data: JSON.stringify(task),
                contentType: `application/json`,
                success: function(res){
                    let t = JSON.parse(res);
                    console.log(`successfully doned the task`);
                    $(`#${id}`).remove();
                    displayTasks(t);
                },
                error: function(err){
                    console.log(`Failed to PUT`,err);
                }
            })
        }
    }
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

function getTasks(){
    $.ajax({
        type: `GET`,
        url: serverUrl + `api/tasks`,
        success: function(res){
            let t = JSON.parse(res);
            for(i in t){
                if(t[i].name === `KennyCH21`){
                    displayTasks(t[i]);
                    console.log(t[i]);
                    allMyTasks.push(t[i]);
                }
            }
        }
    })
}

function deleteTasks(){
    console.log(`Clear Button Pressed`);
    $.ajax({
        type: `DELETE`,
        url: serverUrl + `api/tasks/clear/KennyCH21`,
        success: function(res){
        let t = JSON.parse(res);
        console.log(`All Tasks Have Been Cleared...`,t);
        },
        error: function(err){
        console.log(`Something went wrong`,err);
        }
    })
}

function init(){
    console.log(`Task Site`);
    // Load Data
    getTasks();

    // Hook Events
    $(`#impStar`).click(toggleImp);
    $(`#btnSave`).click(saveTasks);
    $(`#btnDelete`).click(deleteTasks);
}

window.onload=init;