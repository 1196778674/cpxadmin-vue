<template>
	<ul>
		<li v-for="item in list" :class="{active: isActive == item.id}">
			<a href="#" v-link="{path: '/home/permissions/' + item.id + '/' +top}" @click="changeType(item.id)">{{item.name}}
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
    	top: '',
      isActive: ''
    };
  },
  events: {
    leftList: function(list){
      this.list = list;
    },
    topItem: function(id){
      this.top = id;
      this.isActive = this.$route.params.type || this.list[0].id;
    },
    leftItem: function(id){
      this.isActive = id;
    },
  },
  methods: {
  	// 切换类别
    changeType: function(id){
      this.$dispatch("leftItem", id);
      this.isActive = id;
    }
  }
};
</script>