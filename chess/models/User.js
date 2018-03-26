'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
	userid : { type:String, required: true},
  	stamp : { type : Date, default : Date()},
  	color : {type:String,required:true}
});

var UserSchema = new Schema({
  userid: {type: String,required : true},
  roll : {type: String,required:true},
  matcheswon : {type: Number,default:0},
  matchesplayed : {type: Number,default:0},
  matches: [MatchSchema],
  fiderating : {type: Number,default:1000},
  instirating: {type: Number,default:1000}
});

// check for id....
var BlogSchema = new Schema({
  title : {type: String,required : true},
  subtitle : {type: String,required : true},
  body : {type: String,required : true},
  stamp : { type : Date, default : Date()}
});

var UserOnline = new Schema({
  sessionid: {type: String,required : true},
  userid: {type: String,required : true}
});

var AllMatch = new Schema({
  matchid : {type: String,required : true},
  scoresheet: [Number],
  Result : {type: Number, default : 0}
}); 

var Users = mongoose.model('Users', UserSchema);
var Match = mongoose.model('Match', MatchSchema);
var Blog = mongoose.model('Blog', BlogSchema);
var Useronline = mongoose.model('Useronline', UserOnline);
var Allmatch = mongoose.model('Allmatch', AllMatch);

exports.Users = Users;
exports.Match = Match;
exports.Blog = Blog;
exports.Useronline = Useronline;
exports.Allmatch = Allmatch;

