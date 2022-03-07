const calc = {
    numpad: document.querySelectorAll(".numpad"),
    clearButton: document.querySelector("#c-button"),
    backButton: document.querySelector("#back-button"),
    display: document.querySelector(".result-screen"),
    resetDisplay: function() {
        this.display.innerHTML = "0";
    },
    addNumber: function(numString) {
        if (this.display.innerHTML === "0") {
            this.display.innerHTML = numString;
        } else {
            this.display.innerHTML += numString;
        }
    },
    removeNumber: function() {
        if (this.display.innerHTML !== "0") {
            console.log('h')
            if (this.display.innerHTML.length > 1) {
                this.display.innerHTML = this.display.innerHTML.slice(0, this.display.innerHTML.length - 1)
            } else {
                this.resetDisplay();
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