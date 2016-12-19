<template>
  <div class="table-responsive">
		<vu-storelistleft  class="table-allot"></vu-storelistleft>
    <router-view class="register-right"></router-view>
  </div>
</template>

<script>
export default {

  name: 'storelist',

  replace: false,

  data () {
    return {

    };
  },
  components: {
  	"vuStorelistleft": require('./storelistleft.vue')
  },
  events: {
    type: function(type){
      // 传递type到right子组件
      this.$broadcast('type', type);
    }
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