<template>
	<div class="store-staff">
    <!-- 门店员工列表 start -->
    <vu-list></vu-list>
    <!-- 门店员工列表 end -->
    <!-- 页码 start -->
    <vu-pagination></vu-pagination>
    <!-- 页码 end -->
	</div>
</template>

<script>
export default {

  name: 'storestaff',

  replace: false,

  events: {
    pagination: function(pagination){
      this.$broadcast('pagination', pagination);
    },
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