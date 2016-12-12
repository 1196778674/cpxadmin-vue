<template>
  <vu-header></vu-header>
  <router-view ></router-view>
</template>

<script>
export default {

  name: 'index',

  replace: false,

  components: {
    "vuHeader": require('./tpls/header.vue')
  },
};
</script>