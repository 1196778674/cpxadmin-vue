<template>
	<vu-left url="../../json/leftwarehouse.json" class="col-md-2 col-sm-2 left-nav"></vu-left>
	<vu-right class="col-md-10 col-sm-10"></vu-right>
</template>

<script>
export default {

  name: 'warehouse',

  data () {
    return {

    };
  },
  components: {
    "vuLeft": require('../../tpls/left.vue'),
    "vuRight": require('../../tpls/right.vue')
  },
};
</script>