<template>
	<ul>
		<li v-for="item in list">
			<a href="#" v-link="{path: '/home/permissions/' + item.id + '/' +typeChild}" @click="changeType(item.id)">{{item.name}}
      		</a>
		</li>
	</ul>
</template>

<script>
export default {

  name: 'perleft',

  data () {
    return {
    	list: '',
    	typeChild: ''
    };
  },
  created: function(){
  	this.$http.get('../../../../../json/storelistleft.json', null).then(function(res){
      this.list = res.data;
    });
  },
  events: {
  	typeChild: function(typeChild){
  		this.typeChild = typeChild;
  	}
  },
  methods: {
  	// 切换类别
    changeType: function(id){
      // 传递id到父级组件
      this.$dispatch("type", id);
    }
  }
};
</script>