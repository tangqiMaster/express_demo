var express = require('express');
var router = express.Router();
var article_server = require('../server/article_server.js');
console.log(article_server);

// 获取文章列表
router.post('/get_article_list', function(req, res, next) {

	var request = {
		userName : req.body.userName,
		password : req.body.password,
	};
	article_server.get_article_list(request)
	.then(function(pro_data){
		res.end(pro_data);
	});
});

// 添加文章
router.post('/add_article', function(req, res, next) {
	var response = {
		name : "add_article"
	}
   	res.end(JSON.stringify(response));
});

// 删除文章
router.post('/reduce_article', function(req, res, next) {
	var response = {
		name : "reduce_article"
	}
   	res.end(JSON.stringify(response));
});

// 编辑文章
router.post('/edit_article', function(req, res, next) {
	var response = {
		name : "edit_article"
	}
   	res.end(JSON.stringify(response));
});

module.exports = router;
