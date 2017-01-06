<template>
<div class="login-body">
	<form class="form-horizontal cpx-login" role="form">
	  <div class="form-group">
	    <label for="inputEmail3" class="col-sm-3 control-label">登录账号:</label>
	    <div class="col-sm-9">
	      <input type="text" class="form-control" v-model="formData.phone" value="15832190667" id="inputEmail3" placeholder="登录账号">
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="inputPassword3" class="col-sm-3 control-label">登录密码:</label>
	    <div class="col-sm-9">
	      <input type="password" class="form-control" v-model="formData.password" id="inputPassword3" value="123456" placeholder="登录密码">
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-3 col-sm-9">
	      <button type="button" class="btn btn-default" @click='login'>登录</button>
	    </div>
	  </div>
	</form>
</div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
    	formData: {
    		phone: '',
    		password: '',
    		pageType: 1
    	}
    };
  },
  methods: {
  	login: function(){
  		var self = this;
  		parent.Public.Ajax('/login', this.formData, 'POST', function(res){
  			parent.Public.tips.init({type: 3, content: res.msg});
  			var data = res.data;
        if (data != undefined) {
          $cookie('token', data.token, { expires: 7 });
          $cookie('username', data.realName, { expires: 7 });
          $cookie('userid', data.id, { expires: 7 });
          window.location.href = '/';
        };
  		});
  	}
  }
};
</script>