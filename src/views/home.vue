<template>
	<vu-headtab></vu-headtab>
	<router-view></router-view>
</template>

<script>
export default {

  name: 'home',

  replace: false,

  components: {
    "vuHeadtab": require('../tpls/headtab.vue')
  }
};
</script>