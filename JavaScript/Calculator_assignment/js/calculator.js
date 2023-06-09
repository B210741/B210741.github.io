//calculator.js

//Creates an object to keep track of values
const Calculator = {
    Display_Value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};

//This modifies values each time a button is clicked
function Input_Digit(digit) {
    const {Display_Value, Wait_Second_Operand} = Calculator;
    //Checks if the Wait_Second_Operand variable is true and sets Display_Value to the key that was clicked on
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        //This overwrites Display_Value if the current value is 0. Otherwise it concatenates the value
        Calculator.Display_Value = Display_Value === 'O' ? digit: Display_Value + digit;
    }
}

//This section handles decimal points
function Input_Decimal(dot) {
    if (Calculator.Wait_Second_Operand === 'true') return;
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}

//This function handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator;
    const Value_of_Input = parseFloat(Display_Value);
    //Check if an operator exists and if Wait_Second_Operand is true then updates the operator and exists the function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {
        const Value_Now = First_Operand || 0;
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);
        result = Number(result).toFixed(9);
        //This will remove any trailing 0s
        result = (result * 1).toString();
        Calculator.Display_Value = result;
        Calculator.First_Operand = result;
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

//Handles the actual calculations
const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand,
};

//Resets the calculator when the AC button is clicked
function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

//This function updates the calculator screen with the contents of Display
function update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

update_Display();

//This section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        update_Display();
        return;
    }
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        update_Display();
        return;
    }
    Input_Digit(target.value);
    update_Display();
})