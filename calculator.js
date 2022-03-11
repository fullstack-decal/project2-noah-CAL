const calc = {
    display: {
        getText: () => document.querySelector(".result-screen").innerHTML,
        getNumber: () => parseInt(calc.display.getText()),
        addNumber: function(numString) {
            const displayText = this.getText();
            if (displayText === "0") {
                this.updateDisplay(numString);
            } else {
                this.updateDisplay(displayText + numString);
            }
        },
        removeNumber: function() {
            const displayText = this.getText();
            if (displayText !== "0") {
                if (displayText.length <= 1) {
                    this.resetDisplay();
                } else {
                    this.updateDisplay(displayText.slice(0, displayText.length - 1))
                }
            }
        },
        updateDisplay: (numString) => document.querySelector(".result-screen").innerHTML = numString,
        resetDisplay: () => calc.display.updateDisplay("0"),
    },
    calculate: {
        calcHistory: [],
        pushToHistory: (num, operator) => {
            calc.calculate.calcHistory.push(num, operator);
            if (operator === "=") {
                calc.calculate.calcTotal();
            }
        },
        calcTotal: () => {
            const history = calc.calculate.calcHistory;
            let currOperator = null;
            let currNum = null;
            history.forEach(val => {
                if (val === "÷") val = "/"; 
                if (val === "x") val = "*"; 
                if (currNum === null) {
                    currNum = val;
                } else if (currOperator === null) {
                    currOperator = val;
                } else if (currOperator !== "=") {
                    currNum = eval(`currNum ${currOperator} val`);
                    currNum, currOperator = null, null;
                }
            });
            calc.display.updateDisplay(currNum);
            calc.calculate.resetHistory();
        },
        resetHistory: () => calc.calculate.calcHistory = [],
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
                default:
                    let currNumber = calc.display.getNumber();
                    let operand = value;
                    calc.display.resetDisplay();
                    calc.calculate.pushToHistory(currNumber, operand);
            }
        }
    })
})