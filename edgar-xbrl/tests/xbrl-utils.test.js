'use strict';

const xbrlUtils = require('../xbrl-utils');

it('xbrlUtils.getContext', () => {

  const tree = {
    'dei:DocumentType': {
      'contextRef': 'FD2019Q3YTD',
      'id': 'd205898790e427-wk-Fact-9F6B02F72DFB545A82F4162DD3945076',
      '$t': '10-Q',
    }
  };

  const contextRef = xbrlUtils.getContext(tree);
  expect(contextRef).toBe('FD2019Q3YTD');
});