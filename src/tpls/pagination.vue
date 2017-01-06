<template>
	<ul class="pagination" v-if="pagination.length > 1">
		<li><a href="javascript:;" v-link="{path:urls, query:{page: page}}" @click="prevPage">&laquo;</a></li>
		<li v-for="(i,page) in pagination"><a href="javascript:;" :class="{active: isActive == i+1}" v-link="{path:urls, query:{page: page.id}}" @click="pagition(page.id)">{{page.page}}</a></li >
		<li><a href="javascript:;" v-link="{path:urls, query:{page: page}}" @click="nextPage">&raquo;</a></li>
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
      urls: '',
      pagination: '',
      page: '',
      isActive: this.$route.query.page || 1
    }
  },
  events: {
    // 获取页码list
    pagination: function(pagination){
      var paginations = [];
      for (var i = 1; i < pagination + 1; i++) {
        paginations.push({id: i, page: i});
      };
      this.pagination = paginations;
      this.isActive = this.$route.query.page || 1;
      this.urls = window.location.href.split('!')[1].split('?')[0];
    }
  },
  created: function(){
    this.urls = window.location.href.split('!')[1].split('?')[0];
  },
  methods: {
    // 上传当前页码
    pagition: function(page){
      this.$dispatch('page', page);
      this.isActive = page;
    },
    // 上一页
    prevPage: function(){
      if (!this.$route.query.page || this.$route.query.page == 1) {
        parent.Public.tips.init({content: '已经是第一页'});
        return false;
      };
      var page = this.$route.query.page - 1;
      this.page = page;
      this.isActive = page;
      this.pagition(page);
    },
    // 下一页
    nextPage: function(){
      if (!this.$route.query.page) {
        this.$route.query.page = 1;
      };
      var page = eval(this.$route.query.page) + 1;
      if (this.pagination.length < page) {
        parent.Public.tips.init({content: '已经是最后一页'});
        return false;
      };
      this.page = page;
      this.isActive = page;
      this.pagition(page);
    }
  }

};
</script>

<style lang="css" scoped>
.pagination{
  float: right;
}
.active{
  background: #1d9ee5;
  color: #fafafa;
  border: 1px solid #1d9ee5;
}
.pagination > li > a:hover{
  background: #1d9ee5;
  color: #fafafa;
  border: 1px solid #1d9ee5;
}
</style>