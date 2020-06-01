'use strict';

const R = require('ramda');
const utils = require('./utils');

/**
 *
 *
 */
function execRound({inputTextLeft, inputTextRight, currSubKey, currRound}) {

  const expansionTextRight = utils.permutation(inputTextRight, utils.E);
  const xOrExpansionKey = utils.xOr(expansionTextRight, currSubKey);
  const substitutionText = utils.substitutionBoxes(xOrExpansionKey);
  const permutationText = utils.permutation(substitutionText, utils.P);

  const nextTextLeft = inputTextRight;
  const nextTextRight = utils.xOr(inputTextLeft, permutationText);

  return {
    outputTextLeft: nextTextLeft,
    outputTextRight: nextTextRight,
  };
}

/**
 *
 *
 */
function getSubKeys(keyBinary) {

  const useKey = utils.permutation(keyBinary, utils.PC_1);
  const { subKeys } = new Array(16).fill().reduce((acc, _, idx) => {
    const L0 = R.last(acc.carryKeys).slice(0, 28);
    const R0 = R.last(acc.carryKeys).slice(28, 56);
    const shiftL = utils.circularShift(L0, utils.SHIFT[idx]);
    const shiftR = utils.circularShift(R0, utils.SHIFT[idx]);
    acc.subKeys.push(utils.permutation(shiftL + shiftR, utils.PC_2));
    acc.carryKeys.push(shiftL + shiftR);
    return acc;
  }, {subKeys: [], carryKeys: [useKey]});
  return subKeys;
}

/**
 *
 *
 */
function des(textBinary, subKeys) {

  const groupText = utils.groupBlocks(textBinary, 64);

  const groupOutput = groupText.map(block => {
    const initPerm = utils.permutation(block, utils.IP);
    const rounds = new Array(16).fill().map((_, idx) => idx + 1);
    const output = rounds.reduce((acc, round, idx) => {
      if (idx === 0) {
        return execRound({
          currRound: round,
          inputTextLeft: initPerm.slice(0,  32),
          inputTextRight: initPerm.slice(32, 64),
          currSubKey: subKeys[idx],
        });
      }
      return execRound({
        currRound: round,
        inputTextLeft: acc.outputTextLeft,
        inputTextRight: acc.outputTextRight,
        currSubKey: subKeys[idx],
      });
    }, {});

    const outputSwap = output.outputTextRight + output.outputTextLeft;
    const outputPerm = utils.permutation(outputSwap, utils.IP_1);
    return outputPerm;
  });

  const binaryChiper = groupOutput.join('');
  return utils.fromBinaryToHex(binaryChiper);
}

/**
 *
 *
 */
const encode = (msg, key) => des(msg, getSubKeys(key));
const decode = (msg, key) => des(msg, getSubKeys(key).reverse());

/**
 *
 *
 */
const msg = utils.fromStringToBinary('Hello, World! This is Foo speaking.');
const key = utils.fromHexToBinary('133457799bbcdff1');

const chiperHex = encode(msg, key);
const chiperBin = utils.fromHexToBinary(chiperHex);
const decodeHex = decode(chiperBin, key);
const decodeStr = utils.fromHexToString(decodeHex);

console.log(`decodeStr`, decodeStr);