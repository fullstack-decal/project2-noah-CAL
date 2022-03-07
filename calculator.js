const calc = {
    buttons: {
        numpad: document.querySelectorAll(".numpad"),
        clearButton: document.querySelector("#c-button"),
        backButton: document.querySelector("#back-button"),
        calcButtons: document.querySelectorAll(".last-buttons"),
        display: document.querySelector(".result-screen"),
    },
    calculate: {
        currNumber: 0,
        add: (num) => {
            calc.calculate.currNumber += num
        },
        subtract: (num) => {
            calc.calculate.currNumber = Math.min(0, calc.calculate.currNumber - num)
        },
        multiply: (num) => {
            calc.calculate.currNumber *= num
        },
        divide: (num) => {
            if (num === 0) {
                calc.calculate.currNumber = Number.POSITIVE_INFINITY
            } else {
                calc.calculate.currNumber = Math.floor(this.currNumber / num)
            }
        },
        resetNumber: () => this.currNumber = 0,
    },
    display: {
        getDisplayText: () => document.querySelector(".result-screen").innerHTML,
        updateDisplay: (numString) => calc.buttons.display.innerHTML = numString,
        getNumber: () => parseInt(calc.display.getDisplayText()),
        resetDisplay: () => calc.display.updateDisplay(0),
        addNumber: function(numString) {
            const displayText = this.getDisplayText();
            if (displayText === "0") {
                this.updateDisplay(numString);
            } else {
                this.updateDisplay(displayText + numString);
            }
        },
        removeNumber: function() {
            const displayText = this.getDisplayText();
            if (displayText !== "0") {
                if (displayText.length <= 1) {
                    this.resetDisplay();
                } else {
                    this.updateDisplay(displayText.slice(0, displayText.length - 1))
                }
            }
        }
    },
}

/* Add click event listeners for each button. */
calc.buttons.numpad.forEach(button =>  {
    let number = button.innerHTML;
    button.addEventListener("click", e => {
        calc.display.addNumber(number)
    })}
)

/* Clear keyboard on C press. */
calc.buttons.clearButton.addEventListener("click", () => {
    calc.display.resetDisplay();
    calc.calculate.resetNumber();
})

/* Remove number from display on <- press. */
calc.buttons.backButton.addEventListener("click", () => {
    calc.display.removeNumber()
})

/* TODO - REMOVE ME */
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        console.log(calc.calculate.currNumber)
    })
})

calc.buttons.calcButtons.forEach(button => {
    button.addEventListener("click", () => {
        const currNum = calc.display.getNumber()
        switch (button.innerHTML) {
            case '+':
                calc.calculate.add(currNum)
                break
            case '-':
                calc.calculate.subtract(currNum)
                console.log('h')
                break
            case 'x':
                calc.calculate.multiply(currNum)
                break
            case '÷':
                calc.calculate.divide(currNum)
                break
            case '=':
                //TODO FIXME
                break
        }
        if (button.innerHTML === '=') {
            calc.display.updateDisplay(calc.calculate.currNumber)
            calc.calculate.resetNumber();
        } else {
            calc.display.updateDisplay(0)
        }
    })
})