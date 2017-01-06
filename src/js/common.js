exports.domain = function () {
    return 'http://management-api.test.chupinxiu.com/';
}
// tips提示框
exports.tips = {
	init: function(obj){
		var objs = $.extend(true, this.default(), obj);
		// 添加html
		!$('.show-tips-html').length && this.addTipsHtml(objs);
		// 销毁html
		setTimeout(this.removeTipsHtml, objs.hideTime);
	},
	createTipsHtml: function(objs){
		var type = objs.type;
		if (type == 1) {
			var tipsType = 'tips-danger'
		};
		if (type == 2) {
			var tipsType = 'tips-warning'
		};
		if (type == 3) {
			var tipsType = 'tips-success'
		};
		return '<div class="'+objs.htmlClass+'">'+
				'<div class="'+tipsType+' show-tips">'+
				objs.content +
				'</div>' +
				'</div>';
	},
	addTipsHtml: function(objs){
		// 创建html
		var htm = this.createTipsHtml(objs);
		$('body').append(htm);
	},
	removeTipsHtml: function(objs){
		!!$('.show-tips-html').length && $('.show-tips-html').remove();
	},
	default: function(){
		return {
			type: 1,
			content: '提示信息',
			class: 'animated',
			tipsType: 'tips-danger',
			htmlClass: 'show-tips-html',
			hideTime: '2000'
		}
	},
}
// ajax
exports.Ajax = function(url, param, type, callback){
	var url = parent.Public.domain() + url;
	var params = {
		token: $cookie('token'),
		userId: $cookie('userid'),
		shopId: $cookie('shopId'),
		shop_id: $cookie('shopId')
	};
	params = $.extend(true, param, params);

	$.ajax({
		url: url,
		type: type || 'post',
		dataType: 'json',
		data: params || null,
		beforeSend: function(){
			$('body').append('<div class="loading-body"><div class="loading"></div></div>')
		},
		success: function(res){
			$('.loading-body').remove();
			if (res.code == 0) {
				callback(res);
			} else {
				if (res.code != '10000') {
					parent.Public.tips.init({content: res.msg});
				};
			};
		},
		error: function(){
			$('.loading-body').remove();
			parent.Public.tips.init({content: '服务器发烧了，稍后重试'});
		}
	})
}
// 请求省份 缓存本地
exports.getProvice = function(){
	$.ajax({
		url: parent.Public.domain() + '/district_list',
		type: 'GET',
		dataType: 'json',
		data: null,
		success: function(res){
			store('provice', res.data);
		}
	})
}