<template>
	<div class="register-top">
    	<ul>
    		<li>
    			<a href="#" v-link="{path: '/home/permissions/' + type + '/' + 1}" @click="changeTypes(11)">基础信息</a>
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
    	type: '0'
    };
  },
  created: function(){

  },
  events: {
  	type: function(type){
  		this.type = type;
  	},
  },
  methods: {
  	changeTypes: function(id){
  		this.$dispatch("typeChild", id);
  	}
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