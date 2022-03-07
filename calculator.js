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
        add: (num) => this.currNumber += num,
        subtract: (num) => this.currNumber = Math.min(0, this.currNumber - num),
        multiply: (num) => this.currNumber *= num,
        divide: (num) => {
            if (num === 0) {
                this.currNumber = Number.POSITIVE_INFINITY
            } else {
                this.currNumber = Math.floor(this.currNumber / num)
            }
        },
        resetNumber: () => this.currNumber = 0,
    },
    display: {
        displayText: () => document.querySelector(".result-screen").innerHTML,
        updateDisplay: (numString) => calc.buttons.display.innerHTML = numString,
        resetDisplay: () => calc.display.updateDisplay(0),
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
})

/* Remove number from display on <- press. */
calc.buttons.backButton.addEventListener("click", () => {
    calc.display.removeNumber()
})

calc.buttons.calcButtons.forEach(button => {
    button.addEventListener("click", () => {
    })
})