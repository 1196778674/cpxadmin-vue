<template>
	<div class="header-top">
		<div class="header-left col-sm-2 col-md-2">功能菜单</div>
		<div class="header-right col-sm-10 col-md-10">
			<ul>
				<li v-for="item in headtop">
					<a href="#" :class="{'active': item.active}" v-link="{path:''}">{{ item.name }}</a>
				</li >
			</ul>
		</div>
	</div>
</template>

<script>
export default {

  name: 'headtab',

  data () {
    return {
    	headtop: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../json/headtop.json', null, 'GET', function(res){
  		self.headtop = res;
  	});
  },
};
</script>