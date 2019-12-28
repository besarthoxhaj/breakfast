'use strict';

const find = require('./find-into-xbrl-json-tree');

/**
 * Income
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getIncome = function(xbrl) {

  const year = module.exports.getYear(xbrl);
  const quarter = module.exports.getQuater(xbrl);
  const cik = module.exports.getCik(xbrl);
  const symbol = module.exports.getTradingSymbol(xbrl).toLowerCase();
  const contextRef = module.exports.getContext(xbrl);
  const originalContextRef = xbrl['dei:DocumentType']['contextRef'];
  const fiscalYear = module.exports.getFiscalYearEnd(xbrl);

  const incomeKeys = [
    'us-gaap:NetIncomeLoss',
    'us-gaap:ProfitLoss',
  ];

  const maybeResult = incomeKeys.reduce((acc, incomeKey) => {
    if (acc.length > 0) return acc;
    if (xbrl[incomeKey]) return xbrl[incomeKey];
    return acc;
  }, []);

  const results = find(maybeResult, { contextRef });

  if (results.length > 0) {
    return module.exports.formatNumber(results[0]['$t']);
  }

  // Let's apply heuristics. We know:
  // - there will be two year Y and (Y - 1)
  // --> filter and keep only Y
  const onlyCurrYear = maybeResult.filter(result => {
    return result['contextRef'].indexOf(year) > -1;
  });
  // - most likely one will be QTD and the other YTD
  // - YTD not necessarily is bigger than QTD
  // - so before going that path see if there's some hints
  // - check if there's a YTD in one of the context and filter it
  const maybeOnlyQuarter = onlyCurrYear.filter(result => {
    return !(result['contextRef'].indexOf('YTD') > -1);
  });
  // see if we are lucky
  if (maybeOnlyQuarter.length === 1) {
    return module.exports.formatNumber(maybeOnlyQuarter[0]['$t']);
  }
  if (maybeOnlyQuarter.length > 1 && areAllTheSame(maybeOnlyQuarter)) {
    return module.exports.formatNumber(maybeOnlyQuarter[0]['$t']);
  }
  // no luck, check if `onlyCurrYear` or  has something to offer
  // - check if the number are all the same
  if (areAllTheSame(onlyCurrYear)) {
    return module.exports.formatNumber(onlyCurrYear[0]['$t']);
  }

  // console.log(`maybeResult`, maybeResult);
  // console.log(`onlyCurrYear`, onlyCurrYear);
  // console.log(`maybeOnlyQuarter`, maybeOnlyQuarter);

  throw [
    'No income results',
    'context: ' + contextRef,
    'original context: ' + originalContextRef,
    'symbol: ' + symbol,
    'quarter: ' + quarter,
    'year: ' + year,
    'cik: ' + cik,
    'fiscalYear:' + fiscalYear,
  ].join(' ');
};

/**
 * Revenue
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getRevenue = function(xbrl) {

  const cik = module.exports.getCik(xbrl);
  const year = module.exports.getYear(xbrl);
  const quarter = module.exports.getQuater(xbrl);
  const symbol = module.exports.getTradingSymbol(xbrl).toLowerCase();
  const contextRef = module.exports.getContext(xbrl);
  const originalContextRef = xbrl['dei:DocumentType']['contextRef'];
  const fiscalYear = module.exports.getFiscalYearEnd(xbrl);

  const revenueKeys = [
    'us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax',
    'us-gaap:Revenues',
    'us-gaap:SalesRevenueNet',
    'us-gaap:SalesRevenueGoodsNet',
    `${symbol}:TotalRevenuesAndOtherIncome`,
  ];

  const maybeResultMatches = revenueKeys.filter(revenueKey => {
    return xbrl[revenueKey];
  });

  if (maybeResultMatches.length < 0) throw [
    'No one of revenue keys matched',
    'context: ' + contextRef,
    'original context: ' + originalContextRef,
    'symbol: ' + symbol,
    'quarter: ' + quarter,
    'year: ' + year,
    'cik: ' + cik,
    'fiscalYear: ' + fiscalYear,
  ].join(' ');

  const maybeRevenues = maybeResultMatches.map(revenueKey => {

    const maybeResult = xbrl[revenueKey];
    const maybeResultType = Object.prototype.toString.call(maybeResult);
    if (maybeResultType === '[object Object]') return maybeResult;

    const results = find(maybeResult, { contextRef });
    if (results.length > 0 && areAllTheSame(results)) {
      return results[0];
    }

    const onlyCurrYear = maybeResult.filter(result => {
      return result['contextRef'].indexOf(year) > -1;
    });

    const maybeOnlyQuarter = onlyCurrYear.filter(result => {
      return !(result['contextRef'].indexOf('YTD') > -1);
    });

    if (maybeOnlyQuarter.length === 1) {
      return maybeOnlyQuarter[0];
    }

    if (maybeOnlyQuarter.length > 1 && areAllTheSame(maybeOnlyQuarter)) {
      return maybeOnlyQuarter[0];
    }

    if (onlyCurrYear.length > 0 && areAllTheSame(onlyCurrYear)) {
      return onlyCurrYear[0];
    }
  })
  .filter(maybeRevenue => maybeRevenue);

  if (maybeRevenues.length > 0 && areAllTheSame(maybeRevenues)) {
    return module.exports.formatNumber(maybeRevenues[0]['$t']);
  }

  // heuristics time, get bigger number
  const biggerRevenueNum = maybeRevenues.reduce((acc, maybeRevenue) => {
    const currRev = Number(maybeRevenue['$t']);
    const isCurrRevenueBigger = currRev > acc;
    return isCurrRevenueBigger ? currRev : 0;
  }, 0);

  return module.exports.formatNumber(biggerRevenueNum);
}

/**
 * Shares
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getShares = function(xbrl) {

  const cik = module.exports.getCik(xbrl);
  const year = module.exports.getYear(xbrl);
  const quarter = module.exports.getQuater(xbrl);
  const symbol = module.exports.getTradingSymbol(xbrl).toLowerCase();
  const fiscalYear = module.exports.getFiscalYearEnd(xbrl);

  let sharesOutstanding = undefined;

  if (xbrl['dei:EntityCommonStockSharesOutstanding']) {
    sharesOutstanding = xbrl['dei:EntityCommonStockSharesOutstanding'];
  }

  if (xbrl['us-gaap:CommonStockSharesOutstanding']) {
    sharesOutstanding = xbrl['us-gaap:CommonStockSharesOutstanding'];
  }

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

  throw [
    'No number of shares found',
    'symbol: ' + symbol,
    'quarter: ' + quarter,
    'year: ' + year,
    'cik: ' + cik,
    'fiscalYear:' + fiscalYear,
  ].join(' ');
};

/**
 * Get context
 * Examples:
 * FROM_Jan01_2019_TO_Sep30_2019_Entity_0000034088
 * FD2019Q3QTD
 */
