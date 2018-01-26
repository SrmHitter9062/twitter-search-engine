var express = require("express")
var router = express.Router()
var validationHelper = require('../helpers/validationHelper');
var esHelper = require('../helpers/elasticSearchHelper');
var elasticSearch = require('../services/elasticSearch');
var tweetHelper = require('../helpers/tweetHelper');

/* tweet search api =>
pathname - api/tweet/search
parameteres -
  Mandatory:
    text :  any text value i.e. #PadmaavatRow (mandatory)
Extra support -
  1) date range support (must be in YYYY-MM-DD format)
   startDate=2015-12-01
   endDate=2018-01-25
  OR
   2 ) retweet_count range filter support:
   rtcf_min=0
   rtcf_max=4
 OR
   3) favorite_count range filter support :
   fcf_min=0
   fcf_max=5
 OR
  4) lang support:
  lang = en (lanugage code i.e. en)

  Example :
  http://localhost:3000/api/tweet/search?text=PadmaavatRow
 */
router.get('/tweet/search',function(req,res,next){
  var queryString = req.query || {};
  if(!queryString.text) {
    res.json({
      status:'fail',
      message:'insufficient params'
    })
  }
  var defaultQuery = {
      "multi_match": {
        "query": queryString.text,
        "fields": [ "text", "user.name" ],
        "type":"best_fields"
      }
  }
  var esQuery = defaultQuery;
  var esRangeFilter = esHelper.getEsRangeFilter(queryString);
  if(esRangeFilter){
    var rangeQuery = {
      "bool":{
        "must":defaultQuery,
        "filter":{
          "range":esRangeFilter
        }
      }
    }
    esQuery = rangeQuery;
  }else if(queryString.lang){
    var matchQuery = {
        "bool":{
          "must":defaultQuery,
          "filter":{
            "term":{
              "lang": queryString.lang
            }
          }
        }
    }
    esQuery = matchQuery
  }
  /* result count config*/
  var resultCount = {from: 0, to:50} // default is 50
  if(queryString.from >= 0){
    resultCount.from = parseInt(queryString.from);
  }
  if(queryString.to >= 0){
    resultCount.to = parseInt(queryString.to);
  }
  elasticSearch.getTweetSuggestion(esQuery,resultCount).then((esRecords)=>{
    var results = esRecords.hits.hits||[];
    res.json({
      status:'success',
      results:results,
      count:results.length
    })
  }).catch((err)=>{
    console.log("err ",err)
    res.json({
      status:'fail',
      message:'Error in getting suggetion'
    })
  })
})
/* api to get tweets by any trending topic
parameters:
  pathname - api/getTweetsByTrendingTopic
queryParams -
  query : any trending topic (i.e. %23padmawatRow)
returns :
  tweets
*/
router.get('/getTweetsByTrendingTopic',function(req,res,next){
  var queryString = req.query || {};
  var tweetResult = tweetHelper.getTweetsByTrendingTopic(queryString)
  .then((result)=>{
    res.json({
      status:'success',
      results:result
    })
    return;
  })
  .catch((err)=>{
    console.log("err ",err)
    res.json({
      status:'fail',
      message:"some error in fetching"
    })
    return;
  })
})

module.exports = router
