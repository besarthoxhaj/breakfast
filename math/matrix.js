'use strict';

exports.add = function() {
  const args = [].slice.call(arguments);

  return args.reduce((acc,elm,idx) => {
    // initiate
    if(idx === 0) return elm;

    // check if have same dimensions
    const colsA = module.exports.transpose(acc)[0].length;
    const rowsA = acc[0].length;
    const colsB = module.exports.transpose(elm)[0].length;
    const rowsB = elm[0].length;

    if(colsA !== colsB || rowsA !== rowsB) {
      throw 'Can not add matrices of different dimensions';
    }

    return acc.map((_,c) => {
      return acc[0].map((_,r) => {
        return acc[c][r] = Number(acc[c][r]) + Number(elm[c][r]);
      });
    });
  },[]);
}

exports.multiply = function() {
  const args = [].slice.call(arguments);

  return args.reduce((acc,elm,idx) => {

    // initiate
    if(idx === 0) return elm;

    // check if scalar
    if(Number.isInteger(elm)) {
      return module.exports.scalarProduct(acc,elm);
    }

    // check if have same dimensions
    const rowsA = module.exports.transpose(acc)[0].length;
    const rowsB = module.exports.transpose(elm)[0].length;
    if(rowsA !== rowsB) {
      throw 'Can not multiply matrices of different rows';
    }

    const B = module.exports.transpose(elm)
      .map(module.exports.factorProduct.bind(null,acc))
      .map(module.exports.flattened);

    return module.exports.transpose(B);
  },[]);
}

exports.transpose = function(matrix) {
  return matrix[0].map((_,c) => {
    return matrix.map((_,r) => {
      return matrix[r][c];
    });
  });
}

exports.factorProduct = function(_NxM,_Nx1) {

  const A = module.exports.transpose(_NxM);

  if(A.length !== _Nx1.length) {
    throw 'Can not add matrices of different dimensions';
  }

  return A.reduce((acc,elm,idx) => {
    const scalar = _Nx1[idx];

    if(idx === 0) {
      const S = module.exports.scalarProduct(acc,scalar);
      return module.exports.unZip(S);
    }

    const S = module.exports.unZip(
      module.exports.scalarProduct(elm,scalar)
    );

    return module.exports.add(acc,S);
  },A[0]);
}

exports.scalarProduct = function(_Nx1, x) {
  return _Nx1.map(a => {
    if(Number.isInteger(a)) {
      return Number(a) * Number(x);
    } else {
      return a.map(b => Number(b) * Number(x));
    }
  });
}

exports.unZip = function(NxM,nth) {
  return module.exports.transpose([NxM]);
}

exports.pipe = function() {
  const allFuncs = ([]).slice.call(arguments,0);
  return function () {
    const inner = ([]).slice.call(arguments,0);
    const first_func = allFuncs[1];
    const rest_func = allFuncs.slice(1);
    return rest_func.reduce((composed, f) => {
      return f(composed);
    }, first_func.apply(undefined,inner));
  };
}

exports.flattened = function(elm) {
  return elm.reduce((a, b) => a.concat(b), []);
}
