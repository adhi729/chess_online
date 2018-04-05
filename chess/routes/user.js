var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}


var Adminsonline = [];

/* Authenticate User */
router.get('/auth', function(req, res, next) {
	var found = 1;
	var myres = {isauthenticated: false, userid: "", sessionid: "" };

	if(found == 0) 
	{ 
		myres.isauthenticated = false;
		myres.userid = "random";
		myres.sessionid = "random"; 
	}
	else
	{
		myres.isauthenticated = true;


		// Adminsonline.push({userid: myres.userid, sessionid: myres.sessionid});
		User.Users.find({roll: req.headers['userid']},function (err, founduser){
			if (err) return next(err);
			console.log(founduser);
			if(founduser.length == 0) 
			{
				User.Users.create({roll:req.headers['userid']},function(err,createduser){
					if (err) return next(err);
					myres.userid = createduser._id;
					User.Useronline.create({userid:createduser._id},function(err,onlineuser){
						if (err) return next(err);
						myres.sessionid = onlineuser._id;
						res.json(myres);
					}); 
				});
			}
			else
			{
				myres.userid = founduser[0]._id;
				User.Useronline.find({userid:founduser[0]._id},function(err,onlineuser){
					if (err) return next(err);
					if(onlineuser.length == 0)
					{
						User.Useronline.create({userid:founduser[0]._id},function(err,nowonline){
							if (err) return next(err);
							myres.sessionid = nowonline._id;
							res.json(myres);
						});
					}
					else
					{
						myres.sessionid = onlineuser[0]._id;
						res.json(myres);
					}
				});
			}
		}); 	
	}
	
});

/* Logout User */
router.post('/auth', function(req, res, next) {
	var found = 0,index;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	User.Useronline.find({userid:req.headers['userid']},function(err,onlineuser){
		if (err) return next(err);
		if(onlineuser.length == 0) { return res.status(404).send('Not Found'); }
		User.Useronline.findByIdAndRemove(onlineuser[0]._id, function (err, post) {
			if (err) return next(err);
			var myres = {success: true};
			res.json(myres);
		});
	});
	
});

/* All Blogs */
router.get('/blog', function(req, res, next) {
	
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	User.Useronline.find({userid:req.headers['userid']},function(err,onlineuser){
		if(onlineuser.length == 0) { return res.status(404).send('Not Found'); }
		User.Blog.find(function (err, products) {
			if (err) return next(err);
			var myres = [];
			for( var i=0; i< products.length ; i++)
			{
				myres.push({id: products[i]._id, title: products[i].title, subtitle: products[i].subtitle, stamp: products[i].stamp});
			}
			var jsonret = JSON.stringify(myres);
	      	res.json(jsonret);
		});
	});	
});

/* Single Blog By ID */
router.get('/blog/:id', function(req, res, next) {
	
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	User.Useronline.find({userid:req.headers['userid']},function(err,onlineuser){
		if(onlineuser.length == 0) { return res.status(404).send('Not Found'); }
		User.Blog.findById(req.params.id, function (err, post) {
			if (err) return next(err);
			res.json(post);
		});
	});	
});

/* Display Profile */
router.get('/:id', function(req, res, next) {
	
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	User.Useronline.find({userid:req.headers['userid']},function(err,onlineuser){
		if(onlineuser.length == 0) { return res.status(404).send('Not Found'); }

		User.Users.findById(req.params.id, function (err, post) {
			if (err) return next(err);
			if(post.matches.length > 10)
			  post.matches = post.matches.slice(0,11);
			res.json(post);
		});
	});	
});

/* Leaderboard */
router.get('/leaderboard',function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	User.Useronline.find({userid:req.headers['userid']},function(err,onlineuser){
		if(onlineuser.length == 0) { return res.status(404).send('Not Found'); }
		User.Users.find().sort({ instirating : -1 },function(err,userobj){
		    if (err) return next(err);
		    if(userobj.length == 0) { return res.status(404).send('Not Found'); }
		    if(userobj.length <= 10)
		    {
		    	var jsonret = JSON.stringify(userobj);
				res.json(jsonret);
		    }
		    var usertop = userobj.slice(0,10);
		    User.Users.findById(req.headers['userid'], function (err, post) {
				  if (err) return next(err);
				  usertop.push(post);
				  var jsonret = JSON.stringify(usertop);
				  res.json(jsonret);
		    });
	  	});
	});
});




module.exports = router;