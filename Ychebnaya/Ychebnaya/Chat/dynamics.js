var number = -1;
var uniqueId = function() {
    var date=Date.now();
    var random = Math.random() * Math.random();
    return Math.floor(date * random).toString();
};
var theTask = function(user,message) {
    return {
        login:user,
        message:message,
        id: uniqueId()
    };
};
var taskList = [];
function run() {
    var Container = document.getElementsByClassName('container')[0];
    Container.addEventListener('click', delegateEvent);
    allTask = restoreChat();
    var login = restoreLogin();
    if (login != "") {
        document.getElementById('nameLogin').innerHTML = login;
        document.getElementById('onlineUser').innerHTML = login;
    }
    createAllTask(allTask);
}
function delegateEvent(event) {
    if (event.type == 'click' && event.target.classList.contains('btn-info')) {
        buttonClick();
    }
    if (document.getElementById('newMessage').value != "") {
        if (event.type == 'click' && event.target.classList.contains('input')) {
            //Чтобы не выдавало ошибку при нажатии на input
            return;
        }
        if (document.getElementById('nameLogin').innerHTML =="") {
            // Если вы ввели текст забыли про логин то сможете залогиниться
            if (event.type == 'click' && event.target.classList.contains('btn-success')) {
                PickLogin();
            }
            return;
        }
        alert('make changes , and then enter');
        document.getElementById('newMessage').focus();
        return;
    }
    else {
        if (event.type == 'click' && event.target.classList.contains('btn-success')) {
            PickLogin();
        }
        if (event.type == 'click' && event.target.classList.contains('btn-warning')) {
            changeClick(event.target.parentNode);
        }
        if (event.type == 'click' && event.target.classList.contains('btn-danger')) {
            deleteClick(event.target.parentNode);
        }
    }
}
function createAllTask(allTask) {
    for(var i=0;i< allTask.length;i++)
    addTodo(allTask[i]);
}
function storeChat(listToSave) {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    localStorage.setItem("Chat", JSON.stringify(listToSave));
}
function storeLogin(login) {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    localStorage.setItem("Login", JSON.stringify(login));
}
function restoreChat() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    var item = localStorage.getItem("Chat");
    return item && JSON.parse(item);
}
function restoreLogin() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    var item = localStorage.getItem("Login");
    return item && JSON.parse(item);
}
function PickLogin() {
    var login = document.getElementById('Login');
    document.getElementById('nameLogin').innerHTML = login.value;
    document.getElementById('onlineUser').innerHTML = login.value;
    storeLogin(login.value);
    login.value = '';
}
function buttonClick() {
    var message = document.getElementById('newMessage').value;
    var user = document.getElementById('nameLogin').innerHTML;
    if (user.localeCompare("") == 0) {
        alert("Заполни логин!!!")
        return;
    }
    if (!message)
        return;
    var newTask = theTask(user,message);
    addTodo(newTask);
    document.getElementById('newMessage').value ='';
    storeChat(taskList);
}
function addTodo(task) {
    var item = createItem(task);
    var items = document.getElementsByClassName('items')[0];
    if (number != -1) {
        items.childNodes[number].childNodes[2].data = task.message;
        taskList[number].message = task.message;
        number = -1;
    }
    else {
        taskList.push(task);
        items.appendChild(item);
    }
}
function createItem(task) {
    var temp = document.createElement('div');
    var htmlAsText = '<div class="item" data-task-id="индефикатор">'+
            'Логин<br>Сообщение<br><input class="btn  btn-danger btn-mini" type="button" value="delete">'+
        '<input class="btn btn-warning btn-mini" type="button" value="change"></div>';
    temp.innerHTML = htmlAsText;
    updateItem(temp.firstChild, task);
    return temp.firstChild;
}
function updateItem(divItem,task) {
    divItem.setAttribute('data-task-id',task.id);
    divItem.childNodes[0].textContent = task.login;
    divItem.childNodes[2].textContent = task.message;
}
function deleteClick(item) {
    if (document.getElementById('nameLogin').innerHTML !== item.childNodes[0].textContent) {
        alert("You can't delete message's other users");
        return;
    }
    var items = document.getElementsByClassName('items')[0];
    var id = item.attributes['data-task-id'].value;
    for(var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            break;
        }
    }
    items.removeChild(items.childNodes[i]);
    taskList.splice(i,1);
    storeChat(taskList);
}
function changeClick(item) {
    if (document.getElementById('nameLogin').innerHTML !== item.childNodes[0].textContent) {
        alert("You can't change message's other users");
        return;
    }
    var b = item.childNodes[2].textContent;
    document.getElementById('newMessage').value = b;
    deletemessage(item);
    document.getElementById('newMessage').focus();
}
function deletemessage(item) {
    var items = document.getElementsByClassName('items')[0];
    var id = item.attributes['data-task-id'].value;
    for(var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            number = i;
            break;
        }
    }
    items.childNodes[number].childNodes[2].textContent ='';
}
