<template>
	<nav class="navbar navbar-default" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand cpx-title" href="#">{{ title }}</a>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ user }}<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="#">个人中心</a></li>
							<li><a href="#">退出</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {

  name: 'header',

  data () {
  	this.$http.get('../json/user.json', null).then(function(res){
  		this.user = res.data.name;
  	});
    return {
    	title: '厨品秀商家大后台',
    	user: self.user
    };
  }
};
</script>