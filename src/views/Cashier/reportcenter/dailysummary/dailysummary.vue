<template>
	<div class="store-staff">
		<!-- 列表 start -->
	    <vu-list></vu-list>
	    <!-- 列表 end -->
	</div>
</template>

<script>
export default {

  name: 'dailysummary',

  replace: false,

  data () {
    return {

    };
  },
  components: {
  	vuList: require('./dailysummarylist.vue')
  }
};
</script>

<style lang="css" scoped>
</style>