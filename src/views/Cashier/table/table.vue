<template>
	<div class="store-staff">
    <!-- top start -->
    <vu-top></vu-top>
    <!-- top end -->
    <!-- 列表 start -->
    <vu-list></vu-list>
    <!-- 列表 end -->
    <!-- 页码 start -->
    <vu-pagination showtotal="true"></vu-pagination>
    <!-- 页码 end -->
	</div>
</template>

<script>
export default {

  name: 'table',

  replace: false,

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
    area_id: function(area_id) {
      // 传递type到right子组件
      this.$broadcast('area_id', area_id);
    },
    refresh_area: function() {
        this.$broadcast('refresh_area', 1);
    }
  },

  components: {
    vuTop: require('./tabletop.vue'),
    vuList: require('./tablelist.vue'),
    vuPagination: require('../../../tpls/pagination.vue')
  }
};
</script>