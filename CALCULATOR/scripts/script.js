
$(document).ready(() => {
    
    //handle input
    const handleInput = (x) => {
        $("#input").append(x);
    }

    //handle equal
    const handleEqual = (expression) => {

        let exp = expression;

        //replace multiply and divide symbols
        for (let i = 0; i < exp.length; i++) {

            //multiply symbol
            if (exp[i] === "×") {
                exp = exp.slice(0, i) + "*" + exp.slice(i+1);
            }

            //divide symbol
            if (exp[i] === "÷") {
                exp = exp.slice(0, i) + "/" + exp.slice(i+1);
            }

        }

        //calculate result
        let result;
        try {
            result = eval(exp);
        } catch (error) {
            result = "Invalid Expression!";
        } 

        //set result
        $("#result").text(result);
    }

    //handle back and clear
    const handleBackClear = (t) =>{
        
        //clear
        if (t === "AC") {
            $("#input").text("");
        }

        //back
        if (t === "CE") {
            const text = $("#input").text();
            $("#input").text(text.slice(0, -1));
        }

    }

    //create numbers buttons
    const numbersLength = 9;

    for (let i = numbersLength; i >= 0; i--) {

        let number = i;
        let id = "number" + i;

        //create decimal point
        if (i == 0) {
            $("#numbers").append(`<button class='numbers' id='numberDecimal'>.</button>`);
            $(`#numberDecimal`).on("click", () => {
                handleInput('.');
            })
        }

        //create button
        $("#numbers").append(`<button class='numbers' id='${id}'>${number}</button>`);

        //button function
        $(`#${id}`).on("click", () => {
            handleInput($(`#${id}`).text());
        })

    }

    //create operators buttons
    const operators = ["+", "-", "&times;", "&div;", "="];

    for (let i = 0; i < operators.length; i++) {
        $("#operators").append(`<button class='operators' id='operator${i}'>${operators[i]}</button>`)

        //add operator to input bar
        if (operators[i] !== "=") {
            $(`#operator${i}`).on("click", () => {
                handleInput($(`#operator${i}`).text());
            })

        } else {
            //equal function
            $(`#operator${i}`).on("click", () => {
                handleEqual($("#input").text());
            })
        }
    }

    //create operators buttons
    const ac_ce = ["AC", "CE"];

    for (let i = 0; i < ac_ce.length; i++) {
        $("#ac_ce").append(`<button class='ac_ce' id='ac_ce${i}'>${ac_ce[i]}</button>`)

        $(`#ac_ce${i}`).on("click", () => {
            handleBackClear(ac_ce[i]);
        })
    }

})