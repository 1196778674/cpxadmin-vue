<template>
	<div class="table-responsive">
		<div class="table-allot">
			<vu-materialleft></vu-materialleft>
		</div>
		<div class="register-right">
			<router-view></router-view>
		</div>
  	</div>
</template>

<script>
export default {

  name: 'materialtype',

  data () {
    return {

    };
  },
  events: {
    type: function(type){
      // 传递type到right子组件
      this.$broadcast('type', type);
    }
  },
  components: {
  	"vuMaterialleft": require('./materialleft.vue')
  },
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