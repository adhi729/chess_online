'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminSchema = new Schema({
  userid: {type: String,required : true},
  password: {type: String,required : true}
});

var AdminOnline = new Schema({
	sessionid: {type: String,required : true},
	userid: {type: String,required : true}
});


var Admins = mongoose.model('Admins', AdminSchema);
var Adminonline = mongoose.model('Adminonline', AdminOnline);

exports.Admins = Admins;
exports.Adminonline = Adminonline;

