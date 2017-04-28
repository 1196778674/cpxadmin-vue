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
				'<div class="'+tipsType+' animated pulse show-tips">'+
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
	var urls = window.domain() + url;
	var params = {
		token: $cookie('token'),
		userId: $cookie('userid'),
		shopId: $cookie('shopId'),
		shop_id: $cookie('shopId')
	};
	params = $.extend(true, param, params);
	if (!params.token && url != '/login') {
		return;
	};
	$.ajax({
		url: urls,
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
				if (res.code == '10000') {
                    $cookie('token', '');
                    $cookie('shopId', '');
                    $cookie('shop_id', '');
                    $cookie('userId', '');
                    $cookie('userid', '');
                    store.clear();
                    window.location.reload();
				} else if (res.code == 500) {
					parent.Public.tips.init({content: '服务器发烧了，稍后重试'});
				} else {
                    parent.Public.tips.init({content: res.msg});
                }
			};
		},
		error: function(){
			$('.loading-body').remove();
			parent.Public.tips.init({content: '请求失败，稍后重试'});
		}
	})
}
// 请求省份 缓存本地
exports.getProvice = function(){
	var params = {
		token: $cookie('token'),
		userId: $cookie('userid'),
		shopId: $cookie('shopId'),
		shop_id: $cookie('shopId')
	};
	$.ajax({
		url: window.domain() + '/district_list',
		type: 'GET',
		dataType: 'json',
		data: params,
		success: function(res){
			store('provice', res.data);
		}
	})
}
// 获取当前时间
exports.getStartToNow = function() {
	var first, today, currentdate;
    var date = new Date(), seperator = "-", year = date.getFullYear(), month = date.getMonth() + 1, strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    first = year + seperator + month + seperator + '01';
    today = year + seperator + month + seperator + strDate;
    currentdate = first + '至' + today;

    return currentdate;
}
// 导出表单
exports.exportFn = function(excel_type){
	var exportUrl = window.domain() + '/export_report?shop_id=' + $cookie('shopId') + '&excel_type=' + excel_type + '&token=' + $cookie('token');
	window.open(exportUrl);
}
