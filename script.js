let expressionInput = document.getElementById("expressionInput");
const opBtns = document.querySelectorAll('.op');
let reset = false;
let temp = 0;
let isNumNegative = false;
let tempRmv = null
let isInNegative = true;
let currentTotal = 0;
let sNum = 0;
let fNum = 0;
let opCount = 0;
let operatorUse = null;
let newToCalulate = true;

function viewInput(number) {
  if (expressionInput.value.endsWith('-') && isInNegative) {
    tempRmv = expressionInput.value.slice(0, -1);
    tempRmv += number;
    expressionInput.value = tempRmv + '-';
    return;

  }
  if (reset) {
    expressionInput.value = number;
    reset = false;
  } else {
    if (expressionInput.value === '0' && number !== '.') {
      expressionInput.value = "";
    }

    if (number === '.' && expressionInput.value === "") {
      expressionInput.value = "0.";
    } else if (number === '.') {
      expressionInput.value += '.';
    } else {
      expressionInput.value += number;
    }
  }
}



function clearInput() {
  expressionInput.value = "0";
  currentTotal = 0;
  temp = 0;
  reset = false;
  sNum = 0;
  opCount = 0;
  operatorUse = null;
  isNumNegative = false;
  isInNegative = true;
  expressionInput.style.fontFamily = "Roboto, 'Helvetica Neue', sans-serif";
  opBtns.forEach(button => {
    button.classList.remove('active');
  });
}

function performOperation(op) {

  opCount += 1;
  isInNegative = false;
  if (isNumNegative) {
    let neg = expressionInput.value.slice(0, -1);
    expressionInput.value = neg + '-';
    fNum = Number('-' + neg);
  }
  else {
    fNum = Number(expressionInput.value);
  }
  if (opCount > 1) {
    switch (operatorUse) {
      case '+':
        temp += fNum;
        break;
      case '-':
        temp -= fNum;
        break;
      case '*':
        temp *= fNum;
        break;
      case '/':
        temp /= fNum;
        break;
    }
    if (temp === Infinity) {
      expressionInput.value = "lmao";
    }
    else {
      expressionInput.value = temp.toString();
    }
  } else {
    temp = fNum;
  }
  operatorUse = op;
  reset = true;
}

function roundDivision(temp, sNum) {
  let currentTotal = temp / sNum;
  let roundedTotal = Math.round(currentTotal);

  if (currentTotal === roundedTotal) {
    return roundedTotal.toString();
  } else {
    let formattedResult = currentTotal.toFixed(4);
    formattedResult = formattedResult.replace(/\.?0+$/, '');
    return formattedResult;
  }
}

function calculateThis() {
  opBtns.forEach(button => {
    button.classList.remove('active');
  });
  sNum = Number(expressionInput.value);
  switch (operatorUse) {
    case '+':
      currentTotal = temp + sNum;
      break;
    case '-':
      currentTotal = temp - sNum;
      break;
    case '*':
      currentTotal = temp * sNum;
      break;
    case '/':
      if (sNum === 0) {
        expressionInput.style.fontFamily = "'Source Code Pro', monospace";
        expressionInput.value = 'lmao';
        return;
      }
      currentTotal = roundDivision(temp, sNum);
      break;
    default:
      return;
  }

  if (currentTotal < 0) {
    expressionInput.value = Math.abs(currentTotal) + '-';
  } else {
    expressionInput.value = currentTotal.toString();
  }

  temp = currentTotal;
  opCount = 0;
  reset = true;
}


opBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    opBtns.forEach((btn, btnIndex) => {
      if (btnIndex === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });
});



function undoPrevious() {
  const expressionInput = document.getElementById("expressionInput");
  const inputValue = expressionInput.value;

  if (inputValue.length === 0) {
    return;
  }

  if (inputValue.endsWith("-")) {
    expressionInput.value = inputValue.slice(0, -2) + "-";
  } else {
    expressionInput.value = inputValue.slice(0, -1);
  }

  if (inputValue === '-') {
    expressionInput.value = inputValue.slice(0, -1);
  }
}


function changeSign() {

  if (expressionInput.value === '0') {
    expressionInput.value = '';
    isInNegative = true;
  }
  if (isNumNegative) {
    const reverSeTheSign = expressionInput.value.slice(0, -1);
    expressionInput.value = reverSeTheSign;
    isNumNegative = false;
    if (expressionInput.value == '') {
      expressionInput.value = '0';
    }
  }
  else {
    expressionInput.value += '-';
    isNumNegative = true;
  }
}


clearInput();
