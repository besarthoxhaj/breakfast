'use strict';

var test = function(description,cb) {
  var t = {
    equal: function(actual,expected,mess) {
      if(actual === expected) {
        console.log('PASS: ' + mess);
      } else {
        console.error('ERROR: ' + mess);
      }
    }
  };
  cb(t);
}

test('do something', function (t) {
  t.equal('one','one','ok!');
});

test('do something wrong', function (t) {
  t.equal('one','two','not!');
});
