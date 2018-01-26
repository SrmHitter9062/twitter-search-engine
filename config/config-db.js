
var Config = function () {
  this.dbUrl = {    
    localdbUrl : "mongodb://localhost:27017/twitterDb"
  }
};

module.exports = function () {
  return new Config();
};
