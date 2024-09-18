let operator = null;
let num1 = null;
let num2 = null;
let display_value = null;

const display = document.querySelector(`#display`);
const num_btns = document.querySelectorAll(`.number`);
const clear = document.querySelector(`#c`);
const op_btns = document.querySelectorAll(`.operator`);
const equals = document.querySelector(`#equals`);

display.textContent = 0;

function evaluate (num1,num2,operator) {
    console.log(num1, operator, num2);
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

function get_op_id(op_btn) {
    let op_id = op_btn.getAttribute("id");
    //gets id for operators displayed using alt code
    if (op_id !== null) {
        operator = op_id;
    }
    else {
        operator = op_btn.textContent;
    }
    return operator;
}

num_btns.forEach((num_btn) => {
    // adds a 'click' listener for each number button and displays it
    num_btn.addEventListener("click", () => {
        if (display_value === null) {
            display_value = num_btn.textContent;
        }
        else {
            if (display_value === null && num_btn.textContent === `.`) {
                display_value = '0' + num_btn.textContent;
            }
            else {
                display_value = display_value + num_btn.textContent;
            }
        }
        display.textContent = display_value;
    });
  });

clear.addEventListener("click", () => {
    num1 = null;
    num2 = null;
    operator = null;
    display_value = null;
    display.textContent = 0;
});

op_btns.forEach((op_btn) => {
    // adds a 'click' listener for each operator button, passes the display value to num1 and resets it
    op_btn.addEventListener("click", () => {
        //when you press an operator, if num1 is null, add display to num1 and clear display_value.
        if (num1 === null) { 
            num1 = Number(display_value);
            display_value = null;
        }
        //if operator is null, add op id to operater
        if (operator === null){
            operator = get_op_id(op_btn);
            display_value = null;
        }
        //if operator is not null, run calculation using display_value as num2.
        if (display_value !== null){
            num2 = Number(display_value);
            //run with previously entered operator then update operator to new button that was pressed
            display_value = evaluate(num1, num2, operator);
            get_op_id(op_btn);
            display.textContent = display_value;
            num2 = null;
            num1 = display_value;
        }
        display_value = null;
    });
});

//runs evaluate function and clears temporary display value
equals.addEventListener("click", () => {
    if (operator !== null){
        num2 = Number(display_value);
        display_value = evaluate(num1, num2, operator);
        display.textContent = display_value;
        num1 = Number(display_value);
        num2 = null;
        display_value = null;
        operator = null;
    }
});