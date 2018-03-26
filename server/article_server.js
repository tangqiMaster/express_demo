var express = require('express');
var router = express.Router();
var article_dbt = require('../Dbt/article_dbt.js');
var article_server = {};

// 获取文章列表
article_server.get_article_list = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		article_dbt.get_article_list(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};



// 添加文章列表
article_server.add_article = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		article_dbt.add_article(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

// 编辑文章列表
article_server.edit_article = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		article_dbt.edit_article(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

// 删除文章列表
article_server.del_article = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		article_dbt.del_article(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

module.exports = article_server;
