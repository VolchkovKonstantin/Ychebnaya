var numberChangeString = -1;
var uniqueId = function () {
    var date = Date.now();
    var random = Math.random() * Math.random();
    return Math.floor(date * random).toString();
};
var theTask = function (user, message) {
    return {
        login: user,
        message: message,
        id: uniqueId()
    };
};
function run() {
    var Container = document.getElementsByClassName('container')[0];
    Container.addEventListener('click', delegateEvent);
    taskList = restoreChat();
    if (taskList == null) {
        taskList=[];
    }
    var login = restoreLogin();
    if (login != "") {
        document.getElementById('nameLogin').innerHTML = login;
    }
    createAllTask(taskList);
    var block = document.getElementsByClassName("chat")[0];
    block.scrollTop = block.scrollHeight;
}
function delegateEvent(event) {
    if (event.type == 'click' && (event.target.classList.contains('btn-sent')||event.target.classList.contains('btn-my'))) {
        buttonClick();
    }
    if (document.getElementById('inputMessage').value != "") {
        if (event.type == 'click' && event.target.classList.contains('input')) {
            //Чтобы не выдавало ошибку при нажатии на input
            return;
        }
        if (numberChangeString == -1) {
            // Если вы ввели текст то сможете залогиниться
            if (event.type == 'click' && event.target.classList.contains('btn-info')) {
                pickLogin();
            }
            return;
        }
        alert('Please finish input');
        document.getElementById('inputMessage').focus();
        return;
    }
    else {
        if (event.type == 'click' && event.target.classList.contains('btn-info')) {
            pickLogin();
        }
        if (event.type == 'click' && event.target.classList.contains('iconChange')) {
            changeClick(event.target.parentNode);
        }
        if (event.type == 'click' && event.target.classList.contains('iconDelete')) {
            deleteClick(event.target.parentNode);
        }
    }
}
function createAllTask(taskList) {
    for (var i = 0; i < taskList.length; i++)
        addTodo(taskList[i]);
}
function storeChat(listToSave) {
    if (typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    localStorage.setItem("Chat", JSON.stringify(listToSave));
}
function storeLogin(login) {
    if (typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    localStorage.setItem("Login", JSON.stringify(login));
}
function restoreChat() {
    if (typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    var item = localStorage.getItem("Chat");
    return item && JSON.parse(item);
}
function restoreLogin() {
    if (typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }
    var item = localStorage.getItem("Login");
    return item && JSON.parse(item);
}
function pickLogin() {
    var login = document.getElementById('inputLogin');
    document.getElementById('nameLogin').innerHTML = login.value;
    storeLogin(login.value);
    login.value = '';
    var items = document.getElementsByClassName('items') [0];
    for (var i = 0; i < items.childElementCount; i++) {
        if (document.getElementById('nameLogin').innerHTML !== items.childNodes[i].childNodes[0].textContent && items.childNodes[i].childElementCount == 4) {
            items.childNodes[i].removeChild(items.childNodes[i].childNodes[3]);
            items.childNodes[i].removeChild(items.childNodes[i].childNodes[2]);
            items.childNodes[i].classList.remove('border2');
            items.childNodes[i].classList.add('border1');
            items.childNodes[i].childNodes[0].classList.remove('fat');
        }
        else if (document.getElementById('nameLogin').innerHTML == items.childNodes[i].childNodes[0].textContent && items.childNodes[i].childElementCount != 4) {
            items.childNodes[i].childNodes[0].classList.add('fat');
            items.childNodes[i].classList.remove('border1');
            items.childNodes[i].classList.add('border2');
            var deletes = '<img class="iconDelete">';
            items.childNodes[i].innerHTML += deletes;
            deletes = '<img class="iconChange">';
            items.childNodes[i].innerHTML += deletes;
        }
    }
}
function buttonClick() {
    var message = document.getElementById('inputMessage').value;
    var user = document.getElementById('nameLogin').innerHTML;
    taskList = restoreChat();
    if (user.localeCompare("") == 0) {
        alert("input Login!!!")
        return;
    }
    if (!message)
        return;
    var newTask = theTask(user, message);
    addTodoInternal(newTask, taskList);
    document.getElementById('inputMessage').value = '';
    storeChat(taskList);
}
function addTodoInternal(task, taskList) {
    var items = document.getElementsByClassName('items')[0];
    if (numberChangeString != -1) {
        items.childNodes[numberChangeString].childNodes[1].innerHTML = task.message;
        taskList[numberChangeString].message = task.message;
        numberChangeString = -1;
    }
    else {
        addTodo(task);
        taskList.push(task);
        var block = document.getElementsByClassName("chat");
        block[0].scrollTop = block[0].scrollHeight;
    }
}
function addTodo(task) {
    var item = createItem(task);
    var items = document.getElementsByClassName('items')[0];
    items.appendChild(item);
}
function createItem(task) {
    var temp = document.createElement('div');
    var htmlAsText = '<div class="item border1" data-task-id="индефикатор">' +
        '<p>Логин</p><p>Сообщение</p><img class="iconDelete">' +
        '<img class="iconChange"></div>';
    temp.innerHTML = htmlAsText;
    updateItem(temp.firstChild, task);
    return temp.firstChild;
}
function updateItem(divItem, task) {
    divItem.setAttribute('data-task-id', task.id);
    divItem.childNodes[0].textContent = task.login;
    divItem.childNodes[1].textContent = task.message;
    if (document.getElementById('nameLogin').innerHTML !== task.login) {
        divItem.removeChild(divItem.childNodes[3]);
        divItem.removeChild(divItem.childNodes[2]);
    }
    else {
        divItem.childNodes[0].classList.add('fat');
        divItem.classList.remove('border1');
        divItem.classList.add('border2');
    }
}
function deleteClick(item) {
    taskList = restoreChat();
    var items = document.getElementsByClassName('items')[0];
    var id = item.attributes['data-task-id'].value;
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            break;
        }
    }
    items.removeChild(items.childNodes[i]);
    taskList.splice(i, 1);
    storeChat(taskList);
}
function changeClick(item) {
    var b = item.childNodes[1].textContent;
    document.getElementById('inputMessage').value = b;
    deleteMessage(item);
}
function deleteMessage(item) {
    taskList = restoreChat();
    var items = document.getElementsByClassName('items')[0];
    var id = item.attributes['data-task-id'].value;
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            numberChangeString = i;
            break;
        }
    }
    items.childNodes[numberChangeString].childNodes[1].textContent = '';
    document.getElementById('inputMessage').focus();
}
function isEnter() {
    if (event.keyCode == 13) {
        pickLogin();
    }
}
function isShiftEnter() {
        if (event.keyCode == 13 && event.shiftKey==false) {
            buttonClick();
            event.preventDefault();
        }
}