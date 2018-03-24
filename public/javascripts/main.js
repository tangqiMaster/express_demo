// $("#regSub").on("click",function(){
// 	var data = {
// 		userName : $("#userName").val(),
// 		password : $("#password").val(),
// 	};
// 	$.post("/article/get_article_list",data,function(res){
// 		console.log(res)
// 	})
// })

$(document).ready(function(){ 
	// 启动程序
	init();

	function init(){

		getUserList()
	};


	// 获取用户列表
	function getUserList(){
		var data = {};
		$.post("/article/get_article_list",data,function(res){
			console.log(res)
			if(res.code == 0){
				renderUserList(res.data)
			}else{
				alert(res.msg)
			}
		})
	};


	function renderUserList(data){
		for(var q = 0;q < data.length;q++){
			var tr = $("<tr></tr>");
			var td_username = $("<td></td>").html(data[q].username);
			var td_phone = $("<td></td>").html(data[q].phone);
			var td_password = $("<td></td>").html(data[q].password);
			var td_info = $("<td></td>").html(data[q].info);
			var td_create_time = $("<td></td>").html(data[q].create_time);
			var td_age = $("<td></td>").html(data[q].age);
			var td_id = $("<td></td>").html(data[q].id);
			td_id.appendTo(tr);
			td_username.appendTo(tr);
			td_phone.appendTo(tr);
			td_password.appendTo(tr);
			td_age.appendTo(tr);
			td_create_time.appendTo(tr);
			td_info.appendTo(tr);
			tr.appendTo($("#userTable"))
		}
	}
}); 