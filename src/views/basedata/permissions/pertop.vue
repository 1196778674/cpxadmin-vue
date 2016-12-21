<template>
	<div class="register-top">
		<button type="button" class="btn btn-primary save">保存</button>
    	<ul>
    		<li>
    			<a href="#" v-link="{path: '/home/permissions/' + type + '/' + 1}" @click="changeTypes(1)">基础信息</a>
    		</li>
    		<li>
    			<a href="#" v-link="{path: '/home/permissions/' + type + '/' + 2}" @click="changeTypes(2)">基础信息</a>
    		</li>
    		<li>
    			<a href="#" v-link="{path: '/home/permissions/' + type + '/' + 3}" @click="changeTypes(3)">基础信息</a>
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
    	type: '0',
      typeChild: '0'
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
.save{
	float: right;
	margin-top: 8px;
	margin-right: 20px;
}
</style>