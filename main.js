const mathInput = document.querySelectorAll('.math-input');
const equals = document.getElementById('equals');
const clearAll = document.getElementById('clear-all');
const clearElement = document.getElementById('clear-element');
let screen = document.getElementById('screen');
let screenLastOperation = document.getElementById('last-operation');
let toPosToNeg = document.getElementById('toPositiveOrNegative');

let arrayResults = []
let arrayOperations = []




let CalculateResult = (inputText) =>  {
    let exception;
    let input = FirstSingOrEmpty(inputText);
    try {
        exception = eval(input);
        if(exception == Infinity || exception == -Infinity){
            throw 1;
        }   
    }
    catch(ex) {
        exception = 'err';
    }
    finally {
        return exception;
    }
};


function FirstSingOrEmpty(inputText) {
    if(inputText.length > 0) {
        switch(inputText[0]){
            case '+':
            case '-':
            case 'x':
            case '%':
            case '/':
                let input = inputText.split('');
                input.unshift('0');
                return input.join('');
            default: 
                return inputText;
        }
    }
    return 0;
}

function ShowResult(input) {
    let operationResult = CalculateResult(input); 
    arrayResults.push(operationResult);
    arrayOperations.push(input);
    console.log(arrayOperations);
    screen.value = operationResult;
    screenLastOperation.textContent = arrayOperations[arrayOperations.length-1];
};

mathInput.forEach(element => {
    element.addEventListener('click', ()=> {
        screen.value += element.textContent;
    })
});

equals.addEventListener('click', ()=> {
    if(!mathInput) {
        ShowResult('0');
        return;
    }

    ShowResult(screen.value);
    
})


clearAll.addEventListener('click', ()=> {
    arrayOperations = []
    arrayResults = []
    screen.value = '';
    screenLastOperation.textContent = '';
})

clearElement.addEventListener('click', ()=> {
    if(screen.value){
        let screenValue = screen.value.split('');
        screenValue.pop();
        screen.value = screenValue.join(''); 
    }
})

toPosToNeg.addEventListener('click', ()=> {
    let newResult = CalculateResult(screen.value);
    if(!isNaN(newResult)) {
      if(newResult < 0){
        screen.value = Math.abs(newResult);
      }
      else {
        screen.value = -newResult;
      }
    }
})