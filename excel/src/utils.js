/**
 * "3 + 9"       => ["3", "9", "+"]
 * "3 + 9 * 2"   => ["3", "9", "2", "*", "+"]
 * "(3 + 9) * 2" => ["3", "9", "+", "2", "*"]
 *
 * Resources:
 * - https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html
 * - https://www.youtube.com/watch?v=vq-nUF0G4fI
 * - https://www.youtube.com/watch?v=vXPL6UavUeA
 */
export const infixToPostfix = src => {

  const dict = new Map([
    ['^', 4],
    ['*', 3],
    ['/', 3],
    ['+', 2],
    ['-', 2],
    ['(', 1],
    [')', 1],
  ]);

  const postfix = [];
  const stack = [];
  const tokens = src.split('').filter(elm => !!elm.trim());

  for (const token of tokens) {
    debugger;
    const currValue = dict.get(token);
    const lastOpValue = dict.get(last(stack));

    // Initial cases, nothing to see here
    if (!dict.has(token)) { postfix.push(token); continue; }
    if (!stack.length) { stack.push(token); continue; }
    if (token === '(') { stack.push(token); continue; }

    /**
     *
     *
     *
     */
    if (token === ')') {
      while (last(stack) !== '(') postfix.push(stack.pop());
      stack.pop(); continue;
    }

    /**
     * Interesting part is here, there are two scenarios:
     * - [A, B], [+] and current operator is "*"
     * The infix expression looks: "A + B * ?". Whatever is on "?" will be
     * multiplied to "B" first.
     *
     * - [A, B], [+] and current operator is "-"
     * Easy to guess the infix expression looks: "A + B - ?". There's no
     * need to keep the initial "+" around as "A + B" can be evaluated
     * regardless of what's in "?". Pop "+" from the stack and push in
     * the postfix.
     */
    if (currValue > lastOpValue) { stack.push(token); continue; }
    while(dict.get(last(stack)) >= currValue) postfix.push(stack.pop());
    stack.push(token);
  }

  while(hasElements(stack)) postfix.push(stack.pop());
  return postfix;

  /**
   *
   *
   *
   */
  function last(array) { return array[array.length - 1]; }
  function hasElements(arr) { return arr.length > 0; }
};

/**
 *
 *
 * Resources:
 * - https://www.youtube.com/watch?v=QCnANUfgC-w
 */
export const evaluatePostfixExpression = src => {

  var operators = new Set(['^', '*', '/', '+', '-']);
  var stack = [];

  for (let i = 0; i < src.length; i++) {
    const elm = src[i];
    if (!operators.has(elm)) { stack.push(elm); continue }
    const operands = [stack.pop(), stack.pop()];
    const currRes = applyOperator(elm, operands);
    stack.push(currRes);
  }

  return stack[0];

  /**
   *
   *
   *
   */
  function applyOperator(operator, operands) {
    var [ int, end ] = operands.map(Number);
    if (operator === '+') return int + end;
    if (operator === '-') return int - end;
    if (operator === '*') return int * end;
    if (operator === '/') return int / end;
    if (operator === '^') return int ** end;
  }
};
