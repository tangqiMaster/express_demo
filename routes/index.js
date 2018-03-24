var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.download("/images/goods/good_1.jpg");
  	res.render('index', { title: 'Express' });
  	next();
},function(){
});

module.exports = router;
