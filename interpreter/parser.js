'use strict';

module.exports = {
  parse,
  parseExpression,
  parseApply,
  skipSpace
};

/**
 * [parse description]
 * @return {[type]} [description]
 */
function parse(program) {

  let {expr, rest} = parseExpression(program);

  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }

  return expr;
}

/**
 * [parseExpression description]
 * @param  {[type]} program [description]
 * @return {[type]}         [description]
 */
function parseExpression(program) {

  program = skipSpace(program);
  let match, expression;

  const matchValueString = /^"([^"]*)"/;
  /**
   * - only from the beginning of the string
   * - match all the numbers until
   * - there is a word character
   */
  const matchValueNumber = /^\d+\b/;
  /**
   * - only from the beginning of the string
   * - match all the characters until
   * - finding a space or one parenthese or a comma or a quote
   */
  const matchWord = /^[^\s(),"]+/;

  const isValueString = matchValueString.test(program);
  const isValueNumber = matchValueNumber.test(program);
  const isWord = matchWord.test(program);

  console.log('---------------------------------');
  console.log(`program`, program);
  console.log(`isValueString`, isValueString);
  console.log(`isValueNumber`, isValueNumber);
  console.log(`isWord`, isWord);
  console.log('---------------------------------');

  if (isValueString) {
    match = matchValueString.exec(program);
    expression = {type: "value", value: match[1]};
  } else if (isValueNumber) {
    match = matchValueNumber.exec(program);
    expression = {type: "value", value: Number(match[0])};
  } else if (isWord) {
    match = matchWord.exec(program);
    expression = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  const programMinusMatch = program.slice(match[0].length);

  return parseApply(expression, programMinusMatch);
}

/**
 * [parseApply description]
 * @param  {[type]} expr    [description]
 * @param  {[type]} program [description]
 * @return {[type]}         [description]
 */
function parseApply(expr, program) {

  program = skipSpace(program);

  if (program[0] !== "(") {
    return {expr: expr, rest: program};
  }

  // remove first parenthese
  program = skipSpace(program.slice(1));

  expr = {type: "apply", operator: expr, args: []};

  // loop unilt you find `)`
  while (program[0] !== ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] !== ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  const programMinusLast = program.slice(1);

  return parseApply(expr, programMinusLast);
}

/**
 * [skipSpace description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
