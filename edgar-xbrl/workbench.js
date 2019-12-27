'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const find = require('./find-into-xbrl-json-tree');
const search = require('./search-edgar');
const xbrlUtils = require('./xbrl-utils');

const companies = require('./companies.json');
console.log(`companies.length`, companies.length);

/**
 *
 *
 */
function readDirectorySync(directory, onlySymbol) {
  return fs.readdirSync(directory).reduce((acc, file) => {
    const symbol = file.split('-').shift();
    if (onlySymbol && symbol !== onlySymbol) return acc;
    const fileName = file.split('.').slice(0, -1).join('.');
    const filePath = directory + '/' + file;
    const parsedFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    acc[fileName] = getTree(parsedFile);
    return acc;
  }, {});
}

/**
 *
 *
 */
function getTree(xbrl) {
  return xbrl['xbrl'] || xbrl['xbrli:xbrl'];
}

/**
 *
 *
 */
function getKeySimilarTo(subString, xbrlTree) {
  return Object.keys(xbrlTree).filter(elm => {
    return elm.toLowerCase().includes(subString);
  });
}

/**
 *
 *
 */
function groupByUnique(arrayStr) {
  return arrayStr.reduce((acc, key) => {
    if (acc[key] === undefined) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});
}

const files = readDirectorySync(`${__dirname}/data`);
console.log(`Object.keys(files)`, Object.keys(files));
console.log(`Object.keys(files).length`, Object.keys(files).length);


const updatedCompanies = companies.map(company => {

  const firstOccurrence = Object.keys(files)
    .filter(fileKey => fileKey.indexOf(company.symbol) > -1).pop();

  const currFile = files[firstOccurrence];

  if (!currFile) return;

  return {
    ...company,
    name: xbrlUtils.getName(currFile),
  };
});
console.log(`updatedCompanies`, updatedCompanies);
// update 'companies.json'
// fs.writeFileSync(
//   `${__dirname}/companies.json`,
//   JSON.stringify(xbrl, null, 2),
// );


// const similars = Object.keys(files).map(key => {
//   return getKeySimilarTo('dei:', files[key]);
// });
// console.log(`similars`, similars);

const quarters = Object.keys(files).map(key => {
  return xbrlUtils.getQuater(files[key]);
});
console.log(`quarters.length`, quarters.length);
// console.log(`quarters`, quarters);

const years = Object.keys(files).map(key => {
  return xbrlUtils.getYear(files[key]);
});
console.log(`years.length`, years.length);
// console.log(`years`, years);

const fiscalYears = Object.keys(files).map(key => {
  return xbrlUtils.getFiscalYearEnd(files[key]);
});
// console.log(`fiscalYears.length`, fiscalYears.length);
// console.log(`groupByUnique(fiscalYears)`, groupByUnique(fiscalYears));
// console.log(`JSON.stringify(fiscalYears, null, 2)`, JSON.stringify(fiscalYears, null, 2));

// const tradingSymbols = Object.keys(files).map(key => {
//   const currFile = files[key];
//   try {
//     return xbrlUtils.getTradingSymbol(currFile);
//   } catch(error) {
//     // const similarResults = getKeySimilarTo('dei:', currFile);
//     // console.log(`similarResults`, similarResults);
//     // console.log(`currFile['dei:EntityRegistrantName']`, currFile['dei:EntityRegistrantName']);
//     // console.log(`currFile['dei:EntitySmallBusiness']`, currFile['dei:EntitySmallBusiness']);
//     // const findResults = JSON.stringify(currFile).indexOf('AMZN');
//     // console.log(`findResults`, findResults);
//     throw error;
//   }
// });

// const contexts = Object.keys(files).map(key => {
//   // return xbrlUtils.getTradingSymbol(files[key]);
//   return xbrlUtils.getContext(files[key]);
//   return {
//     symbol: xbrlUtils.getTradingSymbol(files[key]),
//     context: xbrlUtils.getContext(files[key]),
//   };
// });

const revenues = Object.keys(files).map(key => {
  const currFile = files[key];
  // if (key !== 'DIS-Q1-2018') return;
  // const contextRef = xbrlUtils.getContext(currFile);
  // if (contextRef !== '') return;
  try {
    return {
      symbol: xbrlUtils.getTradingSymbol(currFile),
      revenue: xbrlUtils.getRevenue(currFile),
      period: xbrlUtils.getQuater(currFile) + '-' + xbrlUtils.getYear(currFile),
      cik: xbrlUtils.getCik(currFile),
    };
  } catch(error) {
    console.log('key %s, revenues:error', key, error);
    // const similarResults = getKeySimilarTo('revenue', currFile);
    // console.log(`similarResults`, similarResults);
  }
});
// console.log(`revenues.length`, revenues.length);
// console.log(`revenues`, revenues);

