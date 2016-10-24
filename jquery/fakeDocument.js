
function createfakeClassList() {
  var fakeClassList = ['zoo'];

  fakeClassList.add = function(className) {
    fakeClassList.push(className);
  };

  fakeClassList.remove = function(className) {
    var idx = fakeClassList.indexOf(className);
    fakeClassList.splice(idx,1);
  };

  fakeClassList.toggle = function(className) {
    if(fakeClassList.indexOf(className) > -1) {
      fakeClassList.remove(className);
    } else {
      fakeClassList.add(className);
    }
  };

  return fakeClassList;
}

// singleton
var document = document || {
  querySelectorAll: function() {
    return document.elm;
  },
  $$reset$$: function() {
    document.elm = [{
      classList: createfakeClassList()
    }];
  },
};

document.$$reset$$();

module.exports = document;
