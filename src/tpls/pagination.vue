<template>
	<ul class="pagination">
		<li><a href="javascript:;" v-link="{path:url + page}" @click="prevPage">&laquo;</a></li>
		<li v-for="page in pagination"><a href="javascript:;" v-link="{path:url + page.id}" @click="pagition(page.id)">{{page.page}}</a></li >
		<li><a href="javascript:;" v-link="{path:url + page}" @click="nextPage">&raquo;</a></li>
	</ul>

</template>

<script>
export default {

  name: 'pagination',

  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pagination: '',
      page: ''
    }
  },
  events: {
    // 获取页码list
    pagination: function(pagination){
      this.pagination = pagination;
    }
  },
  methods: {
    // 上传当前页码
    pagition: function(page){
      this.$dispatch('page', page);
    },
    // 上一页
    prevPage: function(){
      if (!this.$route.params.id || this.$route.params.id == 1) {
        alert('已经是第一页');
        return false;
      };
      var page = this.$route.params.id - 1;
      this.page = page;
      this.pagition(page);
    },
    // 下一页
    nextPage: function(){
      if (!this.$route.params.id) {
        this.$route.params.id = 1;
      };
      var page = eval(this.$route.params.id) + 1;
      if (this.pagination.length < page) {
        alert('已经是最后一页');
        return false;
      };
      this.page = page;
      this.pagition(page);
    }
  }

};
</script>