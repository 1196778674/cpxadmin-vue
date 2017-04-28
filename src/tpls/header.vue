<template>
	<header>
     	<nav class="navbar navbar-default navbar-fixed-top logo-top">
	        <div class="container-fluid">
	            <div class="navbar-header">
	                <a class="navbar-brand nav-logo" href="#">
                    <span class="logo"></span>
                    <h3 class="cpx-admin">{{title}}</h3>
                  </a>
	            </div>
	            <div v-if="token" class="collapse navbar-collapse logo-admin">
	                <ul class="nav navbar-nav navbar-right">
	                    <!-- <li class="dropdown">
	                      <a href="#" class="admin-num" aria-haspopup="true" aria-expanded="false">(999)</a>
	                    </li> -->
	                    <li class="dropdown">
	                      <a href="#" class="dropdown-toggle admin-drop" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user}} <span class="caret"></span></a>
	                      <ul class="dropdown-menu">
	                        <li><a data-toggle="modal" href='#layout'>退出</a></li>
	                      </ul>
	                    </li>
	                </ul>
	            </div>
	        </div>
   	   	</nav>
  	</header>
  	<!-- 确认登出 start -->
  	<div class="modal fade tips" id="layout">
  		<div class="modal-dialog">
  			<div class="modal-content">
  				<div class="modal-header">
  					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
  					<h4 class="modal-title">登出</h4>
  				</div>
  				<div class="modal-body">
					确认退出当前用户吗？
  				</div>
  				<div class="modal-footer">
  					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
  					<button type="button" class="btn btn-danger" @click="layout">退出</button>
  				</div>
  			</div>
  		</div>
  	</div>
  	<!-- 确认登出 end -->
</template>

<script>
export default {

  name: 'header',

  data () {
    return {
    	title: '厨品秀商户管理中心',
    	user: $cookie('username'),
    	userid: $cookie('userid'),
      token: $cookie('token')
    };
  },
  created: function(){
  	var token = $cookie('token');
  	if (!token || token == 'undefined') {
  		window.location.href = '#!/login';
  	};
    // 请求省份
    parent.Public.getProvice();
  },
  methods: {
  	layout: function(){
      $('.close').trigger('click');
      $cookie('token', '');
      $cookie('shopId', '');
      $cookie('shop_id', '');
      $cookie('userId', '');
      $cookie('userid', '');
      store.clear();
      window.location.reload();
  	}
  }
};
</script>