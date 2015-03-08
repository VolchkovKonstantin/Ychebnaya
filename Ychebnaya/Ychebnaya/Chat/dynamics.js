function getText() {
    document.getElementById('nameLogin').innerHTML = document.forms['login'].elements['username'].value;
}
var number = -1;
function run() {
var Container = document.getElementsByClassName('shell')[0];
    Container.addEventListener('click', delegateEvent);
}
function delegateEvent(event) {
if(event.type == 'click' && event.target.classList.contains('button')) {
        buttonClick(event);
    }
    if(event.type == 'click' && event.target.classList.contains('item')) {
        textClick(event.target);
    }
}
function buttonClick() {
    var radioNew = document.getElementById('clickNew');
    var radioChange = document.getElementById('clickChange');
    var message = document.getElementById('newMessage');
    var user = document.getElementById('nameLogin');
    user.value = document.getElementById('nameLogin').innerHTML;
    if (radioNew.checked && number == -1) {
            if (user.value.localeCompare("") == 0) {
                alert("Заполни логин!!!")
                return;
            }
        if (!message.value)
            return;
        var item = createDiv(message.value, user.value);
        var items = document.getElementsByClassName('items')[0];
            items.appendChild(item);
        message.value = '';
        }
    if (radioChange.checked) {
            if (!message.value) {
                return;
            }
            var items = document.getElementsByClassName('items')[0];
            items.childNodes[number].appendChild(document.createTextNode(message.value));
        number = -1;
        message.value = '';
        }
}
function textClick(item) {
    var radioDelete = document.getElementById('clickDelete');
    if (radioDelete.checked && number == -1) {
        deletediv(item);
        number = -1;
    }
    delete radioDelete;
    var radioChange = document.getElementById('clickChange');
    if (radioChange.checked) {
        var b = item.childNodes[2].textContent;
        document.forms['text'].elements['msg'].value = b;
        deletemessage(item);
    }
    delete radioChange;
}
function deletediv(item) {
    var items = document.getElementsByClassName('items')[0];
    var i=0;
    for(i = 0; i < items.childNodes.length; i++)
        if(items.childNodes[i] === item) {
            break;
        }
    items.removeChild(items.childNodes[i]);
}
function deletemessage(item) {
    var items = document.getElementsByClassName('items')[0];
    var element, i = 0;
    for(i = 0; i < items.childNodes.length; i++)
        if(items.childNodes[i] === item) {
            element = i;
            number = i;
            break;
        }
    items.childNodes[element].removeChild(items.childNodes[element].childNodes[2]);
}
function createDiv(text, user)
{
    var message = document.createTextNode(text);
    var newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.appendChild(document.createTextNode(user+':'));
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(message);
    return newDiv;
}