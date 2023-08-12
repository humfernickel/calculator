//Calc variables
let first = '';
let second = '';
let operator = '';
let aOrB = false;
let decimal = false;
let result;


// DOM elements
const display = document.querySelector('.dis-num');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.op');
const equalButton = document.querySelector('#equal');
const clear = document.querySelector("button[data-key='clear']");

//Event listener for equal button 
equalButton.addEventListener('click', () => {
    let cur = current();
    disNum(cur);
    reset();
    if(!first && !second && result){
        first = result;
    }
});

//Event listener for clear button
clear.addEventListener('click', () => {
    clearDis();
    reset();
    result = 0;
});

//Event listener for number buttons
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if(!second && !operator && result){
            reset();
            result = 0;
        }
        let cur = current(e);
        disNum(cur);
    });
});

//Event listener for number buttons
operators.forEach(oper => {
    oper.addEventListener('click', (e) => {
        if(first && second) {
            let temp = current();
            reset();
            first = temp;
            disNum(first);
        }
        aOrB = !aOrB;
        operator = e.target.getAttribute('id');
    });
});


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
}


function current(e) {
    let current;
    if(!e && second){
        result = operate(first, second, operator);
        current = result;
    }
    else if(!aOrB) {
        first += e.target.getAttribute('data-key');
        current = first;
    } else {
        second += e.target.getAttribute('data-key');
        current = second;
    }
    return current;
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
    
if (cur instanceof Error) {
    input.classList.add('error-message'); // Apply the CSS class for error messages
}
    input.style['font-style'] = 'italic';
    display.appendChild(input);
}


const add = (a, b) => {
    return a + b;
}
const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    if(b === 0){
        return new Error("Division by 0");
    }
    return a / b;
}


const operate = (a, b, o) => {
    first = parseFloat(a);
    second = parseFloat(b);
        switch (o) {
            case 'add':
                return add(first, second);
            case 's':
                return subtract(first, second);
            case 'm':
                return multiply(first, second);
            case 'd':
                return divide(first, second);
            default:
                throw new Error('Invalid operator');
        }
    }


