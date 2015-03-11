var number = 0;
function run() {
    var Container = document.getElementsByClassName('container')[0];
    Container.addEventListener('click', delegateEvent);
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
function PickLogin() {
    var login = document.getElementById('Login');
    document.getElementById('nameLogin').innerHTML = login.value;
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
    var item = createDiv(message.value, user.value);
    var items = document.getElementsByClassName('items')[0];
    if (number) {
        items.childNodes[number].insertBefore(document.createTextNode(message.value), items.childNodes[number].childNodes[2]);
    }
    else {
        items.appendChild(item);
    }
    number = 0;
    message.value = '';
}
function deleteClick(item) {
    var items = document.getElementsByClassName('items')[0];
    var i = 0;
    for (i = 0; i < items.childNodes.length; i++)
        if (items.childNodes[i] === item) {
            break;
        }
    if (i < number)
        number--;
    items.removeChild(items.childNodes[i]);
}
function changeClick(item) {
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
    items.childNodes[element].removeChild(items.childNodes[element].childNodes[2]);
}
function createDiv(text, user) {
    var message = document.createTextNode(text);
    var newDiv = document.createElement('div');
    newDiv.className = 'message';
    newDiv.appendChild(document.createTextNode(user + ':'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(message);
    newDiv.appendChild(document.createElement('br'));
    var btn = document.createElement('input');
    btn.className = 'btn  btn-danger btn-mini';
    btn.type = 'button';
    btn.value = "delete";
    newDiv.appendChild(btn);
    btn = document.createElement('input');
    btn.className = 'btn btn-warning btn-mini';
    btn.value = "change";
    btn.type = "button";
    newDiv.appendChild(btn);
    return newDiv;
}