'use strict';

const fs = require('fs');
const axios = require('axios');
const xmlParser = require('xml2json');
const search = require('./search-edgar');
const find = require('./find-into-xbrl-json-tree');
const xbrlUtils = require('./xbrl-utils');

(async function() {

  const cik = 764180; // MO
  // const cik =  1652044; // GOOGL
  // const cik = 1326801; // FB
  // const cik = 320193; // AAPL
  const type = '10-Q';
  const num = 1;

  const list = (await search({cik, type, num}));

  const dataPromise = list.map(async item => {

    const { data: xml } = await axios.get(item.href);
    const xbrl = JSON.parse(xmlParser.toJson(xml));

    const xbrlTree = xbrl['xbrl'] || xbrl['xbrli:xbrl'];
    const contextRef = xbrlUtils.getContext(xbrlTree);
    const quater = [
      contextRef.substring(6, 8),
      contextRef.substring(2, 6),
    ].join('-');

    // fs.writeFileSync(
    //   `${__dirname}/MO-${quater}.json`,
    //   JSON.stringify(xbrl, null, 2)
    // );

    try {

      var result = {
        ...item,
        income: xbrlUtils.getIncome(xbrlTree),
        revenue: xbrlUtils.getRevenue(xbrlTree),
        quater: quater,
        shares: xbrlUtils.getShares(xbrlTree),
      };
    } catch(error) {
      fs.writeFileSync(
        __dirname + '/WRONG.json',
        JSON.stringify(xbrl, null, 2)
      );
    }

    return result;
  });

  const data = await Promise.all(dataPromise);
  console.log(`data`, data);
})();