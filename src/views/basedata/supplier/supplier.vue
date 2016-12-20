<template>
	<div class="cpx-supplier">
		<!-- 供应商列表 start -->
		<vu-list></vu-list>
		<!-- 供应商列表 end -->
		<!-- 分页 start -->
		<vu-pagination url="/home/supplier/"></vu-pagination>
		<!-- 分页 end -->
	</div>
</template>

<script>
export default {

  name: 'supplier',

  replace: false,

  events: {
    // 分发页码list给pagination模板
    pagination: function(pagination){
      this.$broadcast('pagination', pagination);
    },
    // 分发当前页码给list模板
    page: function(page){
      this.$broadcast('page', page);
    }
  },

  components: {
  	vuList: require('./supplierlist.vue'),
    vuPagination: require('../../../tpls/pagination.vue')
  }
};
</script>