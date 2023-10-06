
function output(query){
    var result = eval(query)
    console.log(eval(query))
    var outputElement = document.querySelector('#result');
    outputElement.value = result
}

function updateQuery(value){
    var inputElement = document.querySelector('#query');
    switch(value){
        case 'clear':
            inputElement.value = ''
            break
        case 'del':
            inputElement.value = inputElement.value.toString().slice(0, -1)
            break
        default:
            inputElement.value = inputElement.value + value
    }
    console.log(inputElement.value)
}