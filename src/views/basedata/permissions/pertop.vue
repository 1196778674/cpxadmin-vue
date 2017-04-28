<template>
	<div class="register-top">
    	<ul>
    		<li v-for="item in list">
    			<a href="#" :class="{active: isActive == item.type}" v-link="{path: '/home/permissions/' + left + '/' + item.type}" @click="changeTypes(item.type)">{{item.name}}</a>
    		</li>
    	</ul>
	</div>
</template>

<script>
export default {

  name: 'pertop',

  data () {
    return {
    	list: '',
    	left: '',
      isActive: ''
    };
  },
  events: {
    topList: function(list){
      this.list = list;
      this.isActive = this.$route.params.typeChild || this.list[0].type;
    },
    leftItem: function(id){
      this.left = id;
    },
    topItem: function(id){
      this.isActive = id;
    },
  },
  methods: {
  	changeTypes: function(id){
  		this.$dispatch("topItem", id);
      this.isActive = id;
  	},
  },
};
</script>

<style lang="css" scoped>
.btn-event{
  position: absolute;
  right: 10px;
  top: 0px;
}
.store-list-right{
  padding: 20px;
}
.store-list-right ul{
  overflow: hidden;
}
.store-list-right ul li{
  float: left;
  margin-right: 15px;
}
</style>