important = false

function toggleImp(){
    $(`#impStar`).toggleClass(`far fas`);
    if(important){
        important = false;
    }else{
        important = true
    }
    console.log(`task is ${important}`);
}

function displayTasks(){
    let title=$(`#title`).val();
    let dueDate=$(`#date`).val();
    let location=$(`#location`).val();
    let priority=$(`#priority`).val();
    let color=$(`#color`).val();
    let contact=$(`#contact`).val();
    let des=$(`#des`).val();

    let task = new Task(title,important,dueDate,location,priority,color,contact,des);

    console.log(task);
}

function init(){
    console.log(`Task Site`);
    // Load Data


    // Hook Events
    $(`#impStar`).click(toggleImp);
    $(`#btnSave`).click(displayTasks);
}

window.onload=init;