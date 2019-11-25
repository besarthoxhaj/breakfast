'use strict';

const fs = require('fs');
const find = require('./find-into-xbrl-json-tree');
const search = require('./search-edgar');

// const filePath = __dirname + '/Q10.json';
// const fileStr = fs.readFileSync(filePath, 'utf-8');
// const fileJson = JSON.parse(fileStr);
//
// const results = find(fileJson, {
//   name: 'us-gaap:NetIncomeLoss',
//   contextRef: 'FD2019Q2QTD',
// });
//
// console.log(`results`, results);

(async function() {

  const cik = 1326801;
  const type = '10-Q'; // '10-K';

  const data = await search({cik, type});
  console.log(`data`, data);
})();