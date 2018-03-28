var express = require('express');
var router = express.Router();
var db = require("../Dbt/connection");
var users_dbt = {};

// 获取用户列表
users_dbt.getUserList = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
		var current_page_start = (req.current_page - 1) * 10;
		var per_page = req.per_page;

		db.query("select count(id) as total from users", function(err, res){
	    	if (err){
	    		pro_data = {
					code : 1001,
					data : [],
					msg : err
				};
		        resolve(pro_data);
	    	}else{
	    		db.query("select * from users limit " + current_page_start + "," + (current_page_start + per_page),function(err,rows){
			        if(err){
			        	pro_data = {
			        		code : 1001,
			        		data : [],
			        		msg : err
			        	}
			        }else {
			        	pro_data = {
			        		code : 0,
			        		data : {
			        			total : res[0].total,
			        			current_page : req.current_page,
			        			per_page : 10,
			        			data : rows
			        		},
			        		msg : ""
			        	};
			        }
		        	resolve(pro_data);
			    });
	    	}
		});

    });
    return promise;
};

// 添加用户列表
users_dbt.addUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
	    db.query("insert into users(username,age,phone,password,create_time,info) values('"+req.username+"','"+ req.age +"','"+ req.phone +"','"+ req.password +"','"+ req.create_time +"','"+ req.info +"')",function(err,rows){
	        if(err){
	            pro_data = {
					code : 1001,
					data : [],
					msg : err
				};
	        }else {
	        	pro_data = {
					code : 0,
					data : [],
					msg : "新增用户成功！"
				};
	        }
        	resolve(pro_data);
	    });
    });
    return promise;
};

// 修改用户列表
users_dbt.editUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
	    db.query("update users set username='" + req.username + "',age='" + req.age +"',phone='" + req.phone +"',password='" + req.password + "',info='" + req.info + "' where id=" + req.id,function(err,rows){
	        if(err){
	            pro_data = {
					code : 1001,
					data : [],
					msg : err
				};
	        }else {
	        	pro_data = {
					code : 0,
					data : [],
					msg : "编辑用户成功！"
				};
	        }
        	resolve(pro_data);
	    });
    });
    return promise;
};

// 删除用户列表
users_dbt.delUser = function(req,callbakc){
	var promise = new Promise(function(resolve, reject){        //做一些异步操作
		var pro_data = null;
	    db.query("delete from users where id=" + req.id,function(err,rows){
	        if(err){
	            pro_data = {
					code : 1001,
					data : [],
					msg : err
				};
	        }else {
	        	pro_data = {
					code : 0,
					data : [],
					msg : "删除用户成功！"
				};
	        }
        	resolve(pro_data);
	    });
    });
    return promise;
};
module.exports = users_dbt;
