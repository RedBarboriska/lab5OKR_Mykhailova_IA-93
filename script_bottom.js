//==============================1==============================

let block = document.getElementById("yellow");
//let text = document.getElementById("controls_text").textContent;
let currentX = 0;
let currentY = 0;
let storageNum = 0;
let stop = true;
let reload = false;
let dx = randomInteger(1, 6);
let dy = randomInteger(1, 6);
localStorage.clear();
let num = 1;
let yellow_out = false

function toStorage(message) {

    localStorage.setItem(storageNum, (new Date()).toLocaleTimeString() + " - " + message);
    storageNum++;
}

function play_work() {
    localStorage.clear();
    console.log("play")
    show("work");

    document.getElementById("controls_text").textContent = 'Показано елемент work';
    toStorage('Показано елемент work');

}

function hide(elem) {
    document.getElementById(elem).style.top = "-9999px";
    document.getElementById(elem).style.left = "-9999px";

}

function show(elem) {
    document.getElementById(elem).style.top = 0;
    document.getElementById(elem).style.left = 0;
}



function start_anim() {
    document.getElementById("controls_text").textContent = "Натиснуто start";
    toStorage('Натиснуто start');
    //dx = randomInteger(1, 6);
    //dy = randomInteger(1, 6); щоб щоразу при старт мінявся кут
    stop = false;
    move(block, 10);
    hide("btn_start");
    show("btn_stop");
}

function stop_anim() {
    document.getElementById("controls_text").textContent = "Натиснуто stop";
    toStorage('Натиснуто stop');
    stop = true;
    hide("btn_stop");
    show("btn_start");
}

function reload_anim() {
    document.getElementById("controls_text").textContent = "Натиснуто reload";
    toStorage('Натиснуто reload');
    block.style.top = 0;
    block.style.left = 0;
    dx = randomInteger(1, 6);
    dy = randomInteger(1, 6);
    stop = true;
    hide("btn_reload");
    show("btn_start");
    yellow_out = false
}

function randomInteger(min, max) {
    // випадкове число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function close_work() {

    hide("work");
    document.getElementById("controls_text").textContent = 'Заховано елемент work';
    toStorage('Заховано елемент work');


    let key_array = []
    let myMap = new Map();

    for (let i = 0, len = localStorage.length; i < len; i++) {
        let key = localStorage.key(i);
        let value = localStorage[key];
        myMap.set(key * 1, value);
        key_array.push(key * 1);
    }
    key_array.sort((a, b) => a - b);
    console.log(myMap)
    console.log(key_array)
    document.getElementById("events_text").innerHTML += "==============================" + num++ + "==============================<br>";
    key_array.forEach(element => {
        document.getElementById("events_text").innerHTML += myMap.get(element) + "<br>"
    });



}



function move(element, delay) {
    //console.log($(document.getElementById('anim')).offset());
    //console.log($(element).width());

    let x = parseInt(element.style.left, 10);
    let y = parseInt(element.style.top, 10);

    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    let r = parseInt($(element).width()) / 2;
    if (stop) {
        return
    }
    /* if (x + r + dx > $(document.getElementById('anim')).width() || x + r + dx < 0) {
         dx = -dx;
     }*/

    /*if (x + r + dx < 0) {
        dx = -dx;
    }
    if (y + r + dy > $(document.getElementById('anim')).height() || y + r + dy < 0) {
        dy = -dy;
    }*/
    if (x + r + dx < $(document.getElementById('anim')).width()) {
        if (x + r + dx < 0) {
            dx = -dx;
            document.getElementById("controls_text").textContent = "Круг торкнувся стінки";
            toStorage("Круг торкнувся стінки");
        }
        if (y + r + dy > $(document.getElementById('anim')).height() || y + r + dy < 0) {
            dy = -dy;
            document.getElementById("controls_text").textContent = "Круг торкнувся стінки";
            toStorage("Круг торкнувся стінки");
        }
    } else if (!yellow_out) {

        hide("btn_stop");
        show("btn_reload");
        document.getElementById("controls_text").textContent = 'Круг покинув anim';
        toStorage('Круг покинув anim');
        yellow_out = true;
    }
    element.style.left = x + dx + "px";
    element.style.top = y + dy + "px";
    setTimeout(function() {
        move(element, delay);
    }, delay)
}





/*
function move(element, dx, dy, delay) {
    let x = parseInt(element.style.left, 10);
    let y = parseInt(element.style.top, 10);
    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y;
    element.style.left = x + dx + "px";
    element.style.top = y + dy + "px";
    setTimeout(function() {
        move(element, dx, dy, delay);
    }, delay)
}
 */