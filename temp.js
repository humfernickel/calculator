//Calc variables
let first = '';
let second = '';
let operator = '';
// let aOrB = false;
let finished = false;
let result;
let temp = '';

// DOM elements
const display = document.querySelector('.dis-num');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.op');
const equalButton = document.querySelector('#equal');
const clear = document.querySelector("button[data-key='clear']");

//Event listener for clear button
clear.addEventListener('click', () => {
    clearDis();
    reset();
});

 //Event listener for number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        theString(e.target.getAttribute('data-key'));
    });
});

operators.forEach(oper => {
    oper.addEventListener('click', (e) => {
        operator = e.target.getAttribute('id');
        // finished = true;
        current();
});

});

function theString(input){
    if(!finished){
        temp += input;
        console.log(temp);
        disNum(temp);
    } else {
        temp = input; 
        disNum(temp);
        finished = false;
        // current(temp);
    }
}

function current(num){
    if(!first || !num){
        first = temp;
        nextNum(); 
    } else if (!second) {
        second = num;
    } 
    if(first && second){
        result = operate(first, second, operator);
        return result;
    }

}

function disNum(cur) {
    if (display.childNodes.length >= 1) {
        clearDis();
    }

    let input = document.createElement('span');
    if (cur.length >= 8) {
        input.textContent = cur.slice(-8);
    } else {
        input.textContent = cur;
    }
    input.style['font-style'] = 'italic';
    display.appendChild(input);
}

function clearDis() {
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

function reset() {
    first = '';
    second = '';
    operator = 0;
    aOrB = false;
    temp = '';
    // result = 0;
}

function nextNum(){
    finished = false;
    temp = '';
}



