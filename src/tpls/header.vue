<template>
	<header>
     	<nav class="navbar navbar-default navbar-fixed-top logo-top">
	        <div class="container-fluid">
	            <div class="navbar-header">
	                <a class="navbar-brand nav-logo" href="#"><img :src="logo" height="38" width="35" class="img-responsive"></a><h3 class="cpx-admin">{{title}}</h3>
	            </div>
	            <div class="collapse navbar-collapse logo-admin">
	                <ul class="nav navbar-nav navbar-right">
	                    <li class="dropdown">
	                      <a href="#" class="admin-num" aria-haspopup="true" aria-expanded="false">(999)</a>
	                    </li>
	                    <li class="dropdown">
	                      <a href="#" class="dropdown-toggle admin-drop" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user}} <span class="caret"></span></a>
	                      <ul class="dropdown-menu">
	                        <li><a href="">Shopper</a></li>
	                        <li><a href="">Publisher</a></li>
	                        <li class="dropdown-header">site</li>
	                        <li><a href="">Retailer</a></li>
	                      </ul>
	                    </li>
	                </ul>
	            </div>
	        </div>
   	   	</nav>
  	</header>
</template>

<script>
export default {

  name: 'header',

  data () {
  	this.$http.get('../json/user.json', null).then(function(res){
  		this.user = res.data.name;
  	});
    return {
    	title: '厨品秀商户管理中心',
    	user: self.user,
    	logo: '../src/image/cpx-logo.png'
    };
  }
};
</script>