<template>
<section class="admin-main">
 <vu-left url='../../json/left.json' class="col-xs-2 admin-left-menu"></vu-left>
 <vu-right class="col-xs-10 admin-right-main"></vu-right>
</section>
</template>

<script>
export default {

  name: 'setstore',

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