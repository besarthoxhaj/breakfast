'use strict';

const fs = require('fs');
const find = require('./find-into-xbrl-json-tree');
const search = require('./search-edgar');
const xbrlUtils = require('./xbrl-utils');

// const filePath = `${__dirname}/AAPL-Q3-2019.json`;
// const filePath = `${__dirname}/FB-Q3-2019.json`;
const filePath = `${__dirname}/MO-Q3-2019.json`;
const xbrl = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const xbrlTree = xbrl['xbrl'] || xbrl['xbrli:xbrl'];

const keys = Object.keys(xbrlTree);
const gaapKeys = keys.filter(elm => elm.toLowerCase().includes('us-gaap'));
const revKeys = keys.filter(elm => elm.toLowerCase().includes('rev'));

const keysLength = keys.length;
const gaapKeysLength = gaapKeys.length;
const revKeysLenght = revKeys.length;

// console.log(`keysLength`, keysLength);
// console.log(`gaapKeysLength`, gaapKeysLength);
// console.log(`revKeysLenght`, revKeysLenght);

// console.log(`revKeys`, revKeys);
// console.log(`xbrlTree`, xbrlTree['us-gaap:Revenues']);
// console.log(`xbrlTree['us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax']`, xbrlTree['us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax']);

// const revenue = xbrlUtils.getRevenue(xbrlTree);
// console.log(`revenue`, revenue);

// const income = xbrlUtils.getIncome(xbrlTree);
// console.log(`income`, income);