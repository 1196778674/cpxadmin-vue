var Public = window;

// 定义公共方法
Public.Ajax = function(url, data, method, callback){
	$.ajax({
		url: url,
		type: method,
		dataType: 'json',
		data: data,
		success: function(res){
			callback(res);
		},
		error: function(){
			console.log("error");
		}
	});
};