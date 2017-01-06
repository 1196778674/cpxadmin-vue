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
      this.$broadcast('type', type);
    },
    title: function(title){
      this.$broadcast('title', title);
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
  width: 20%;
}
.register-right{
  width: 80%;
}
</style>