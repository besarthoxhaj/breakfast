'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const BASE_PATH = 'https://www.sec.gov';

/**
 * [description]
 * @param  {[type]} cik  [description]
 * @param  {[type]} type [description]
 * @param  {[type]} num  [description]
 * @return {[type]}      [description]
 */
module.exports = async function(params) {

  const searchParams = {
    type: params['type'],
    cik: params['cik'],
    count: params['num'],
  };

  const searchPath = getSearchPath(searchParams);
  const { data: searchPageHtml } = await axios.get(searchPath);
  const $ = cheerio.load(searchPageHtml);

  const linksPath = [
    getColumn({
      table: 'Results',
      columnIdx: 2,
    }),
    '#documentsbutton'
  ].join(' > ');

  const linksColumn = $(linksPath)
    .toArray()
    .map(elm => $(elm).attr('href'));

  const datesPath = getColumn({
    table: 'Results',
    columnIdx: 4
  });

  const datesColumn = $(datesPath)
    .toArray()
    .map(elm => $(elm).text());

  const data = linksColumn.map((link, idx) => ({
    type: params['type'],
    href: BASE_PATH + link,
    date: datesColumn[idx]
  })).slice(0, params['num']);

  return Promise.all(data.map(subSearch));
};

/**
 * [subSearch description]
 * @param  {[type]} link [description]
 * @return {[type]}      [description]
 */
async function subSearch(link) {

  const { data: filingPageHtml } = await axios.get(link.href);
  const $ = cheerio.load(filingPageHtml);

  const docsPath = getColumn({
    table: 'Data Files',
    columnIdx: 3
  });

  const docsColumn = $(docsPath)
    .toArray()
    .map(elm => $(elm).children().attr('href'));

  const typesPath = getColumn({
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

  if (xmlTypeIdx < 0) throw 'Error';

  const fileUrl = docsColumn[xmlTypeIdx];

  return {
    ...link,
    href: BASE_PATH + fileUrl,
  };
}

/**
 * [getSearchPath description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getSearchPath(params) {

  return [
    'https://www.sec.gov/cgi-bin/browse-edgar?',
    'action=getcompany&CIK=' + params['cik'],
    '&type=' + params['type'],
    '&count=' + (params['count'] > 10 ? 20 : 10),
  ].join('');
}

/**
 * [getColumn description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function getColumn(params) {

  return [
    `table[summary="${params['table']}"]`,
    'tbody',
    'tr',
    `td:nth-child(${params['columnIdx']})`,
  ].join(' > ');
}