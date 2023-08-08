const items = document.getElementsByClassName('calculator__item');
const numberInput = document.querySelector('.calculator__input');
console.log(items, numberInput);
let chosenOperator = null;
let currentNumber = '';
let firstNumber = '';

Array.from(items).forEach(element => {
    element.addEventListener("click", (e) => {
        let value = e.target.textContent;

        if (!isNaN(value) || value === '.') {
            // if(numberInput.value.indexOf('.')===-1) {
            // numberInput.value = numberInput.value.replace('0','');
            // }
            numberInput.value += value;
            
            currentNumber += value;
            if(!currentNumber.endsWith('.')) { 
                currentNumber = parseFloat(currentNumber);
            }
        } else if (value === 'C') {
            numberInput.value = 0;
            currentNumber = '';
            firstNumber = '';
            chosenOperator = null;
        } else if (value === '=') {
            if (chosenOperator && firstNumber && currentNumber) {
                const operationResult = operate(chosenOperator, parseFloat(firstNumber), parseFloat(currentNumber));
                numberInput.value = operationResult;
                console.log(numberInput.value)
                firstNumber = operationResult.toString();
                currentNumber = '';
                chosenOperator = null; 
            }
        } else if (value === '+' || value === '-' || value === 'x' || value === '/') {
            
            chosenOperator = value;
            console.log(chosenOperator)
            firstNumber = parseFloat(currentNumber);
            console.log(firstNumber)
            currentNumber = '';
            numberInput.value += value;
            console.log(numberInput.value)
        }
        else if (value === '+/-') { 
            currentNumber = (-parseFloat(currentNumber)).toString();
            numberInput.value = currentNumber;
        } else if (value === '%') { 
            currentNumber = (parseFloat(currentNumber) / 100).toString();
            console.log(currentNumber==true)
            
            numberInput.value = !currentNumber ? '0' : currentNumber;
        }
    });
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        numberInput.value = "Err. Division by 0";
        return null;
    }
    return a / b;
}

const operate = (operator, number1, number2) => {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "/":
            return divide(number1, number2);
        case "x":
            return multiply(number1, number2);
        default:
            return null;
    }
}
