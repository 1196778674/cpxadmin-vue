<template>
	<div class="store-list-right">
		<ul>
			<li v-for="item in list">
				<input type="checkbox" name="" value="{{item.id}}" v-model="item.checked">
				{{item.name}}
			</li >
		</ul>
	</div>
</template>

<script>
export default {

  name: 'storelistright',

  replace: false,

  data () {
    return {
    	list: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../../../../json/storelistright.json', null, 'GET', function(res){
  		self.list = res;
  	});
  }
};
</script>