'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const BASE_PATH = 'https://www.sec.gov';

/**
 * Simple scraper. Given the company id will
 * query the HTML based "www.sec.gov" and return
 * the actual xbrl link in a json format.
 */
exports.getDocumentsLink = async function getDocumentsLink(params) {

  const searchParams = {
    type: params['type'],
    cik: params['cik'],
    count: params['num'],
  };

  const searchPath = getSearchPath(searchParams);
  const { data: searchPageHtml } = await axios.get(searchPath);
  const $ = cheerio.load(searchPageHtml);

  const linksPath = [
    getColumnSelector({
      table: 'Results',
      columnIdx: 2,
    }),
    '#documentsbutton'
  ].join(' > ');

  const linksColumn = $(linksPath)
    .toArray()
    .map(elm => $(elm).attr('href'));

  const datesPath = getColumnSelector({
    table: 'Results',
    columnIdx: 4
  });

  const datesColumn = $(datesPath)
    .toArray()
    .map(elm => $(elm).text());

  const data = linksColumn.map((link, idx) => ({
    type: params['type'],
    href: BASE_PATH + link,
    date: datesColumn[idx],
    symbol: params['symbol'],
  })).slice(0, params['num']);

  return Promise.all(data.map(subSearch));
};

/**
 * Goes to the document link (e.g. 10-Q) and scrapes
 * the specific file href i.e. look into the 'type'
 * column for 'XML' or 'EX-101.INS'
 *
 * Example of Apple 3rd quarter documents.
 * https://www.sec.gov/Archives/edgar/data/320193/000032019319000076/0000320193-19-000076-index.htm
 */
async function subSearch(link) {

  const { data: filingPageHtml } = await axios.get(link.href);
  const $ = cheerio.load(filingPageHtml);

  const docsPath = getColumnSelector({
    table: 'Data Files',
    columnIdx: 3
  });

  const docsColumn = $(docsPath)
    .toArray()
    .map(elm => $(elm).children().attr('href'));

  const typesPath = getColumnSelector({
    table: 'Data Files',
    columnIdx: 4
  });

  const typesColumn = $(typesPath)
    .toArray()
    .map(elm => $(elm).text());

  const xmlTypeIdx = typesColumn
    .findIndex(elm => {

      const isXML = (elm === 'XML');
      const isINS = (elm === 'EX-101.INS');
      const isBoth = (isXML && isINS);

      if (isBoth) throw 'Both type found';

      return (isXML || isINS);
    });

  if (xmlTypeIdx < 0) {
    throw 'No actual link XBRL was found here: ' + link.href;
  }

  const fileUrl = docsColumn[xmlTypeIdx];

  return {
    ...link,
    href: BASE_PATH + fileUrl,
  };
}

/**
 * Construct the search URL
 *
 * Example of Apple list of 10-Q's
 * https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&type=10-Q&CIK=320193
 */
function getSearchPath(params) {

  // edgar database always returns
  // multiple of 10
  const count = params['count'] > 10 ? 20 : 10;

  return [
    'https://www.sec.gov/cgi-bin/browse-edgar?',
    'action=getcompany&CIK=' + params['cik'],
    '&type=' + params['type'],
    '&count=' + count,
  ].join('');
}

/**
 * Construct a table selector
 *
 */
function getColumnSelector(params) {

  return [
    `table[summary="${params['table']}"]`,
    'tbody',
    'tr',
    `td:nth-child(${params['columnIdx']})`,
  ].join(' > ');
}

/**
 *
 * https://www.sec.gov/cgi-bin/browse-edgar?CIK=AAPL&owner=exclude&action=getcompany
 */
exports.getCikBasedOnTicker = async function getCikBasedOnTicker({ ticker }) {

  const searchPath = [
    'https://www.sec.gov/cgi-bin/browse-edgar?',
    'action=getcompany',
    '&owner=exclude',
    '&CIK=' + ticker,
  ].join('');

  const { data: searchPageHtml } = await axios.get(searchPath);
  const $ = cheerio.load(searchPageHtml);

  const cikSelector = [
    '.companyInfo',
    '.companyName',
    'a'
  ].join(' > ');

  const maybeCik = $(cikSelector).text().split(' ')[0];
  return Number(maybeCik);
}