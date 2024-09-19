let operator = null;
let num1 = null;
let num2 = null;
let display_value = null;

const display = document.querySelector(`#display`);
const num_btns = document.querySelectorAll(`.number`);
const clear = document.querySelector(`#c`);
const op_btns = document.querySelectorAll(`.operator`);
const equals = document.querySelector(`#equals`);
const btns = document.querySelectorAll("button");

function show(value) {
    value = String(value);
    if (value.length > 16) {
        display.textContent = value.slice(0,16);
    }
    else {
        display.textContent = value;
    }
}

show(0);

function evaluate (num1,num2,operator) {
    if (num2 == 0 && operator == "/") {
        display_value = null;
        operator = null;
        num2 = null;
        num1 = null;
        return "Nope, try again";
    }
    else {
        switch (operator) {
            case "+":
                return num1 + num2;
                break;
            case "-":
                return num1 - num2;
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return num1 / num2; 
        }
    }
}

num_btns.forEach((num_btn) => {
    // adds a 'click' listener for each number button and displays it
    num_btn.addEventListener("click", () => {
        let number = num_btn.textContent;
            if (number === `.`) {
                if (display_value === null) {
                    display_value = '0' + number;
                }
                else if (display_value.includes(`.`) === false) {
                    display_value = display_value + number;
                }   
            }
            else if (display_value === null) {
                display_value = number;
            }
            else {
            display_value = display_value + number;
            }
        show(display_value);
    });
  });

btns.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
        btn.classList.toggle("pressed");
    });
    btn.addEventListener("mouseup", () => {
        btn.classList.toggle("pressed");
    });
    btn.addEventListener("mouseleave", () => {
        btn.classList.remove("pressed");
    })
});

clear.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    operator = null;
    display_value = null;
    show(0);
});

op_btns.forEach((op_btn) => {
    // adds a 'click' listener for each operator button, passes the display value to num1 and resets it
    op_btn.addEventListener("click", () => {
        //when you press an operator, if num1 is null, add display to num1 and clear display_value.
        if (num1 === null) { 
            num1 = Number(display_value);
            display_value = null;
        }
        //update operater
        operator = op_btn.getAttribute("id");
        //if operator is not null, run calculation using display_value as num2.
        if (display_value !== null && isNaN(num1) === false){
            num2 = Number(display_value);
            //run with previously entered operator then update operator to new button that was pressed
            display_value = evaluate(num1, num2, operator);
            operator = op_btn.getAttribute("id");
            show(display_value);
            num2 = null;
            if (isNaN(display_value) === true) {
                display_value = null;
            }
            else {
                num1 = display_value;
            }
        }
        display_value = null;
    });
});

//runs evaluate function and clears temporary display value
equals.addEventListener("click", () => {
    if (operator !== null && isNaN(num1) === false && isNaN(num2) === false && display_value !== null){
        num2 = Number(display_value);
        display_value = evaluate(num1, num2, operator);
        show(display_value);
        num1 = Number(display_value);
        num2 = null;
        display_value = null;
        operator = null;
    }
});