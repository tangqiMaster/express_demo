var express = require('express');
var router = express.Router();
var article_dbt = require('../Dbt/article_dbt.js');
var article_server = {};



function handleData(flag,send_data){
	var data = null;
	if(flag){
		data = {
			code : 0,
			data :send_data,
			msg : ""
		}
	}else{
		data = {
			code : 1001,
			data : {},
			msg : "请求参数错误！"
		}
	};
	return data;
}

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
article_server.add_article_list = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		article_dbt.add_article_list(req)
		.then(function(pro_data){
			resolve(pro_data);
		});
    });
    return promise;
};

module.exports = article_server;
