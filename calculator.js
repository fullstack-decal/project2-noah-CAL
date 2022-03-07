//Check out calculator_hints.js for hints if you're stuck
const calc = {
    numpad: document.querySelectorAll(".numpad"),
    display: document.querySelector(".result-screen"),
    resetToZero: function() {
        this.display.innerHTML = "0";
    },
    updateDisplay: function(numString) {
        if (this.display.innerHTML === "0") {
            this.display.innerHTML = numString;
        } else {
            this.display.innerHTML += numString;
        }
    }
}

/* Add click event listeners for each button. */
calc.numpad.forEach(button =>  {
    button.addEventListener("click", e => {
        let number = button.innerHTML;
        console.log(number);
        calc.updateDisplay(number)
    })}
)
