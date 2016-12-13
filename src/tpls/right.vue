<template>
<div v-if="type == 'department'">
<router-view></router-view>
</div>
<div v-if="type == '2'">
{{type}}
</div>
</template>

<script>
export default {

  name: 'right',

  replace: false,

  data () {
    return {
    	type: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../json/righttype.json', null, 'GET', function(res){
  		self.type = res.type;
  	});
  },
};
</script>