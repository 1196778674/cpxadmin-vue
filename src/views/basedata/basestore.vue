<template>
	<vu-headtab></vu-headtab>
	<router-view></router-view>
</template>

<script>
export default {

  name: 'store',

  replace: false,

  data () {
    return {

    };
  },
  components: {
    "vuHeadtab": require('../../tpls/headtab.vue')
  },
};
</script>