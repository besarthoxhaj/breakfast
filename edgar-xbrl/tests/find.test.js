'use strict';

const find = require('../find-into-xbrl-json-tree');

const tree = {
  'html': {
    'head': {},
    'body': {
      'style': '',
      'div': [
        {
          'style': '',
          'span': [
            {
              'ix:nonNumeric': {
                'id': '24E488E624D474507ABCD3291A98E3B3',
                'name': 'us-gaap:NetIncomeLoss',
                'contextRef': 'FD2019Q2YTD',
                'span': {
                  'style': '',
                  '$t': 'Hello, World!'
                }
              }
            }
          ]
        },
        {
          'us-gaap:NetIncomeLoss': [
            { 'hello': 'world' }
          ]
        }
      ]
    }
  }
};

const results = find(tree, {
  name: 'us-gaap:NetIncomeLoss',
  contextRef: 'FD2019Q2YTD',
});

console.log(`results`, results);