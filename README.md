Getting started

requirements for set up:
-node
-express
-mongoDb
-mongoose
-elastic search

#to run the project , do below things
- go to project folder
1) run the app server
 $ nodemon app.js
2) run the mongo server
 $ mongod -dbpath /mydatabase/db
3) mongo shell
 $ mongo
4) run elasticsearch:
 $ elasticsearch


 Tweet search API Information:

 1) path name - api/tweet/search

  query parameters :
    text = trending topic or user name  (i.e. PadmaavatRow ,SaluteToSoldiers,Yukti Varjatia )

    Note : In database, tweets data of  following trending topic ,have been stored.
    [SaluteToSoldiers , PadmaavatRow ,PWL3SF2 , salman khan since:2011-07-11 ,PadmaShri since:2011-07-11]

    sample example :
    a) search by trending topic :
       http://localhost:3000/api/tweet/search?text=%23SaluteToSoldiers
    b) search  by user name
       http://localhost:3000/api/tweet/search?text=Yukti%20Varjatia

Tweet search api by filters :

Note : if below filters are sent invalid in api params then result will be returned based on text searched only

 1) date range filter support:
 query parameters :
  text=trending topic or username
  startDate=2015-12-01   (in YYYY-MM-DD format)
  endDate=2018-01-25    (in YYYY-MM-DD format)

  sample api:
  http://localhost:3000/api/tweet/search?text=PadmaavatRow&startDate=2016-01-23&endDate=2018-09-18


  2) retweet_count filter(rtcf) support:
  query parameters :
   text=trending topic or username
   rtcf_min=0 ( int format)
   rtcf_max=4  (int format)

   sample api:
   http://localhost:3000/api/tweet/search?text=PadmaavatRow&rtcf_min=0&rtcf_max=4

   3) favorite_count filter(fcf) support:
   query parameters :
    text=trending topic or username
    fcf_min=0   (int format)
    fcf_max=5   (int format)

    sample api:
    http://localhost:3000/api/tweet/search?text=PadmaavatRow&fcf_min=1&fcf_max=4

    4) favorite_count filter(fcf) support:
    query parameters :
     text=trending topic or username
     lang = en (language code i.e. en)t)

     sample api:
     http://localhost:3000/api/tweet/search?text=SaluteToSoldiers&lang=en

    5) pagination support :
    text=trending topic or username
    from=0   (int format)
    to=50   (int format)

    if not send default 50 results will be returned

    sample api :
    http://localhost:3000/api/tweet/search?text=%23PadmaavatRow&from=20&to=30
