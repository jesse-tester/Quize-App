//import apiKey from "./config";
require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiUrl = 'https://quizapi.io/api/v1/questions?difficulty=easy&tags=JavaScript';


let score = -1;
let questionNo = 0;
let timer = 100;


const requestOperations = {
    method : 'GET',
    headers : {
        'X-Api-Key' : apiKey,
    },
};

fetch(apiUrl,requestOperations)
.then(response => {
    if(!response.ok){
        throw new Error('Network Respoce was not okay!');
    }
    return response.json();
})
.then(data => {

    setOptions(data[0].answers);
})
.catch(error => {
    console.log('Error:',error);
});

//Score Counter 
function setScore(){
    score++;
    addFavicon("target",'quize-score',`${score}/10`);
}

//Timer Function for set and restting the Game timmer 
function coutnDownTimer() {
    timer--;
    addFavicon("timer",'quize-timer',timer);
}

function mainGameLoop(){
    setScore();
    setInterval(coutnDownTimer,1000);
}

//Outputing Score and Timer
function addFavicon(text,id,value){
    const div = document.getElementById(id)
    div.innerHTML='';
    const span = document.createElement('span');
    span.className = 'material-symbols-outlined';
    span.textContent = text;
    div.appendChild(span);
    const valueSpan = document.createElement('span');
    valueSpan.textContent = ` ${value}`;
    div.appendChild(valueSpan);
}

//Outputing The li tagas
function setOptions(options){
    const ul = document.getElementById('quize-answers');
    ul.innerHTML = '';

    for(const [keys , value] of Object.entries(options)){
        if(value){
            const li = document.createElement('li');
            li.textContent = value ;
            li.addEventListener("click", (e) => {
                console.log('in event loop');
                if (e.target.tagName === 'LI') {
                    // Clear previous selection
                    const selected = document.getElementById('selected-option');
                    if (selected) {
                        selected.removeAttribute('id');
                    }
            
                    // Set the clicked answer as selected
                    e.target.id = 'selected-option';
                    console.log(`Selected answer: ${e.target.textContent}`);
                }
            });            
            ul.appendChild(li);
        }
    }
}

