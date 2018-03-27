$(document).ready(function(){

	// 关闭添加用户模态框事件
	var closeAddFlag = false;
	var closeEditFlag = false;

	// 用户列表
	var usersList = [];

	// 编辑用户id
	var editId = 0;

	// 分页
	var total = 0;
	var current_page = 1;
	var per_page = 10;

	init();

	// 启动程序
	function init(){
		var data = {
			current_page : current_page,
			per_page : per_page
		}
		getUserList(data);

	};

	// 关闭添加用户模态框
	$('#addUserModal').on('hidden.bs.modal', function (e) {
	  	if(closeAddFlag){
	  		$.message('添加用户成功！');
	  		var data = {
	  			current_page : current_page,
	  			per_page : per_page
	  		};
			getUserList(data);
	  	};
	});

	// 关闭编辑用户模态框
	$('#editUserModal').on('hidden.bs.modal', function (e) {
	  	if(closeEditFlag){
	  		var data = {
	  			current_page : current_page,
	  			per_page : per_page
	  		};
			getUserList(data);
	  	};
	});

	// 添加用户
	$("#addUserBtn").on("click",function(){
		closeAddFlag = false;
		$('#addUserModal').modal({
			backdrop : true,
			keyboard : true,
			show : true,
		})
	});

	// 添加用户请求提交
	$("#addUserSub").on("click",function(){
		var data = {
			username : $("#addUserName").val(),
			age : $("#addAge").val(),
			phone : $("#addPhone").val(),
			password : $("#addPassword").val(),
			create_time : parseInt(new Date().getTime()/1000),
			info : $("#addInfo").val()
		};
		$.post("/article/add_article",data,function(res){
			if(res.code == 0){
				closeAddFlag = true;
				$('#addUserModal').modal('hide');
			}else{
	  			$.message({
	  				message : res.msg,
	  				type:'error'
	  			});
			}
		});
	});

	// 编辑用户
	$("#userTable").on("click",".editBtn",function(){
		editId = $(this).attr("data")
		for(var q = 0;q < usersList.length;q++){
			if(editId == usersList[q].id){
				$("#editUserName").val(usersList[q].username);
				$("#editPhone").val(usersList[q].phone);
				$("#editPassword").val(usersList[q].password);
				$("#editAge").val(usersList[q].age);
				$("#editInfo").val(usersList[q].info);
			}
		};
		$('#editUserModal').modal({
			backdrop : true,
			keyboard : true,
			show : true,
		})
	});

	// 编辑用户请求提交
	$("#editUserSub").on("click",function(){
		var data = {
			id : editId,
			username : $("#editUserName").val(),
			age : $("#editAge").val(),
			phone : $("#editPhone").val(),
			password : $("#editPassword").val(),
			info : $("#editInfo").val()
		};
		$.post("/article/edit_article",data,function(res){
			if(res.code == 0){
				closeEditFlag = true;
				$.message('编辑用户成功！');
				$('#editUserModal').modal('hide');
			}else{
				$.message({
	  				message : res.msg,
	  				type:'error'
	  			});
			}
		});
	});

	// 删除用户
	$("#userTable").on("click",".delBtn",function(){
		var self = this;
		swal({
			title: '',
			text: "确定删除该用户？",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '删除',
			cancelButtonText: '取消',
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false
		}).then(function(isConfirm) {
			if (isConfirm === true) {
				var id = $(self).attr("data");
				var data = {
					id : id
				};
				delUserSub(data);
			} else if (isConfirm === false) {
				$.message({
					message : "已取消删除",
					type : "info"
				})
			} else {
			// Esc, close button or outside click
			// isConfirm is undefined
			}
		})
		
		
	});

	function delUserSub(data){
		$.post("/article/del_article",data,function(res){
			if(res.code == 0){
				$.message({
	  				message : "删除成功！",
	  				type:'success'
	  			});
	  			var data = {
					current_page : current_page,
					per_page : per_page
				};
				getUserList(data);
			}else{
				$.message({
	  				message :res.msg,
	  				type:'error'
	  			});
			}
		});
	};

	// 获取用户列表
	function getUserList(data){
		closeAddFlag = false;
		$.post("/article/get_article_list",data,function(res){
			if(res.code == 0){
				usersList = res.data.data;
				per_page = res.data.per_page;
				total = res.data.total;
				$("#pagination3").pagination({
					currentPage: Number(data.current_page),// 当前页数
					totalPage: getTotal(),// 总页数
					isShow: true,// 是否显示首尾页
					count: 5,// 显示个数
					homePageText: "首页",// 首页文本
					endPageText: "尾页",// 尾页文本
					prevPageText: "上一页",// 上一页文本
					nextPageText: "下一页",// 下一页文本
					callback: function(current) {
						var data = {
							current_page : current,
							per_page : per_page
						};
						getUserList(data);
					}
				});
				renderUserList(usersList)
			}else{
				$.message({
	  				message :res.msg,
	  				type:'error'
	  			});
			}
		})
	};

	function getTotal(){
		var a = parseInt(total/per_page);
		if((total % per_page) > 0){
			a = a + 1
		};
		return a
	}

	// 渲染用户列表
	function renderUserList(data){
		$(".tr_row").remove();
		for(var q = 0;q < data.length;q++){
			var tr = $("<tr class='tr_row'></tr>");
			var td_username = $("<td></td>").html(data[q].username);
			var td_phone = $("<td></td>").html(data[q].phone);
			var td_password = $("<td></td>").html(data[q].password);
			var td_info = $("<td></td>").html(data[q].info);
			var td_create_time = $("<td></td>").html(data[q].create_time);
			var td_age = $("<td></td>").html(data[q].age);
			var td_index = $("<td></td>").html(q + 1);
			var td_op = $("<td></td>").html(
				"<button class='btn btn-success editBtn' data='" + data[q].id + "'>编辑</button><button class='btn btn-danger delBtn' data='" + data[q].id +"'>删除</button>"
				);
			td_index.appendTo(tr);
			td_username.appendTo(tr);
			td_phone.appendTo(tr);
			td_password.appendTo(tr);
			td_age.appendTo(tr);
			td_create_time.appendTo(tr);
			td_info.appendTo(tr);
			td_op.appendTo(tr);
			tr.appendTo($("#userTable"))
		}
	}
}); 