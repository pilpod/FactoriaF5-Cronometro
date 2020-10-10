const body = document.body;
const snail = document.getElementById('snail');
const timesList = document.getElementById('timesList');

const milisecondsSpan = document.getElementById('miliseconds');
const secondsSpan = document.getElementById('seconds');
const minutsSpan = document.getElementById('minuts');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const difficultyEasy = document.getElementById('difficultyEasy');
const difficultyNormal = document.getElementById('difficultyNormal');
const difficultyImpossible = document.getElementById('difficultyImpossible');

let miliseconds = 0;
let seconds = 0;
let minuts = 0;

let velocity;
let movement;
let chronometer;

function SnailMovement() {
    let position = Math.floor(Math.random(0, 1) * body.scrollWidth);
    position = position.toString() + 'px';
    snail.style.left = position;
}

function Timer() {
    PrintMiliseconds();
    PrintSeconds();
    PrintMinuts();
}

function PrintMiliseconds() {
    miliseconds++;
    milisecondsSpan.innerHTML = miliseconds;
}

function PrintSeconds() {
    if(miliseconds === 99) {
        miliseconds = 0;
        seconds++;
        if(seconds < 10) {
            secondsSpan.innerHTML = '0' + seconds + ' : ';
        } else {
            secondsSpan.innerHTML = seconds + ' : ';
        }
    }
}

function PrintMinuts() {
    if(seconds === 59) {
        seconds = 0;
        minuts++;
        if(minuts < 10) {
            minutsSpan.innerHTML = '0' + minuts + ' : ';
        } else {
            minutsSpan.innerHTML = minuts + ' : ';
        }
    }
}

function StartGame() {
    if(velocity != undefined){
        movement = setInterval(SnailMovement, velocity);
        chronometer = setInterval(Timer, 1);
    }
}

function StopGame(){
    clearInterval(movement);
    clearInterval(chronometer);
}

function ResetGame(){
    milisecondsSpan.innerHTML = '00';
    secondsSpan.innerHTML = '00 :';
    minutsSpan.innerHTML = '00 :';
    
    miliseconds = 0;
    seconds = 0;
    minuts = 0;

    snail.style.left = '0px';
}

function SnailCatched(){
    StopGame();
    AddTimeInTimeList();
}

function AddTimeInTimeList(){
    let liTag = document.createElement('li');
    
    if(minuts < 10){
        if(seconds < 10){
            liTag.innerHTML = '0' + minuts + ':' + '0' + seconds + ':' + miliseconds;
        } else {
           liTag.innerHTML = '0' + minuts + ':' + seconds + ':' + miliseconds;
        }
    } else {
        liTag.innerHTML = minuts + ':' + seconds + ':' + miliseconds;
    }

    timesList.appendChild(liTag);
}

function SetDifficulty(level){
    ChangeButtonColor(level);

    velocity = 1000 / level;
    return velocity;
}

function ChangeButtonColor(level){
    if(level == 1){
        difficultyEasy.style.backgroundColor = 'green';
        difficultyNormal.style.backgroundColor = '';
        difficultyImpossible.style.backgroundColor = '';
    } else if(level == 2){
        difficultyNormal.style.backgroundColor = 'green';
        difficultyEasy.style.backgroundColor = '';
        difficultyImpossible.style.backgroundColor = '';
    } else {
        difficultyImpossible.style.backgroundColor = 'red';
        difficultyEasy.style.backgroundColor = '';
        difficultyNormal.style.backgroundColor = '';
    }
}

snail.addEventListener('click', SnailCatched);
startButton.addEventListener('click', StartGame);
stopButton.addEventListener('click', StopGame);
resetButton.addEventListener('click', ResetGame);



