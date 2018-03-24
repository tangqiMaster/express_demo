var express = require('express');
var router = express.Router();
var db = require("../Dbt/connection");
var article_dbt = {};

// 获取文章列表
article_dbt.get_article_list = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
		db.query("select * from users",function(err,rows){
	        if(err){
	        	pro_data = {
	        		code : 1001,
	        		data : [],
	        		msg : err
	        	}
	        }else {
	        	pro_data = {
	        		code : 0,
	        		data : rows,
	        		msg : ""
	        	}
	        }
        	resolve(pro_data);
	    });
    });
    return promise;
};


// 添加文章列表
article_dbt.add_article_list = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
	    db.query("insert into users(username,age,phone,password,create_time,info) values('"+username+"','"+ age +"','"+ phone +"','"+ password +"','"+ create_time +"','"+ info +"')",function(err,rows){
	        if(err){
	            res.send("新增失败"+err);
	        }else {
	            res.redirect("/users");
	        }
	    });
    });
    return promise;
};
module.exports = article_dbt;
