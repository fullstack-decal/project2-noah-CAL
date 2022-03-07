const calc = {
    buttons: {
        numpad: document.querySelectorAll(".numpad"),
        clearButton: document.querySelector("#c-button"),
        backButton: document.querySelector("#back-button"),
        display: document.querySelector(".result-screen"),
    },
    displayText: () => document.querySelector(".result-screen").innerHTML,
    updateDisplay: (numString) => calc.buttons.display.innerHTML = numString,
    resetDisplay: () => calc.updateDisplay(0),
    addNumber: function(numString) {
        const displayText = this.displayText();
        if (displayText === "0") {
            this.updateDisplay(numString);
        } else {
            this.updateDisplay(displayText + numString);
        }
    },
    removeNumber: function() {
        const displayText = this.displayText();
        if (displayText !== "0") {
            if (displayText.length <= 1) {
                this.resetDisplay();
            } else {
                this.updateDisplay(displayText.slice(0, displayText.length - 1))
            }
        }
    }
}

/* Add click event listeners for each button. */
calc.buttons.numpad.forEach(button =>  {
    let number = button.innerHTML;
    button.addEventListener("click", e => {
        calc.addNumber(number)
    })}
)

/* Clear keyboard on C press. */
calc.buttons.clearButton.addEventListener("click", () => {
    calc.resetDisplay();
})

/* Remove number from display on <- press. */
calc.buttons.backButton.addEventListener("click", () => {
    calc.removeNumber()
})

/* Class to represent an sequence of math expressions implemented as a singly-Linked List. */
class Expression {
    constructor(value, operator, tail = null) {
        this.value = parseInt(value)
        this.operator = operator
        this.tail = tail
    }

    calculate(expr) {
        if (expr === null) {
            return 0;
        }
        if (expr.tail === null) {
            return expr.value;
        }
        const value = expr.operate(expr.value, expr.tail.value, expr.operator)
        expr.tail.value = value;
        return expr.tail.calculate()
    }

    operate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case 'x':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    throw Error(`Cannot divide ${num1} by ${num2}`);
                }
                return Math.round(num1 / num2);
        }
    }
}