exports.getContext = function(xbrl) {

  const symbol = module.exports.getTradingSymbol(xbrl).toLowerCase();
  const docType = xbrl['dei:DocumentType']['$t'];
  const contextRef = xbrl['dei:DocumentType']['contextRef'];
  const year = module.exports.getYear(xbrl);
  const quarter = module.exports.getQuater(xbrl);
  const cik = module.exports.getCik(xbrl);
  const fiscalYear = module.exports.getFiscalYearEnd(xbrl);

  const fromMonthYear = /\bFROM_([A-Z]{3}[0-9]{2})/i;
  const matchType01 = /\b[A-Z]{2}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{3}\b/i;
  const matchType02 = /\bFROM_[A-Z]{3}[0-9]{2}_[0-9]{4}_TO_[A-Z]{3}[0-9]{2}_[0-9]{4}\b/i;
  const matchType03 = new RegExp(`${matchType02}|_Entity_[0-9]{10}`);
  const matchType04 = /\b[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{3}\b/i;
  const matchType05 = /\b[A-Z]{1}[0-9]{4}[A-Z]{1}[0-9]{1}\b/i;
  const matchType06 = /C_[0-9]{10}_[0-9]{8}_[0-9]{8}/i;
  const matchType07 = /\beol_[A-Z]{2}[0-9]{4,5}[-]{3,4}[0-9]{4}-Q[0-9]{4}_STD_[0-9]{2,3}_([0-9]{8})_0\b/i;
  const matchType08 = /\b[0-9,A-Z]{33}_D([0-9]{8})-([0-9]{8})\b/i;
  const matchType09 = /\bP[0-9]{2}_[0-9]{2}_[0-9]{4}To[0-9]{2}_[0-9]{2}_[0-9]{4}\b/i;

  if (matchType01.test(contextRef)) {
    return quarter === 'Q1'
      ? contextRef
      : contextRef.replace(/Y/, 'Q');
  }

  if (matchType02.test(contextRef) || matchType03.test(contextRef)) {
    const currQuarter = `FROM_${quarter === 'Q2' ? 'Apr01' : 'Jul01'}`;
    return quarter === 'Q1'
      ? contextRef
      : contextRef.replace(fromMonthYear, currQuarter);
  }

  if (matchType04.test(contextRef)) {
    return contextRef.match(/(D[0-9]{4}[A-Z]{1}[0-9]{1})/i)[1];
  }

  if (matchType05.test(contextRef)) {
    return contextRef;
  }

  if (matchType06.test(contextRef)) {
    return contextRef;
  }

  if (matchType07.test(contextRef)) {
    return contextRef;
  }

  if (matchType08.test(contextRef)) {
    return contextRef;
  }

  if (matchType09.test(contextRef)) {
    return contextRef;
  }

  throw [
    'Context format not recognized',
    'context: ' + contextRef,
    'symbol: ' + symbol,
    'quarter: ' + quarter,
    'year: ' + year,
    'cik: ' + cik,
    'fiscalYear:' + fiscalYear,
  ].join(' ');
}


/**
 *
 *
 */
exports.getQuater = function(xbrl) {
  return xbrl['dei:DocumentFiscalPeriodFocus']['$t'];
}

/**
 *
 *
 */
exports.getYear = function(xbrl) {
  return xbrl['dei:DocumentFiscalYearFocus']['$t'];
}

/**
 *
 *
 */
exports.getCik = function(xbrl) {
  return Number(xbrl['dei:EntityCentralIndexKey']['$t']);
}

/**
 *
 *
 */
exports.getFiscalYearEnd = function(xbrl) {
  return xbrl['dei:CurrentFiscalYearEndDate']['$t'];
}

/**
 *
 *
 */
exports.getName = function(xbrl) {
  return xbrl['dei:EntityRegistrantName']['$t'];
}

/**
 * Trading Symbol
 * @param  {[type]} xbrl [description]
 * @return {[type]}      [description]
 */
exports.getTradingSymbol = function(xbrl) {

  const maybeTradingSymbol = xbrl['dei:TradingSymbol'];
  const maybeCompanyName = xbrl['dei:EntityRegistrantName'];

  const typeSymbol = Object.prototype.toString.call(maybeTradingSymbol);
  const typeName = Object.prototype.toString.call(maybeCompanyName);

  if (typeSymbol === '[object Object]') {
    return maybeTradingSymbol['$t'];
  }

  if (typeSymbol === '[object Array]') {
    return maybeTradingSymbol[0]['$t'];
  }

  if (typeName === '[object Object]') {
    return maybeCompanyName['$t'];
  }

  if (typeName === '[object Array]') {
    return maybeCompanyName[0]['$t'];
  }

  throw 'Did not find neither TradingSymbol nor CompanyName';
}

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
    // console.log('resultsArray', resultsArray);
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