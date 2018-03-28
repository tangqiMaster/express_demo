var express = require('express');
var router = express.Router();
var users_server = require('../server/users_server.js');

// 获取员工列表
router.post('/getUserList', function(req, res, next) {

	var request = {
		current_page : req.body.current_page,
		per_page : req.body.per_page
	};
	users_server.getUserList(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 添加员工
router.post('/addUser', function(req, res, next) {
	var request = {
		username : req.body.username,
		age : req.body.age,
		phone : req.body.phone,
		password : req.body.password,
		create_time : req.body.create_time,
		info : req.body.info
	};
	users_server.addUser(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 删除员工
router.post('/delUser', function(req, res, next) {
	var request = {
		id : req.body.id
	};
	users_server.delUser(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

// 编辑员工
router.post('/editUser', function(req, res, next) {
	var request = {
		username : req.body.username,
		age : req.body.age,
		phone : req.body.phone,
		password : req.body.password,
		info : req.body.info,
		id : req.body.id
	}
	users_server.editUser(request)
	.then(function(pro_data){
		res.send(pro_data);
	})
});

module.exports = router;
