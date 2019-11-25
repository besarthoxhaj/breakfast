'use strict';

const find = require('./find-into-xbrl-json-tree');

exports.getIncome = function(xbrl) {

  const contextRef = module.exports.getContext(xbrl);

  const results = find(
    xbrl['us-gaap:NetIncomeLoss'],
    { contextRef }
  );

  if (results.length < 1) {
    console.error('contextRef', contextRef);
    console.error('xbrl', xbrl);
    throw 'No results';
  }

  if (!areAllTheSame(results)) {
    throw 'Different results';
  }

  return module.exports.formatNumber(results[0]['$t']);
};

/**
 * [description]
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getRevenue = function(xbrl) {

  const contextRef = module.exports.getContext(xbrl);

  const results = find(
    xbrl['us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax'],
    { contextRef }
  );

  if (results.length < 1) {
    console.error('contextRef', contextRef);
    console.error('xbrl', xbrl);
    throw 'No results';
  }

  if (!areAllTheSame(results)) {
    throw 'Different results';
  }

  return module.exports.formatNumber(results[0]['$t']);
}

/**
 * [description]
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getShares = function(xbrl) {

  const sharesOutstanding = xbrl['dei:EntityCommonStockSharesOutstanding'];
  const type = Object.prototype.toString.call(sharesOutstanding);

  if (type === '[object Object]') {
    const number = sharesOutstanding['$t'];
    return module.exports.formatNumber(number);
  }

  if (type === '[object Array]') {
    const number = sharesOutstanding.reduce((acc, elm) => {
      acc += Number(elm['$t']);
      return acc;
    }, 0);
    return module.exports.formatNumber(number);
  }

  throw `Error no 'dei:EntityCommonStockSharesOutstanding'`;
};

/**
 * [description]
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getContext = function(xbrl) {

  const docType = xbrl['dei:DocumentType']['$t'];
  const contextRef = xbrl['dei:DocumentType']['contextRef'];

  const year = contextRef.substring(2, 6);
  const quarter = contextRef.substring(6, 8);
  const range = contextRef.substring(8);

  if (docType === '10-Q' && quarter === 'Q1') {
    return contextRef;
  }

  if (docType === '10-Q') {
    return contextRef.replace(/Y/, 'Q');
  }

  return contextRef;
};

/**
 * [check description]
 * @return {[type]} [description]
 */
function areAllTheSame(resultsArray) {

  const dict = resultsArray.reduce((acc, elm) => {
    const value = elm['$t'];
    if (!acc[value]) acc[value] = 0;
    acc[value] += 1;
    return acc;
  }, {});

  if (Object.keys(dict).length > 1) {
    console.log('resultsArray', resultsArray);
    return false;
  }

  return true;
}

/**
 * [formatNumber description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
exports.formatNumber = function(num, decimals=2) {

  const sign = num > 0 ? '' : '-';
  num = Math.abs(num);

  if (num < 1e3) return num;

  if (num >= 1e3 && num < 1e6) {
    return sign + (num / 1e3).toFixed(decimals) + 'K';
  }

  if (num >= 1e6 && num < 1e9) {
    return sign + (num / 1e6).toFixed(decimals) + 'M';
  }

  if (num >= 1e9 && num < 1e12) {
    return sign + (num / 1e9).toFixed(decimals) + 'B';
  }

  if (num >= 1e12) {
    return sign + (num / 1e12).toFixed(decimals) + 'T';
  }
}