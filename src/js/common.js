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