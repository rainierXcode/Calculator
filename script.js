let expressionInput = document.getElementById("expressionInput");
let reset = false;
function viewInput(number){
    var expressionInput = document.getElementById("expressionInput");
    var currentValue = expressionInput.value;

    if (currentValue === "0" || reset) {
      expressionInput.value = number;
    } else {
      expressionInput.value = currentValue + number;
    }
}

let currentTotal = 0;
let sNum = 0;
let opCount = 0;
let temp = 0;
let isAlreadyCount = false;

function clearInput() {
    expressionInput.value = "0";
    currentTotal = 0;
    temp = 0;
    reset = false;
    sNum = 0;
    opCount = 0;
    isAlreadyCount = false;

}

function addThis() {
  opCount += 1;
  currentTotal = Number(expressionInput.value);

  if (opCount > 1) {
      temp += currentTotal;
      expressionInput.value = temp.toString();
  } else {
      temp = currentTotal;
  }
  if(opCount >= 2){
    expressionInput.value = temp.toString();
    reset =true;
    isAlreadyCount = true;
    return;
  }
  else
  {
    reset = false;
    isAlreadyCount = false;
  }

  expressionInput.value = "0";
}




function calculateThis() {
  sNum = Number(expressionInput.value);
  currentTotal = temp + sNum;
  opCount = 0;
  temp = 0;
  reset = false;
  isAlreadyCount = false;
  expressionInput.value = currentTotal.toString();
  
}

