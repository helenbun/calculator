let operator = null;
let num1 = null;
let num2 = null;
let display_value = 0;

const display = document.querySelector(`#display`);
const num_btns = document.querySelectorAll(`.number`);
const clear = document.querySelector(`#c`);
const op_btns = document.querySelectorAll(`.operator`);
const equals = document.querySelector(`#equals`);

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

display.textContent = display_value;

num_btns.forEach((num_btn) => {
    // adds a 'click' listener for each number button and displays it
    num_btn.addEventListener("click", () => {
        if (display_value === 0 && num_btn.textContent !== `.`) {
            display_value = num_btn.textContent;
        }
        else {
            display_value = display_value + num_btn.textContent;
        }
     
        display.textContent = display_value;
    });
  });

clear.addEventListener("click", () => {
    display_value = 0;
    num1 = 0;
    display.textContent = display_value;
});

op_btns.forEach((op_btn) => {
    // adds a 'click' listener for each operator button, passes the display value to num1 and resets it
    op_btn.addEventListener("click", () => {
        if (operator === null){
            get_op_id(op_btn);
        }
        if (num1 === null) { 
            num1 = Number(display_value);
        }
        else {
            num2 = Number(display_value);
            //run with previously entered operator then update operator to new button that was pressed
            display_value = evaluate(num1, num2, operator);
            get_op_id(op_btn);
            display.textContent = display_value;
            num2 = null;
            num1 = display_value;
        }
        display_value = 0;
    });
});

//runs evaluate function and clears temporary display value
equals.addEventListener("click", () => {
    num2 = Number(display_value);
    display_value = evaluate(num1, num2, operator);
    display.textContent = display_value;
    num1 = Number(display_value);
    display_value = 0;
    operator = null;
});

/*Make the calculator work! You’ll need to store the first number and  second number that are input into the calculator, 
utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
You should already have the code that can populate the display, so once operate() has been called, update the display with the 
‘solution’ to the operation.
This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with 
them. Don’t feel bad if it takes you a while to figure out the logic.*/

/* dispay_value is temporary. Once an operator is pressed, it should be reset, num1 should be updated to be the value and it should be cleared.*/