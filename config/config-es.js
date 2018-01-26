var Config = function(){
  this.indexesList = {
    twitter:'twitter'
  }
  this.indexSetting = {
    twitter:{
      index:"twitter",
      body:{
        "settings" : {
          "index" : {
              "number_of_shards" : 5,
              "number_of_replicas" : 2
          }
        }
      }
    }
  }
}

module.exports = function(){
  return new Config();
}
