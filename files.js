//Calc variables
let first = '';
let second = '';
let operator = '';
let aOrB = false;
let decimal = false;
let result;
let mrc = 0;


// DOM elements
const display = document.querySelector('.dis-num');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.op');
const special = document.querySelectorAll('.oped');
const equalButton = document.querySelector('#equal');
const clear = document.querySelector("button[data-key='clear']");

//Event listener for equal button 
equalButton.addEventListener('click', () => {
    let cur = current();
    disNum(cur);
    reset();
    if (!first && !second && result) {
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
        if (!second && !operator && result) {
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
        if (first && second) {
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
    if (!e && second) {
        result = operate(first, second, operator);
        current = result;
    }
    else if (!aOrB) {
        if (e.target.getAttribute('data-key') === 'neg') {
            first = parseFloat(first) * -1 + '';
        }
        if (e.target.getAttribute('data-key') === 'per') {
            if (onlyOnce('%', first))
                first = first.padEnd(first.length + 1, "%");
        }
        const keyed = e.target.getAttribute('data-key');
        if (onlyOnce(keyed, first)) {
            first += keyed;
            first = first.replace("neg", '');
            first = first.replace("per", '');
        }
        current = first;
    } else {
        if (e.target.getAttribute('data-key') === 'neg') {
            second = parseFloat(second) * -1 + '';
        }
        if (e.target.getAttribute('data-key') === 'per') {
            if (onlyOnce('%', second))
                second = second.padEnd(second.length + 1, "%");
        }
        const keyed = e.target.getAttribute('data-key');
        if (onlyOnce(keyed, second)) {
            second += keyed;
            second = second.replace("neg", '');
            second = second.replace("per", '');
        }
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

function onlyOnce(input, num) {
    const pattern = /[^0-9]/;
    if (!pattern.test(num)) { //tests if the number not a special character 
        return true;
    } else {
        if (num.includes(input) && pattern.test(input)) {
            return false; //doesn't return anything if special character is already present
        }
        return true;
    }
}

const add = (a, b) => {
    return a + b;
}
const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    let result = Math.round(Math.pow(10, 7) * a * b) / Math.pow(10, 7);
    return result;
}
const divide = (a, b) => {
    if (b === 0) {
        return new Error("Division by 0");
    }
    let result = Math.round(Math.pow(10, 7) * a / b) / Math.pow(10, 7);
    return result;
}

const power = (a, b) => {
    return Math.pow(a, b);
}


const operate = (a, b, o) => {
    if (!/\d/.test(a) || !/\d/.test(b)) {
        return new Error('Invalid input')
    }
    a += '';
    b += '';

    if (a.includes('%') || b.includes('%')) {
        if (a.includes('%') && b.includes('%')) {
            a = (parseFloat(a) / 100);
            b = (parseFloat(b) / 100) * a;
        } else if (a.includes('%')) {
            a = (parseFloat(a) / 100) * parseFloat(b);
            b = parseFloat(b);
        } else {
            a = parseFloat(a);
            b = (parseFloat(b) / 100) * a;
        }
    }

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
        case 'p':
            return power(first, second);
        default:
            throw new Error('Invalid operator');
    }
}





