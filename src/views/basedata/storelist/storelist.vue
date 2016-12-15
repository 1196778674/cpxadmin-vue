<template>
	<div class="store-list">
		<vu-storelistleft class="col-sm-3 col-md-3 storelistleft"></vu-storelistleft>
    <router-view class="col-sm-9 col-md-9 storelistright"></router-view>
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