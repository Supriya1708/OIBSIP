
var isNew = true;
var equalClicked = false;

function output(query, operator){
    var current_number = document.querySelector('#current_result');
    var inputElement = document.querySelector('#query');
    var lastElement = inputElement.value.slice(inputElement.length-1, 1)
    switch(operator){
        case '1/x':
            current_number.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + 1/query
            else
                inputElement.value = 1/query
            break;
        case 'x^2':
            current_number.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + query * query
            else
                inputElement.value = query * query
            break;
        case 'sqrt(x)':
            current_number.value = '';
            if (isLastCharacterNotANumber(lastElement))
                inputElement.value = inputElement.value + Math.sqrt(query)
            else
                inputElement.value = Math.sqrt(query)
            break;
        default:
            query = query + current_number.value
            inputElement.value = query
            query = preProcessExpression(query)
            current_number.value = eval(query);
            var deleteButton = document.getElementById('del');
            deleteButton.disabled = true;
            equalClicked = true;
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
    var inputElement = document.querySelector('#query');
    var current_number = document.querySelector('#current_result')
    switch(value){
        case 'CE':
            current_number.value = ''
            break;
        case 'C':
            inputElement.value = ''
            current_number.value = ''
            isNew = true
            break
        case 'DEL':
            current_number.value = current_number.value.slice(0, -1)
            break
    }
}

function addOperator(operator){
    var inputElement = document.querySelector('#query');
    var current_number = document.querySelector('#current_result');
    if (isNew){
        inputElement.value = current_number.value + operator
        isNew = false;
    }else{
        console.log(inputElement.value)
        inputElement.value = inputElement.value + current_number.value + operator
    }
    current_number.value = ''
    console.log(inputElement.value)
}

function addOperands(value){
    if (isNew){
        var inputElement = document.querySelector('#query');
        inputElement.value = ''
    }
    var current_number = document.querySelector('#current_result');
    current_number.value = current_number.value + value;
}

function changeSign(){
    var current_number = document.querySelector('#current_result');
    number = parseInt(current_number.value)
    if (number>0){
        current_number.value = '-' + current_number.value;
    }else{
        current_number.value = current_number.value.slice(1)
    }
}