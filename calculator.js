const calc = {
    numpad: document.querySelectorAll(".numpad"),
    numDisplay: document.querySelector(".result-screen"),
    display: {
        getText: () => document.querySelector(".result-screen").innerHTML,
        getNumber: () => parseInt(calc.display.getText()),
        updateDisplay: (numString) => calc.numDisplay.innerHTML = numString,
        resetDisplay: () => calc.display.updateDisplay("0"),
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
        }
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
            console.log(history)
            let currOperator = null;
            let currNum = null;
            history.forEach(val => {
                // console.log(val)
                if (currNum === null) {
                    currNum = val;
                    console.log(currNum)
                } else if (currOperator === null) {
                    console.log(val)
                    currOperator = val;
                } else if (currOperator !== "=") {
                    currNum = eval(`currNum ${currOperator} val`);
                    console.log(`currNum ${currOperator} val`)
                    currNum, currOperator = null, null;
                }
                // if (currOperator !== '' && val !== '=') {
                //     console.log(`result ${val} val`, val)
                //     result = eval(`result ${val} val`)
                //     currOperator = '';
                // switch (val) {
                //     case "+":
                //     case "-":
                //     case "x":
                //         console.log(`result ${val} nextNum`);
                //         result = eval(`result ${val} nextNum`);
                //         console.log(eval(`result ${val} nextNum`))
                //         break;
                //     case "÷":
                //         if (val === 0) {
                //             result = Number.POSITIVE_INFINITY;
                //         } else {
                //             result //= val;
                //         }
                //         break;
                //     case "=":
                //         break;
                //     default:
                        // nextNum = val;
                // }
                // console.log(result)
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