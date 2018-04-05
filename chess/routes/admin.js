var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Admin = require('../models/Admin.js');

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

function changerating(white,black,result)
{
	var ratediff = Math.abs(white.instirating - black.instirating),h,l;
	if(ratediff < 17)
		h = 0.52;
	else if(ratediff < 39)
		h = 0.55;
	else if(ratediff < 61)
		h = 0.58;
	else if(ratediff < 83)
		h = 0.61;
	else if(ratediff < 106)
		h = 0.64;
	else if(ratediff < 129)
		h = 0.67;
	else if(ratediff < 153)
		h = 0.7;
	else if(ratediff < 179)
		h = 0.73;
	else if(ratediff < 215)
		h = 0.77;
	else if(ratediff < 245)
		h = 0.8;
	else if(ratediff < 278)
		h = 0.83;
	else if(ratediff < 315)
		h = 0.86;
	else if(ratediff < 357)
		h = 0.89;
	else if(ratediff < 391)
		h = 0.91;
	else if(ratediff < 456)
		h = 0.94;
	else if(ratediff < 559)
		h = 0.97;
	else
		h = 1;

	if(white.instirating < black.instirating)
		h = 1-h;
	l = 1-h;

		
	if(result == 1)
	{
		white.instirating = white.instirating + 25*(1-h);
		black.instirating = black.instirating - 25*(1-h);
		if(black.instirating < 800)
			black.instirating = 800;
	}
	if(result == 2)
	{
		white.instirating = white.instirating + 25*(0.5-h);
		black.instirating = black.instirating + 25*(0.5-l);
		if(black.instirating < 800)
			black.instirating = 800;
		if(white.instirating < 800)
			white.instirating = 800;		
	}
	if(result == 3)
	{
		white.instirating = white.instirating - 25*h;
		black.instirating = black.instirating + 25*h;
		if(white.instirating < 800)
			white.instirating = 800;			
	}

}


var Admins = [
	{userid : btoa("admin1"), password: btoa("starks")},
	{userid : btoa("admin2"), password: btoa("lannisters")},
	{userid : btoa("admin3"), password: btoa("targaryans")},
	{userid : btoa("admin4"), password: btoa("tyrells")}
];
var Adminsonline = [];

/* Create Blog */
router.post('/blog', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Blog.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Update Blog */
router.put('/blog/:id', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* Delete Blog */
router.delete('/blog/:id', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Blog.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
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

/* Authenticate Admin */
router.get('/auth', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	if(req.headers['ldap'] === btoa("admin1starks") && req.headers['userid'] === btoa("admin1")){found = 1;}
	if(req.headers['ldap'] === btoa("admin2lannisters") && req.headers['userid'] === btoa("admin2")){found = 1;}
	if(req.headers['ldap'] === btoa("admin3targaryans") && req.headers['userid'] === btoa("admin3")){found = 1;}
	if(req.headers['ldap'] === btoa("admin4tyrells") && req.headers['userid'] === btoa("admin4")){found = 1;}

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
		myres.userid = req.headers['userid'];
		myres.sessionid = btoa(atob(req.headers['userid']) + atob(req.headers['userid']));
		Adminsonline.push({userid: myres.userid, sessionid: myres.sessionid}); 	
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


/* Send json */
router.get('/sendratings', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Users.find(function (err, products) {
		if (err) return next(err);
		var myres = [];
		for(var i=0; i < products.length; i++)
		{
			myres.push({roll: products[i].roll, rating: products[i].instirating});
		}
		
		var jsonret = JSON.stringify(myres);
      	res.json(jsonret);
	});
});

/* Get Matches */
router.post('/matches', function(req, res, next) {
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	var fixtures = JSON.parse(req.body.fixtures);
	var j = 0;
	for(var i =0 ;i< fixtures.length ; i++)
	{
		User.Users.find({roll: fixtures[i].white},function(err,white){
			if (err) return next(err);
			User.Users.find({roll: fixtures[i].black},function(err,black){
				if (err) return next(err);
				var newid = white[0]._id + black[0]._id;
				User.Allmatch.create({matchid: newid, type : req.body.type , round : req.body.round}, function(err,match){
					if (err) return next(err);
					User.Match.create({matchid: newid, color : "white" , round : req.body.round},function(err,whitematch){
						if (err) return next(err);
						white[0].matches.push(whitematch);
						User.Match.create({matchid: newid, color : "black" , round : req.body.round},function(err,blackmatch){
							if (err) return next(err);
							black[0].matches.push(blackmatch);
							white[0].save();
							black[0].save();
							j++;
						});	
					});
				});
			});
		});
	}
	while(j!=fixtures.length) {require('deasync').sleep(100);}
});

router.post('/changeresult', function(req, res, next){
	var found = 0;
	if(typeof req.headers['userid'] == 'undefined') { return res.status(404).send('Not Found'); }

	for(var i=0; i< Adminsonline.length; i++)
	{
		if(Adminsonline[i].userid === req.headers['userid']) { found = 1; }
	}
	if(found == 0) { return res.status(404).send('Not Found'); }

	User.Allmatch.find({matchid: req.headers['matchid']}, function(err,match){
		if (err) return next(err);
		match[0].result = req.headers['result'];
		match[0].save();
		var matchid = req.headers['matchid'],result = req.headers['result'];
		var whiteplayer = matchid.slice(0,(matchid.length)/2);
		var blackplayer = matchid.slice((matchid.length)/2,matchid.length);
		User.Users.findById(whiteplayer, function (err, white) {
			User.Users.findById(blackplayer, function (err, black) {
				white.matchesplayed = white.matchesplayed + 1;
				black.matchesplayed = black.matchesplayed + 1;
				for(var i =0 ; i<white.matches.length; i++)
				{
					if(white.matches[i].matchid === matchid)
					{
						white.matches[i].result = result;
						break;	
					}
				}
				for(var i =0 ; i<black.matches.length; i++)
				{
					if(black.matches[i].matchid === matchid)
					{
						black.matches[i].result = result;
						break;	
					}
				}
				if(result == 1)
					white.matcheswon = white.matcheswon + 1;
				else if(result == 3)
					black.matcheswon = black.matcheswon + 1;
				changerating(white,black,result);
				white.save();
				black.save();
				
			});	
		});
	});
});



module.exports = router;



