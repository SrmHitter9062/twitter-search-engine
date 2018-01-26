var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: "http://localhost:9200",
  log:"info",
  apiVersion:"5.5"
});
/*Elasticsearch automatically arranges the five primary shards split across the two nodes with one replica
nodes:2
shards:5
replica:1(of every shard)
*/
/* check if elastic server is down*/
elasticClient.ping({
  requestTimeout:3000
},function(err){
  if(err){
    console.log("elastic cluster is down!!!");
  }else{
    console.log("elastic cluster is up and running");
  }
});

module.exports = {
  isIndexExists:function(index){
      return elasticClient.indices.exists({
        index:index
      });
  },
  /*function to create es index */
  createEsIndex:function(indexSetting){
    return elasticClient.indices.create({
      index: indexSetting.index,
      body : indexSetting.body
    });
  },
  deleteIndex:function(index){
    return elasticClient.indices.delete({
      index:index
    });
  },
  /* function to create tweet mapping*/
  createTweetMapping:function(){
    return elasticClient.indices.putMapping({
      index:"twitter",
      type:"tweet",
      body:{
          properties:{
            "text" : {type:"text"},
            "user" : {
              "properties": {
                 "name": { "type": "string" },
                 "screen_name" : {"type":"string"}
                 }
            },
            "retweet_count":{ "type": "integer" },
            "favorite_count":{ "type": "integer" },
            "created_at":{ "type": "date" },
            "lang":{ "type": "text" },
            suggest:{
              type:"completion",
              analyzer:"simple",
              search_analyzer:"simple"
            }
          }
        }
    })
  },
  /* indexing process of tweet data in es index*/
  tweetDataToEsIndex:function(document){
    return elasticClient.index({
      index:"twitter",
      type:"tweet",
      id:document._id, // for preventing duplicate insertion
      body:{
        "text":document.text,
        "user":{
            "name":document.user && document.user.name || "",
            "screen_name":document.user && document.user.screen_name || ""
        },
        "retweet_count":document.retweet_count,
        "favorite_count":document.favorite_count,
        "created_at":document.created_at,
        "lang":document.lang,
        data:document,
      }
    })
  },
  getTweetSuggestion: function(esQuery,resultCount){
    return elasticClient.search({
      index: 'twitter',
      type:"tweet",
      body: {
        "from" : resultCount.from,
        "size" : resultCount.to,
        query: esQuery
      }
    })
  }
}