const incomes = Object.keys(files).map(key => {
  const currFile = files[key];
  // if (key !== '') return;
  // const contextRef = xbrlUtils.getContext(currFile);
  // if (contextRef !== '') return;
  try {
    return {
      symbol: xbrlUtils.getTradingSymbol(currFile),
      income: xbrlUtils.getIncome(currFile),
      period: xbrlUtils.getQuater(currFile) + '-' + xbrlUtils.getYear(currFile),
      cik: xbrlUtils.getCik(currFile),
    };
  } catch(error) {
    console.log('key %s, incomes:error', key, error);
    // console.log(`xbrlUtils.getContext(currFile)`, xbrlUtils.getContext(currFile));
    // console.log(`currFile['us-gaap:NetIncomeLoss']`, currFile['us-gaap:NetIncomeLoss']);
    // console.log(`getKeySimilarTo('income', currFile)`, getKeySimilarTo('income', currFile));
    // console.log(`similarResults`, similarResults);
  }
});
// console.log(`incomes.length`, incomes.length);
// console.log(`incomes`, incomes);

// const shares = Object.keys(files).map(key => {
//
//   const currFile = files[key];
//   // if (key !== 'MSFT-78-0000') return;
//   // const contextRef = xbrlUtils.getContext(currFile);
//   // if ('C_0000789019_20180701_20190331' !== contextRef) return;
//
//   try {
//     return {
//       symbol: xbrlUtils.getTradingSymbol(currFile),
//       income: xbrlUtils.getShares(currFile),
//       period: xbrlUtils.getQuater(currFile) + '-' + xbrlUtils.getYear(currFile),
//       cik: xbrlUtils.getCik(currFile),
//     };
//   } catch(error) {
//     console.log('shares:error', error);
//     // console.log(`xbrlUtils.getContext(currFile)`, xbrlUtils.getContext(currFile));
//     // console.log(`currFile['us-gaap:NetIncomeLoss']`, currFile['us-gaap:NetIncomeLoss']);
//     // console.log(`getKeySimilarTo('income', currFile)`, getKeySimilarTo('income', currFile));
//     // console.log(`similarResults`, similarResults);
//   }
// });
// console.log(`incomes.length`, incomes.length);
// console.log(`incomes`, incomes);

// const xbrlTree = xbrl['xbrl'] || xbrl['xbrli:xbrl'];
//
// const keys = Object.keys(xbrlTree);
// const gaapKeys = keys.filter(elm => elm.toLowerCase().includes('us-gaap'));
// const revKeys = keys.filter(elm => elm.toLowerCase().includes('rev'));
// const sharesKey = keys.filter(elm => (elm.toLowerCase().includes('stock') || elm.toLowerCase().includes('share')));
// const deiPrefix = keys.filter(elm => elm.toLowerCase().includes('dei'));
// const instantPeriod = find(xbrlTree, 'instant');
//
// const keysLength = keys.length;
// const gaapKeysLength = gaapKeys.length;
// const revKeysLenght = revKeys.length;
// const sharesKeyLenght = sharesKey.length;
// const deiPrefixLenght = deiPrefix.length;
//
// // console.log(`keysLength`, keysLength);
// // console.log(`gaapKeysLength`, gaapKeysLength);
// // console.log(`revKeysLenght`, revKeysLenght);
// // console.log(`sharesKeyLenght`, sharesKeyLenght);
// // console.log(`deiPrefixLenght`, deiPrefixLenght);
//
// // console.log(`instantPeriod`, instantPeriod);
// // console.log(`deiPrefix`, deiPrefix);
// // console.log(`revKeys`, revKeys);
// // console.log(`sharesKey`, sharesKey);
// // console.log(`xbrlTree`, xbrlTree['us-gaap:Revenues']);
// // console.log(`xbrlTree['us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax']`, xbrlTree['us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax']);
// // console.log(`xbrlTree`, xbrlTree['us-gaap:SalesRevenueNet']);
// // console.log(`xbrlTree['dei:EntityCommonStockSharesOutstanding']`, xbrlTree['dei:EntityCommonStockSharesOutstanding']);
// // console.log(`xbrlTree['us-gaap:CommonStockSharesOutstanding']`, xbrlTree['us-gaap:CommonStockSharesOutstanding']);
// // console.log(`xbrlTree['us-gaap:WeightedAverageNumberOfSharesOutstandingBasic']`, xbrlTree['us-gaap:WeightedAverageNumberOfSharesOutstandingBasic']);
// // console.log(`xbrlTree['us-gaap:Revenues']`, xbrlTree['us-gaap:Revenues']);
// // console.log(`xbrlTree['dei:DocumentType']`, xbrlTree['dei:DocumentType']);
// // console.log(`xbrlTree['dei:DocumentQuarterlyReport']`, xbrlTree['dei:DocumentQuarterlyReport']);
// // deiPrefix.forEach(dei => console.log(`xbrlTree[dei]`, dei, xbrlTree[dei]));
//
// const contextRef = xbrlUtils.getContext(xbrlTree);
// console.log(`contextRef`, contextRef);
//
// // const revenue = xbrlUtils.getRevenue(xbrlTree);
// // console.log(`revenue`, revenue);
//
// // const income = xbrlUtils.getIncome(xbrlTree);
// // console.log(`income`, income);
//
// // const shares = xbrlUtils.getShares(xbrlTree);
// // console.log(`shares`, shares);
//
// // const tradingSymbol = xbrlUtils.getTradingSymbol(xbrlTree);
// // console.log(`tradingSymbol`, tradingSymbol);