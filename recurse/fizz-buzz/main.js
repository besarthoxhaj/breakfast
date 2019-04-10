'use strict';

for (var i = 1; i <= 100; i++) {

  var isCrackle = i % 3 === 0;
  var isPop = i % 5 === 0;

  if (isCrackle && isPop) {
    console.log('CracklePop');
    continue;
  }

  if (isCrackle) {
    console.log('Crackle');
    continue;
  }

  if (isPop) {
    console.log('Pop');
    continue;
  }
}
