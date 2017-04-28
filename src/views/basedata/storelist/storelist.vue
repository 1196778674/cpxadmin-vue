<template>
  <div class="table-responsive">
    <div class="table-allot">
        <vu-storelistleft></vu-storelistleft>
    </div>
    <div class="register-right">
        <router-view></router-view>
    </div>
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
      this.$broadcast('type', type);
    },
    title: function(title){
      this.$broadcast('title', title);
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