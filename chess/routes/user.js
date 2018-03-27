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
			if(!founduser) 
			{
				var j = 0;
				User.Users.create({roll:username},function(err,createduser){
					if (err) return next(err);
					myres.userid = createduser._id;
					User.Useronline.create({userid:createduser._id},function(err,onlineuser){
						if (err) return next(err);
						myres.sessionid = onlineuser._id;
						j = 1;
					}); 
				});
				while(j!=1){require('deasync').sleep(1);}
			}
			else
			{
				myres.userid = founduser._id;
				User.Useronline.find({userid:founduser._id},function(err,onlineuser){
					if (err) return next(err);
					if(!onlineuser)
					{
						User.Useronline.create({userid:founduser._id},function(err,nowonline){
							if (err) return next(err);
							myres.sessionid = nowonline._id;
						});
					}
					else
					{
						myres.sessionid = onlineuser._id;
					}
				});
			}
		}); 	
	}
	res.json(myres);
});

/* Logout Admin */
router.post('/auth', function(req, res, next) {
	var found = 0,index;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; index = i; break; }
	}
	var myres = {success: true};
	if(found == 0) { return res.status(404).send('Not Found'); }
	else { Adminsonline.splice(index,1); return res.json(myres);}
});

/* All Blogs */
router.get('/blog', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

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

/* Single Blog By ID */
router.get('/blog/:id', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Blog.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Display Profile */
router.get('/:id', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Users.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		if(post.matches.length > 10)
		  post.matches = post.matches.slice(0,11);
		res.json(post);
	});
});

/* Leaderboard */
router.get('/leaderboard',function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Users.find().sort({ instirating : -1 },function(err,userobj){
	    if (err) return next(err);
	    if(!userobj) { return res.status(404).send('Not Found'); }
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




module.exports = router;