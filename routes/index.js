var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express',name:'lee' });
});

router.get('/reg',function(req,res){
	res.render('reg',{title:'注册页面',layout:'twolayout'});
});

router.get('/list',function(req,res){
	res.render('list',{
		title:'视图',
		items:['marico',1991,'pact']
	});
})

exports.doReg = function(req,res){
	if(req.body["password-repeat"]!=req.body['password']){
		req.session.error="两次输入口令不一致";
		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var newUser = new User({
		name:req.body.username,
		password:password
	});

	User.find(newUser.name,function(err,user){
		if(user){
			req.session.error = "该用户已经存在";
			return res.redirect('/reg');
		}

		newUser.save(function(err){
			if(err){
				req.session.error = err;
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.session.success = '注册成功';
			res.locals.user = newUser;
			res.redirect('/');
		})
	})
}

module.exports = router;
