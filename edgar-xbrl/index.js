'use strict';

const fs = require('fs');
const axios = require('axios');
const xmlParser = require('xml2json');
const search = require('./search-edgar');
const find = require('./find-into-xbrl-json-tree');
const xbrlUtils = require('./xbrl-utils');

// const companies = require('./companies.json');
const companies = [{"symbol": "JPM", "cik": 19617}];

/**
 * Company info
 * @param  {[type]} cik [description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
async function getCompanyInfo({ symbol, cik, num, type }) {

  var list = await search({cik, type, num, symbol});

  const mappedPromises = list.map(async item => {

    var { data: xml } = await axios.get(item.href);
    const xbrl = JSON.parse(xmlParser.toJson(xml));
    const xbrlTree = xbrl['xbrl'] || xbrl['xbrli:xbrl'];
    const quater = xbrlUtils.getQuater(xbrlTree);
    const year = xbrlUtils.getYear(xbrlTree);

    return fs.writeFileSync(
      `${__dirname}/data/${symbol}-${year}-${quater}.json`,
      JSON.stringify(xbrl, null, 2),
    );

    try {
      var result = {
        ...item,
        income: xbrlUtils.getIncome(xbrlTree),
        revenue: xbrlUtils.getRevenue(xbrlTree),
        quater: quater + '-' + year,
        shares: xbrlUtils.getShares(xbrlTree),
        symbol: symbol,
      };
    } catch(error) {
      // console.log(`%s error`, symbol, error);
      // fs.writeFileSync(
      //   `${__dirname}/${symbol}-ERROR.txt`,
      //   error.toString()
      // );
      // fs.writeFileSync(
      //   `${__dirname}/${symbol}-WRONG.json`,
      //   JSON.stringify(xbrl, null, 2)
      // );
    }

    return result;
  });

  return await Promise.all(mappedPromises);
};


(async function() {

  const results = await Promise.all(companies.map(async company => {

    return await getCompanyInfo({
      cik: company['cik'],
      symbol: company['symbol'],
      type: '10-Q',
      num: 10,
    });
  }));

  console.log('Done');
})();