'use strict';

const fs = require('fs');
const axios = require('axios');
const xmlParser = require('xml2json');
const search = require('./search-edgar');
const find = require('./find-into-xbrl-json-tree');
const xbrlUtils = require('./xbrl-utils');

(async function() {

  // const cik = 1326801; // FB
  const cik = 320193; // AAPL
  const type = '10-Q';
  const num = 5;

  const list = (await search({cik, type, num}));

  const dataPromise = list.map(async item => {

    const { data: xml } = await axios.get(item.href);
    const xbrl = JSON.parse(xmlParser.toJson(xml));

    const xbrlTree = xbrl['xbrl'] || xbrl['xbrli:xbrl'];
    const contextRef = xbrlUtils.getContext(xbrlTree);

    return {
      ...item,
      income: xbrlUtils.getIncome(xbrlTree),
      quater: [
        contextRef.substring(6, 8),
        contextRef.substring(2, 6),
      ].join('-'),
      // shares: xbrlUtils.getShares(xbrlTree),
    };
  });

  const data = await Promise.all(dataPromise);
  console.log(`data`, data);
})();