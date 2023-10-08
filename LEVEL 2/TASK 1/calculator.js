var isNew = true;
var equalClicked = false;
var inputElement = document.querySelector('#query');
var outputElement = document.querySelector('#current_result');
var deleteButton = document.getElementById('del');

function output(query, operator){
    var lastElement = inputElement.value.slice(inputElement.length-1, 1)
    switch(operator){
        case '1/x':
            outputElement.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + 1/query
            else
                inputElement.value = 1/query
            isNew = false;
            equalClicked = false;
            disableDeleteStatus();
            break;
        case 'x^2':
            outputElement.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + query * query
            else
                inputElement.value = query * query
            isNew = false;
            equalClicked = false;
            disableDeleteStatus();
            break;
        case 'sqrt(x)':
            outputElement.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + Math.sqrt(query)
            else
                inputElement.value = Math.sqrt(query)
            isNew = false;
            equalClicked = false;
            disableDeleteStatus();
            break;
        default:
            query = query + outputElement.value
            inputElement.value = query
            query = preProcessExpression(query)
            outputElement.value = eval(query);
            equalClicked = true;
            disableDeleteStatus();
            isNew=true;
    } 
}

function preProcessExpression(query){
    query = query.replace(/--/g, '+');

    query = query.replace(/\+-/g, '-').replace(/-\+/g, '-');

    return query;
}

function isLastCharacterNotANumber(inputString) {
    // Use a regular expression to match the last character
    return !/\d/.test(inputString);
}


function clearQuery(value){
    switch(value){
        case 'CE':
            outputElement.value = ''
            break;
        case 'C':
            inputElement.value = ''
            outputElement.value = ''
            isNew = true
            break
        case 'DEL':
            outputElement.value = outputElement.value.slice(0, -1)
            break
    }
}

function addOperator(operator){
    if (isNew){
        inputElement.value = outputElement.value + operator
        isNew = false;
    }else{
        inputElement.value = inputElement.value + outputElement.value + operator
    }
    outputElement.value = ''
}

function addOperands(value){
    if (isNew){
        inputElement.value = ''
    }
    outputElement.value = outputElement.value + value;
    equalClicked = false;
    disableDeleteStatus();
}

function changeSign(){
    number = parseInt(outputElement.value)
    if (number>0){
        outputElement.value = '-' + outputElement.value;
    }else{
        outputElement.value = outputElement.value.slice(1)
    }
}

function disableDeleteStatus(){
    if (equalClicked){
        deleteButton.disabled = true;
    }else{
        deleteButton.disabled = false;
    }
}