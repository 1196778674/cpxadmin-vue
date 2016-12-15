<template>
	<div>
		<ul>
			<li v-for="item in left" :class="{'active': item.active}" @click="isActive($index)">
				<a href="#" v-link="{path: item.url}">{{ item.name }}</a>
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
    var leftType = self.$route.name;
    if (leftType == 'home') {
      window.Ajax('../../json/left.json', null, 'GET', function(res){
        self.left = res;
      });
    };
    if (leftType == 'warehouse') {
      window.Ajax('../../json/leftwarehouse.json', null, 'GET', function(res){
        self.left = res;
      });
    };
  },
  methods: {
    isActive: function(i){
      $.each(this.left, function(i, val) {
        val.active = false;
      });
      this.left[i].active = true;
    }
  },
};
</script>