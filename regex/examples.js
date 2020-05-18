'use strict';

var test = require('../tape/index.js');
var deepEqual = require('../deep-equal/index.js');

test('REGEX -> FOO-*, BAr.*, L.*, LA-*', t => {

  const pattern = /([A-Z]+)[\-\.]/;

  const texts = [
    'FOO-12-01',
    'BAR.12-01',
    'LO-12-01',
    'Lo-12-01',
    'A.12-01',
  ];

  const matches = texts
    .map(text => (text.match(pattern) || [])[1])
    .filter(elm => elm);

  t.ok(deepEqual(matches, ["FOO","BAR","LO","A"]), 'correct matches');
  t.end();
});

test('REGEX -> *CCC-NNN*', t => {

  const pattern = /[A-Z]{3}-[0-9]{3}/i;

  const texts = [
    'xxxAAA-111xxx',
    'aaa-111',
  ];

  const results = texts.map(text => pattern.test(text));
  const areTrue = results.every(result => result);

  t.ok(areTrue, 'all true');
  t.end();
});

test('REGEX -> CCC-NNN', t => {

  const pattern = /\b[A-Z]{3}-[0-9]{3}\b/i;

  const texts = [
    'AAA-111',
    'aaa-111',
  ];

  const results = texts.map(text => pattern.test(text));
  const areTrue = results.every(result => result);

  t.ok(areTrue, 'all true');
  t.end();
});

test('REGEX -> *CCC-xxxx-NNN*', t => {

  const pattern = /[A-Z]{3}-(.*)-[0-9]{3}/i;

  const texts = [
    'xxxAAA-hello-111xxx',
    'aaa-foo123bar-111',
  ];

  const results = texts.map(text => pattern.test(text));
  const matches = texts.map(text => text.match(pattern)[1]);
  const areTrue = results.every(result => result);

  t.ok(areTrue, 'all true');
  t.ok(deepEqual(matches, ['hello', 'foo123bar']), 'matched matches');
  t.end();
});

test('REGEX -> CCC-xxxxx-yyyy-NNN*', t => {

  const pattern = /\bFROM_(.{5}_[0-9]{4})_TO\b/i;

  const texts = [
    'FROM_hello_1111_TO',
    'FROM_Jan01_2019_TO',
  ];

  const results = texts.map(text => pattern.test(text));
  const matches = texts.map(text => text.match(pattern)[1]);
  const areTrue = results.every(result => result);

  t.ok(areTrue, 'all true');
  t.ok(
    deepEqual(matches, ['hello_1111', 'Jan01_2019']),
    'matched matches'
  );
  t.end();
});

test('REGEX -> CCC-xxx[xx]-yyyy-NNN', t => {

  const initial = /eol_[A-Z]{2}[0-9]{4,5}[-]{3,4}/;
  const middle = /[0-9]{4}-Q[0-9]{4}_STD_[0-9]{2,3}_/;
  const final = /([0-9]{8})_0/;
  const pattern = new RegExp([initial.source, middle.source, final.source].join(''));

  const texts = [
    'eol_PE11158---1810-Q0003_STD_90_20180331_0',
    'eol_PE11158---1810-Q0007_STD_181_20180630_0',
    'eol_PE9479----1210-Q0006_STD_273_20120630_0',
    'eol_PE94794---1210-Q0006_STD_73_20120630_0',
  ];

  const results = texts.map(text => pattern.test(text));
  const matches = texts.map(text => text.match(pattern)[1]);
  // console.log(`results`, results);
  // console.log(`matches`, matches);
  const areTrue = results.every(result => result);
  t.ok(areTrue, 'all true');
  t.end();
});

test.only('REGEX -> CCC-xxx[xx]-yyyy-NNN', t => {

  const pattern = /^(\d*|\.\d*|\d*\.\d*)([A-Z])/i;
  const texts = [ '10T', '10.55T', '.5T', 'T' ];

  const results = texts.map(text => pattern.test(text));
  const matches = texts.map(text => text.match(pattern));
  // console.log(`results`, results);
  console.log(`matches`, matches);
  // t.ok(deepEqual(matches, ['T', 'T', 'T']), 'matches');
  t.end();
});

test.init();
