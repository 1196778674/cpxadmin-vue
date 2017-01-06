<template>
	<div class="store-staff">
    <!-- 列表 start -->
    <vu-list></vu-list>
    <!-- 列表 end -->
    <!-- 页码 start -->
    <vu-pagination url='/Cashier/cookbook/'></vu-pagination>
    <!-- 页码 end -->
	</div>
</template>

<script>
export default {

  name: 'discount',

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
    vuList: require('./discountlist.vue'),
    vuPagination: require('../../../tpls/pagination.vue')
  }
};
</script>