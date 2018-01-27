Getting started

requirements for set up:
- node

- express

- mongoDb

- mongoose

- elastic search

#Poject Running process
- In project folder
1) run the app server - $ nodemon app.js

2) run the mongo server -  $ mongod -dbpath /mydatabase/db

3) mongo shell -  $ mongo

4) run elasticsearch - $ elasticsearch


#Tweet search API Information detail:   

1) Path name - api/tweet/search  

  query parameters :
  text = trending topic or username  (i.e. PadmaavatRow ,SaluteToSoldiers,Yukti Varjatia )    

  sample example :
  a) search by trending topic : http://localhost:3000/api/tweet/search?text=%23SaluteToSoldiers

     result : outcome/tweet search by text
  b) search  by user name: http://localhost:3000/api/tweet/search?text=Yukti%20Varjatia

     result:outcome/tweet search by username

  - Point1 : In database, tweets data of  following trending topic ,have been stored(total 762 records)
     [SaluteToSoldiers , PadmaavatRow ,PWL3SF2 , salman khan since:2011-07-11 ,PadmaShri since:2011-07-11]
  - Point2 : outcome can be seen on outcome folder at roor level
  - Point3 : one tweet document data can be seen in tweet-data-sampl.md file at root level


Tweet search api by filters :

Note : if below filters are sent invalid in api params then result will be returned based on text searched only

1) Date range filter support:
  query parameters :
  text=trending topic or username
  startDate=2015-12-01   (in YYYY-MM-DD format)
  endDate=2018-01-25    (in YYYY-MM-DD format)

  sample api: http://localhost:3000/api/tweet/search?text=PadmaavatRow&startDate=2016-01-23&endDate=2018-09-18

  result : outcome/tweet search with date filter

2) Retweet_count filter(rtcf) support:
   query parameters :
   text=trending topic or username
   rtcf_min=0 ( int format)
   rtcf_max=4  (int format)

   sample api: http://localhost:3000/api/tweet/search?text=PadmaavatRow&rtcf_min=0&rtcf_max=4

   result : outcome/tweet search with retweet count filter

3) Favorite_count filter(fcf) support:
    query parameters :
    text=trending topic or username
    fcf_min=0   (int format)
    fcf_max=5   (int format)

    sample api:http://localhost:3000/api/tweet/search?text=PadmaavatRow&fcf_min=1&fcf_max=4

    result : outcome/tweet search with favorite count filter

4) Language filter support:
   query parameters :
   text=trending topic or username
   lang = en (language code i.e. en)t)

   sample api: http://localhost:3000/api/tweet/search?text=SaluteToSoldiers&lang=en

   result:outcome/tweet search with language filter

5) Pagination support :
  query parameters :
  text=trending topic or username
  from=0   (int format)
  to=50   (int format)

  Note - if not sent default first 50 results will be returned

  sample api :http://localhost:3000/api/tweet/search?text=%23PadmaavatRow&from=20&to=30

  result: outcome/tweet search with pagination filter



code paths -
    1)api code - routes/api.js

    2)tweet data schema - models/TweetData.js

    3) es searvice - services/elasticsearch.js

    4)tweet helper - helpers/tweetHelper.js

    5)elasticsearch Helper - helpers/elasticSearchHelper.js

    6)outcome - outcome/

    7)es config - config/config-es

    8)db config - config/config-db

    9)server config - config/config-server    
