var esConfig = require('../config/config-es.js')();
var esService = require('../services/elasticSearch');
var TweetDataModel = require('../models/TweetData')
var dateHelper = require("./dateHelper");
var mongoose = require('mongoose')
var bluebirdPromise = require('bluebird');
var configDb = require('../config/config-db')();
var configServer = require('../config/config-server')();
mongoose.connect(configDb.dbUrl.localdbUrl,function(err,res){
  if(err){
    console.log('db connection failed in tweet helper: '+err);
  }
  else{
    console.log('db connection success in tweet helper: '+configDb.dbUrl.localdbUrl);
  }
})

module.exports = {
  /* function which creates tweet type mapping in Twitter index*/
  createTweetTypeMapping:function(){
    var mapping = esService.createTweetMapping().then(mp=>{
      console.log("success in creation tweet mapping ",mp);
    }).catch(err=>{
      console.log("error in creating tweet mapping",err);
    });
  },
  indexingProcessOfTweets:function(){
    var skip = 0;
    var limit = 762;
    TweetDataModel.find({},(err,resp)=>{
      if(err){
        console.log("error in fetching tweet data from db");
        return;
      }
      var addIndexingPromises = [];
      var tobeIndexed = resp.length;
      for(var i = 0;i < resp.length;i++){
        addIndexingPromises.push(esService.tweetDataToEsIndex(resp[i]));
      }
      var successfullIndexed = 0;
      /* indexing tweet promises execution*/
      bluebirdPromise.settle(addIndexingPromises).then((indexedData)=>{
        indexedData.forEach((indexedTweet,index)=>{
          if(indexedTweet.isFulfilled()){
            successfullIndexed += 1;
            console.log("Tweet data has been indexed ",indexedTweet._settledValue)
          }else{
            console.log("Tweet data has not been indexed ",indexedTweet._settledValue)
          }
        });
        console.log("tobeIndexed:",tobeIndexed , ",successfullIndexed:",successfullIndexed,",failedIndexed:",tobeIndexed-successfullIndexed);
      }).catch((err)=>{
        console.log("error in settling all addIndexingPromises: All failed ",err)
      })
    }).skip(skip).limit(limit);
  },
  /* function to get es range filter if any on the bases of query parameters*/
  getEsRangeFilter:function(queryString){
    var rangeFilter = null;
    if(queryString.startDate && queryString.endDate){
      if(dateHelper.checkDateFormat([queryString.startDate,queryString.endDate],"YYYY-MM-DD")){
        rangeFilter = {
          "created_at":{
            "gte":queryString.startDate,
            "lte":queryString.endDate
          }
        }
      }
    }
    else if (queryString.rtcf_min >= 0 && queryString.rtcf_max){
      rangeFilter = {
        "retweet_count":{
          "gte":parseInt(queryString.rtcf_min) || 0,
          "lte":parseInt(queryString.rtcf_max)
        }
      }
    }
    else if(queryString.fcf_min >= 0 && queryString.fcf_max){
      rangeFilter = {
        "favorite_count":{
          "gte":parseInt(queryString.fcf_min) || 0,
          "lte":parseInt(queryString.fcf_max)
        }
      }
    }
    return rangeFilter;
  }
}
