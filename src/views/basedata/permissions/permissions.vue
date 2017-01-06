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
    var self = this;
    var params = {};
    // 请求左侧列表
    parent.Public.Ajax('/auth_department_list', params, 'GET', function(res){
      var leftList = res.data.list;
      self.$broadcast('leftList', leftList);
      self.$broadcast('leftItem', leftList[0].id);
    });
    // 请求顶部列表
    parent.Public.Ajax('/auth_opened_module_list', params, 'GET', function(res){
      var topList = res.data;
      self.$broadcast('topList', topList);
      self.$broadcast('topItem', topList[0].type);
    });
  },
  events: {
    leftItem: function(id){
    	this.$broadcast('leftItem', id);
    },
    topItem: function(id){
    	this.$broadcast('topItem', id);
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