<template>
	<div class="table-responsive" :style='{height: bodyheight}'>
		<div class="table-allot">
			<div class="per-left">
				<h4>部门列表</h4>
				<vu-perleft></vu-perleft>
			</div>
		</div>
		<div class="register-right">
			<div class="per-top">
				<vu-pertop></vu-pertop>
			</div>
			<div class="per-body">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'permissions',

  replace: false,

  data () {
    return {

    };
  },
  created: function(){
  	this.bodyheight = ($(window).height() - 140) + 'px';
  },
  events: {
    type: function(type){
      	// 传递type到right子组件
      	this.$broadcast('type', type);
    },
    typeChild: function(typeChild){
    	this.$broadcast('typeChild', typeChild);
    }
  },
  components: {
  	vuPerleft: require('./perleft.vue'),
  	vuPertop: require('./pertop.vue'),
  }
};
</script>
<style lang="css" scoped>
.table-responsive{
  padding-top: 15px;
}
.table-allot{
  width: 15%;
}
.register-right{
  width: 85%;
}
</style>