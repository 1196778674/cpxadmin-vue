<template>
  <vu-header></vu-header>
  {{ text }}
</template>

<script>
  export default {
    replace: false,
  	data() {
      return {
        text: 'vue'
      }
    },
    components: {
      "vuHeader": require('./tpls/header.vue')
    },
  }
</script>
