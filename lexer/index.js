/**
 *
 *
 *
 */
'use strict';

var str = `
  <div>
    <h1>Hello, World</h1>
  </div>
`;

var store = [];

for(let i = 0; i < str.length; i++) {

  const elm = str[i];
  const next = str[i+1];

  if (elm === '<' && next !== '/') {

    console.log(`elm, next`, elm, next);
    const currChar = elm;
    const token = {type: 'tag', state: 'open', symbol: undefined};
    const name = [];

    let j = i;
    innerWord:
    while (true) {
      j++;
      const inner = str[j];
      const isEnd = (inner === '') || (inner === '/') || (inner === '>');
      if (isEnd) break innerWord;
      name.push(inner);
    }

    token.symbol = name.join('');
    store.push(token);
    i = j;
  }

  if (elm === '<' && next !== '/') {

  }
}

/**
 *
 *
 *
 */
console.log(`store`, store);
