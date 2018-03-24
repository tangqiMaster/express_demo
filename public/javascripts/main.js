$("#regSub").on("click",function(){
	var data = {
		userName : $("#userName").val(),
		password : $("#password").val(),
	};
	$.post("/article/get_article_list",data,function(res){
		console.log(res)
	})
})