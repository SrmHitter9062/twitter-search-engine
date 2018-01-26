var tweetData = require('../models/TweetData')
var mongoose = require('mongoose')
var Promise = require('bluebird');
var Twit = require('twit')
var configServer = require('../config/config-server')();
var tweeterApiConfig = configServer.tweeterApiConfig;
var Tweeter = new Twit({
  consumer_key:         tweeterApiConfig.consumer_key,
  consumer_secret:      tweeterApiConfig.consumer_secret,
  access_token:         tweeterApiConfig.access_token,
  access_token_secret:  tweeterApiConfig.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

module.exports = {
  /*function to save tweet data in database*/
  storeTweetInDatabase:function(){
    // trending topics - #SaluteToSoldiers  , #PadmaavatRow ,#PWL3SF2 , salman khan since:2011-07-11 ,#PadmaShri since:2011-07-11
    var query = {
      query:"#PadmaShri since:2011-07-11",
      count:100
    }
    this.getTweetsByTrendingTopic(query)
    .then((tweetResponse)=>{
      /*save in db*/
      var tweetList = tweetResponse.statuses || [];
      // get tweet promises
      var dbSchemaTweetList = this.getDBSchemaTweets(tweetList)
      var tweetDBSavePromises = this.getTweetDbSavePromiseList(dbSchemaTweetList);
      // save all tweets in database
      Promise.settle(tweetDBSavePromises).then(function(results){ // Promise 3
        var saveCount = 0;
        results.forEach((item)=>{
          if(item.isFulfilled()){
            saveCount += 1;
            console.log("CREATION TWEET DATA SUCCESS , ",item._settledValue._id);
          }else{
            console.log("CREATION TWEET DATA ERROR , ",item._settledValue.message);
          }
        })
        console.log("db saving count :",saveCount)
      })

    })
    .catch((err)=>{
      console.log("error in fetching tweets" ,err);
    })

  },
  /*function for getting tweets on any trending topic */
  getTweetsByTrendingTopic:function(queryString){
    var queryObj = {
       q: queryString.query,
       count: queryString.count || 100,
       result_type: queryString.result_type|| "recent"
    }
    return new Promise((resolve,reject)=>{
      Tweeter.get('search/tweets',queryObj , function(err, data, response) {
        if(err){
          reject(err)
        }
       resolve(data)
      })
    })
  },
  /* function to get tweet promises list to perform parallel data saving in db*/
  getTweetDbSavePromiseList:function(tweetDataList){
    var promises = [];
    tweetDataList.forEach((data)=>{
      var newTweetData = new tweetData(data);
      var prm = new Promise((resolve,reject)=>{
        newTweetData.save((err,resp)=>{
          if(err){
            reject(err)
          }
          resolve(resp);
        })

      })
      promises.push(prm);
    })
    return promises;
  },
  /*get formated tweets according to db tweet schema*/
  getDBSchemaTweets : function(tweetList){
    var formatedTweets = [];
    tweetList.forEach((tweet)=>{
      var tweetDetail = {
        _id: tweet.id,
        text:tweet.text,
        truncated:tweet.truncated || false ,
        entities : tweet.entities || {},
        extended_entities:tweet.extended_entities || {},
        metadata:tweet.metadata || {},
        source:tweet.source || "",
        user:tweet.user || {},
        geo:tweet.geo||null,
        coordinates:tweet.coordinates || null,
        place:tweet.place || null,
        contributors:tweet.contributors|| null,
        retweet_count:tweet.retweet_count || 0,
        favorite_count:tweet.favorite_count||0,
        favorited:tweet.favorited || false,
        retweeted:tweet.retweeted||false,
        lan:tweet.lang||"",
        created_at:tweet.created_at || new Date()
      }
      formatedTweets.push(tweetDetail);
    })
    return formatedTweets;
  }
}
