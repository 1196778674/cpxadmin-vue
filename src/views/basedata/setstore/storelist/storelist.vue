<template>
	<div class="store-list">
		<vu-storelistleft class="col-sm-2 col-md-2"></vu-storelistleft>
		<vu-storelistright class="col-sm-10 col-md-10"></vu-storelistright>
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
  	"vuStorelistleft": require('./storelistleft.vue'),
    "vuStorelistright": require('./storelistright.vue')
  }
};
</script>