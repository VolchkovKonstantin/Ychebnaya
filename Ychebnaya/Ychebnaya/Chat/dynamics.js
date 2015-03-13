var number = 0;
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
    var message = document.getElementById('newMessage');
    var user = document.getElementById('nameLogin');
    user.value = document.getElementById('nameLogin').innerHTML;
    if (user.value.localeCompare("") == 0) {
        alert("Заполни логин!!!")
        return;
    }
    if (!message.value)
        return;
    var newTask = theTask(user.value,message.value);
    addTodo(newTask);
    message.value = '';
    storeChat(taskList);
}
function addTodo(task) {
    var item = createItem(task);
    var items = document.getElementsByClassName('items')[0];
    if (number) {
        items.childNodes[number].childNodes[2].data = task.message;
        taskList[number-1].message = task.message;
        number = 0;
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
        return
    }
    var items = document.getElementsByClassName('items')[0];
    var i = 0;
    for (i = 0; i < items.childNodes.length; i++)
        if (items.childNodes[i] === item) {
            break;
        }
    if (i < number)
        number--;
    if (i == number)
    number = 0;
    items.removeChild(items.childNodes[i]);
    taskList.splice(i-1,1);
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
}
function deletemessage(item) {
    var items = document.getElementsByClassName('items')[0];
    var element, i = 0;
    for (i = 0; i < items.childNodes.length; i++)
        if (items.childNodes[i] === item) {
            element = i;
            number = i;
            break;
        }
    items.childNodes[element].childNodes[2].textContent ='';
}
