function getText() {
    document.getElementById('nameLogin').innerHTML = document.forms['login'].elements['username'].value;
}
var number = 0;
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
    if (radioNew.checked || radioChange.checked) {
        var message = document.getElementById('newMessage');
        if(number == 0) {
        var user = document.getElementById('nameLogin');
        user.value = document.getElementById('nameLogin').innerHTML;
        if (!message.value)
            return;
        var item = createDiv(message.value, user.value);
        var items = document.getElementsByClassName('items')[0];
            items.appendChild(item);
        }
        else {
            if (!message.value)
                return;
            var items = document.getElementsByClassName('items')[0];
            items.childNodes[number].appendChild(document.createTextNode(message.value));
        }
        number = 0;
        message.value = '';
    }
}
function textClick(item) {
    var radioDelete = document.getElementById('clickDelete');
    if (radioDelete.checked && number == 0) {
        deletediv(item);
    }
    delete radioDelete;
    var radioChange = document.getElementById('clickChange');
    if (radioChange.checked && number == 0) {
        var b = item.childNodes[2].textContent;
        document.forms['text'].elements['msg'].value=b;
        deletemessage(item);
    }
    delete radioChange;
}
function deletediv(item) {
    var items = document.getElementsByClassName('items')[0];
    var element, i=0;
    for(i = 0; i < items.childNodes.length; i++)
        if(items.childNodes[i] === item) {
            element = i;
            number = element;
            break;
        }
    items.removeChild(items.childNodes[element]);
}
function deletemessage(item) {
    var items = document.getElementsByClassName('items')[0];
    var element, i=0;
    for(i = 0; i < items.childNodes.length; i++)
        if(items.childNodes[i] === item) {
            element = i;
            number = element;
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