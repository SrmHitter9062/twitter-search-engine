var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  _id:{type:Number,required:true},
  text:{type:String,require:true,default:""},
  truncated:{type:Boolean,default:false},
  entities:{},
  extended_entities:{},
  metadata:{},
  source:{type:String,default:""},
  user:{},
  geo:{type:String,default:null},
  coordinates:{type:String,default:null},
  place:{type:String,default:null},
  contributors:{type:String,default:null},
  retweet_count:{type:Number,default:0},
  favorite_count:{type:Number,default:0},
  favorited:{type:Boolean,default:false},
  retweeted:{type:Boolean,default:false},
  lang:{type:String,default:""},
  created_at:{type:Date,default : new Date()},
  updated_at:{type:Date,default : new Date()}
},{ _id: false })

tweetSchema.index({_id:1},{unique:true}) // compound index
module.exports = mongoose.model('tweetData',tweetSchema);
