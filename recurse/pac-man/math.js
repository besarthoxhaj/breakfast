'use strict';

/**
 *
 *
 */
function math(a, operation, b) {

  var precision = 10;

  a = a * precision;
  b = b * precision;

  var operator;
  switch(operation) {
    case '-':
      operator = (a, b) => a - b;
      break;
    case '+':
      operator = (a, b) => a + b;
      break;
    case '*':
    case 'x':
      precision = precision * precision;
      operator = (a, b) => a * b;
      break;
    case '÷':
    case '/':
      precision = 1;
      operator = (a, b) => a / b;
      break;
  }

  var result = operator(a, b);

  return result / precision;
}
