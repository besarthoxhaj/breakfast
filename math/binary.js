'use strict';

class Binary {

  /**
   *
   *
   */
  constructor(init) {

    this.value = init.split('').reverse();
  }

  /**
   * E.g. '0101'
   *
   */
  addition(addValue) {

    const revBin = addValue.split('').reverse();

    const outputRaw = revBin.reduce((acc, elm, idx, selfArray) => {
      var isLast = (idx === (selfArray.length - 1));
      var currValue = this.value[idx];

      if (currValue === '1' && elm === '1') {
        acc.res.push('0');
        acc.carry = true;
      }

      if (currValue === '0' && elm === '1' || currValue === '1' && elm === '0') {
        if (acc.carry) {
          acc.res.push('0');
          return acc;
        } else {
          acc.res.push('1');
        }
      }

      if (currValue === '0' && elm === '0') {
        if (acc.carry) {
          acc.res.push('1');
          acc.carry = false;
          return acc;
        } else {
          acc.res.push('0');
        }
      }

      if (isLast && acc.carry) {
        acc.res.push('1');
      }

      return acc;
    }, {res: [], carry: false});

    this.value = outputRaw.res.map(elm => elm);
    const output = outputRaw.res.reverse();
    return output.join('');
  }
}

/**
 *
 *
 */
module.exports = Binary;