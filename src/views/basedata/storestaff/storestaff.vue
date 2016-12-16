<template>
<div class="alert alert-success" role="alert">...</div>
	<div class="store-staff">
    <!-- 门店员工列表 start -->
    <vu-list></vu-list>
    <!-- 门店员工列表 end -->
    <!-- 页码 start -->
    <vu-pagination url='/home/storestaff/'></vu-pagination>
    <!-- 页码 end -->
	</div>
</template>

<script>
export default {

  name: 'storestaff',

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
    vuList: require('./storestafflist.vue'),
    vuPagination: require('../../../tpls/pagination.vue')
  }
};
</script>