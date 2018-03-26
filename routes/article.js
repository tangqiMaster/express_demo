var express = require('express');
var router = express.Router();
var article_server = require('../server/article_server.js');

// 获取文章列表
router.post('/get_article_list', function(req, res, next) {

	var request = {
		current_page : req.body.current_page,
		per_page : req.body.per_page
	};
	article_server.get_article_list(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 添加文章
router.post('/add_article', function(req, res, next) {
	var request = {
		username : req.body.username,
		age : req.body.age,
		phone : req.body.phone,
		password : req.body.password,
		create_time : req.body.create_time,
		info : req.body.info
	};
	article_server.add_article(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 删除文章
router.post('/del_article', function(req, res, next) {
	var request = {
		id : req.body.id
	};
	article_server.del_article(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 编辑文章
router.post('/edit_article', function(req, res, next) {
	var request = {
		username : req.body.username,
		age : req.body.age,
		phone : req.body.phone,
		password : req.body.password,
		info : req.body.info,
		id : req.body.id
	}
	article_server.edit_article(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

module.exports = router;
