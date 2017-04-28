window.domain = function () {
	var url = window.location.href;
	if (url.indexOf('staging') > 0) {
		return 'http://api.houtai.staging.chupinxiu.com/';
	} else {
		return 'http://api.houtai.chupinxiu.com/'
	};
}