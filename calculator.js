const calc = {
    numpad: document.querySelectorAll(".numpad"),
    clearButton: document.querySelector("#c-button"),
    backButton: document.querySelector("#back-button"),
    display: document.querySelector(".result-screen"),

    displayText: () => document.querySelector(".result-screen").innerHTML,
    updateDisplay: (numString) => calc.display.innerHTML = numString,
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
calc.numpad.forEach(button =>  {
    button.addEventListener("click", e => {
        let number = button.innerHTML;
        console.log(number);
        calc.addNumber(number)
    })}
)

/* Clear keyboard on C press. */
calc.clearButton.addEventListener("click", () => {
    calc.resetDisplay();
})

/* Remove number from display on <- press. */
calc.backButton.addEventListener("click", () => {
    calc.removeNumber()
})