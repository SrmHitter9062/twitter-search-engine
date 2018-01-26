var apiParams = {
  movieDetailById:{

  }
}
module.exports = {
  validateGetMovieByIdApiQueryParams:function(queryString){
    var queryObj = {
      _id :""
    }
    if(!queryString.movie_id){
      return {
        queryObj : queryObj,
        validation:false
      }
    }
    var mIds = JSON.parse(queryString.movie_id);
    if(typeof mIds == 'number'){
      queryObj._id = queryString.movie_id
      queryObj.vali
    }else if(typeof mIds == 'object'){
      queryObj._id = {"$in" : mIds};
    }
    return {
      queryObj:queryObj,
      validation:true
    }
  },
  validateGetMovieBySearchQueryParams:function(queryString){
    var queryObj = {};
    if(queryString.query){
      queryObj.movie_name = queryString.query;
    }else{
      return {
        queryObj : queryObj,
        validation:false
      }
    }
    return {
      queryObj:queryObj,
      validation:true
    }
  }

}
