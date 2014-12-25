var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.send("开始登陆");
});

module.exports = router;