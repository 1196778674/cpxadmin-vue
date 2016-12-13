<template>
	<div class="store-list-left">
		<ul>
			<li v-for="item in list">
				{{item.name}}
			</li >
		</ul>
	</div>
</template>

<script>
export default {

  name: 'storelistleft',

  replace: false,

  data () {
    return {
    	list: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../../../../json/storelistleft.json', null, 'GET', function(res){
  		self.list = res;
  	});
  },
};
</script>