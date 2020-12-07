//==============================1==============================

let block = document.getElementById("yellow");
//let text = document.getElementById("controls_text").textContent;
let currentX = 0;
let currentY = 0;
let stop = true;
let reload = false;
let firsttime = true
let x = 10;
let y = 10;
let storageNum = 0;
let prevX = x;
let prevY = y;

let r = 10;
let dx = randomInteger(1, 6);
let dy = randomInteger(1, 6);
let dx_bool = false;
let dy_bool = false;
localStorage.clear();
let num = 1;
let yellow_out = false

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');
width = canvas.width = $(document.getElementById('anim')).width();
height = canvas.height = $(document.getElementById('anim')).height();



function draw() {
    console.log($(document.getElementById("anim")).offset().top);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    drawBall(x, y);
}


function toStorage(message) {

    localStorage.setItem(storageNum, (new Date()).toLocaleTimeString() + " - " + message);
    storageNum++;
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    console.log(x + ":" + y)
    ctx.fill();
    ctx.closePath();
}

function loop() {

    if (stop) { return }
    ctx.clearRect(prevX - r, prevY - r, r * 2, r * 2);

    drawBall(x, y);
    console.log(dx + ":" + dy)
    if (x + dx < $(document.getElementById('anim')).width() - r) {
        if (x + dx < r) {
            dx = -dx;
            document.getElementById("controls_text").textContent = "Круг торкнувся стінки";
            toStorage("Круг торкнувся стінки");
            console.log("Круг торкнувся стінки")
        }
        if (y + dy > $(document.getElementById('anim')).height() - r || y + dy < r) {
            dy = -dy;
            document.getElementById("controls_text").textContent = "Круг торкнувся стінки";
            toStorage("Круг торкнувся стінки");
            console.log("Круг торкнувся стінки")
        }
    } else if (!yellow_out) {

        hide("btn_stop");
        show("btn_reload");
        document.getElementById("controls_text").textContent = 'Круг покинув anim';
        toStorage('Круг покинув anim');
        yellow_out = true;
    }
    prevX = x
    prevY = y
    x += dx;
    y += dy;
    setTimeout(function() {
        loop();
    }, 10)
}



function play_work() {

    document.getElementById("myCanvas").style.top = 0 + "px";
    document.getElementById("myCanvas").style.left = 0 + "px";
    localStorage.clear();
    console.log("play")
    show("work");

    draw()
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
    //dx = randomInteger(1, 6); щоразу новий кут при старті
    // dy = randomInteger(1, 6);

    stop = false;

    canvas.width = $(document.getElementById('anim')).width(); //якщо масштабуєте, то після нажаття старту канвас прийме форму анім
    canvas.height = $(document.getElementById('anim')).height();
    loop();
    hide("btn_start");
    show("btn_stop");
    document.getElementById("controls_text").textContent = "Натиснуто start";
    toStorage('Натиснуто start');

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
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    x = r;
    y = r;
    dx = randomInteger(1, 6);
    dy = randomInteger(1, 6);
    drawBall(x, y);
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

    hide("myCanvas");
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