//Check out calculator_hints.js for hints if you're stuck
const calc = {
    numpad: document.querySelectorAll(".numpad"),
}

/* Add click event listeners for each button. */
calc.numpad.forEach(button =>  {
    button.addEventListener("click", e => {
        console.log(button.innerHTML);
    })}
)