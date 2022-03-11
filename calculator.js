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
        calcHistory: [],
        pushToHistory: (num, operator) => {
            console.log(`Pushing ${num} ${operator} to history`)
            if ('+-x÷'.indexOf(operator) === -1) {
                throw Error(`Cannot push operator ${operator} to history`)
            }
            calc.calculate.calcHistory.push([num, operator]);
        },
        calcTotal: () => {
            let result = 0;
            const history = calcHistory;
            history.forEach((num, operator) => {
                console.log(num, operator);
            })
        },
        resetHistory: () => {
            calc.calculate.calcHistory = [];
        },
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

document.querySelectorAll(".buttons").forEach(button => {
    button.addEventListener("click", e => {
        let clickedBtn = e.target;
        let value = clickedBtn.innerHTML;
        if (clickedBtn.classList.contains("numpad")) {
            calc.display.addNumber(value);
        } else {
            switch (value) {
                case "C":
                    calc.display.resetDisplay();
                    calc.calculate.resetHistory();
                    break;
                case "←":
                    calc.display.removeNumber();
                    break;
                case "=":
                    // FIXME
                default:
                    let currNumber = calc.display.getDisplayText();
                    let operand = value;
                    calc.calculate.pushToHistory(currNumber, operand);
                    calc.display.resetDisplay();
            }
        }
    })
})