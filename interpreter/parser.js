'use strict';

module.exports = {
  parseExpression,
  parseApply,
  skipSpace
};

function parseExpression(program) {

  program = skipSpace(program);
  let match, expression;

  const matchValueString = /^"([^"]*)"/;
  const matchValueNumber = /^\d+\b/;
  const matchWord = /^[^\s(),"]+/;

  if (match = matchValueString.exec(program)) {
    expression = {type: "value", value: match[1]};
  } else if (match = matchValueNumber.exec(program)) {
    expression = {type: "value", value: Number(match[0])};
  } else if (match = matchWord.exec(program)) {
    expression = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  debugger;

  return parseApply(expression, program.slice(match[0].length));
}

function parseApply(expr, program) {

  program = skipSpace(program);

  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));

  expr = {type: "apply", operator: expr, args: []};

  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(1));
}

function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
