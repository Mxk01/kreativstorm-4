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
            numberInput.value += value;
            currentNumber += value; // Update currentNumber
        } 
        else if (isNaN(value) && value!=='C' && value!=='='){
            chosenOperator = value;
            numberInput.value += chosenOperator;
            return;
        }
        else if (value === 'C') {
            numberInput.value = '';
            currentNumber = '';
            firstNumber = '';
            chosenOperator = null; // Reset chosenOperator
        } else if (value === '=') {
            
            if (chosenOperator && firstNumber && currentNumber) {
                const operationResult = operate(chosenOperator, parseFloat(firstNumber), parseFloat(currentNumber));
                numberInput.value = operationResult;
                firstNumber = operationResult.toString();
                currentNumber = '';
                chosenOperator = null; // Reset chosenOperator
            }
        } else if (value === '⌫') {
            numberInput.value = numberInput.value.slice(0, -1);
            currentNumber = currentNumber.slice(0, -1); // Update currentNumber
        } else if (value === '+' || value === '-' || value === '×' || value === '/') {
            chosenOperator = value;
            firstNumber = parseFloat(numberInput.value); // Update firstNumber
            currentNumber = '';
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
        case "×":
            return multiply(number1, number2);
        default:
            return null;
    }
}
