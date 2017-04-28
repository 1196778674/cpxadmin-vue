<template>
<div class="table-allot">
    <vu-left></vu-left>
</div>
<div class="register-right">
    <router-view></router-view>
</div>
</template>

<script>
export default {

  name: 'set',

  data () {
    return {

    };
  },
  components: {
  	"vuLeft": require('./printleft.vue')
  },
  events: {
    leftId: function(id){
      this.$broadcast('leftId', id);
    },
    leftName: function(name){
      this.$broadcast('leftName', name);
    },
    enabledStatus: function(enabled){
      this.$broadcast('enabledStatus', enabled);
    }
  }
};
</script>

<style lang="css" scoped>
</style>