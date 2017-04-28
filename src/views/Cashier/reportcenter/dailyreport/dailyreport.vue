<template>
	<div class="store-staff">
		<!-- 列表 start -->
	    <vu-list></vu-list>
	    <!-- 列表 end -->
	    <!-- 页码 start -->
	    <vu-pagination showtotal="false"></vu-pagination>
	    <!-- 页码 end -->
	</div>
</template>

<script>
export default {

  name: 'dailyreport',

  replace: false,

  data () {
    return {

    };
  },
  events: {
    // 分发页码list给pagination模板
    pagination: function(pagination){
      this.$broadcast('pagination', pagination);
    },
    // 分发当前页码给list模板
    page: function(page){
      this.$broadcast('page', page);
    },
    total: function(total){
      this.$broadcast('total', total);
    },
  },
  components: {
  	vuList: require('./dailyreportlist.vue'),
    vuPagination: require('../../../../tpls/pagination.vue')
  }
};
</script>

<style lang="css" scoped>
</style>