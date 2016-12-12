<template>
	<div>
		<ul>
			<li v-for="item in left">
				<a href="#" v-link="{path:''}">{{ item.name }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'left',

  replace: false,

  data () {
    return {
    	left: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../json/left.json', null, 'GET', function(res){
  		self.left = res;
  	});
  }
};
</script>