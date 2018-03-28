var express = require('express');
var router = express.Router();
var users_dbt = require('../Dbt/users_dbt.js');
var users_server = {};

// 获取用户列表
users_server.getUserList = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		users_dbt.getUserList(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};



// 添加用户列表
users_server.addUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		users_dbt.addUser(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

// 编辑用户列表
users_server.editUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		users_dbt.editUser(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

// 删除用户列表
users_server.delUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		users_dbt.delUser(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

module.exports = users_server;
