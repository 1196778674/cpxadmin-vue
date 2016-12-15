<template>
	<ul class="pagination">
		<li><a href="javascript:;">&laquo;</a></li>
		<li v-for="page in pagination"><a href="javascript:;" v-link="{path:'/home/storestaff/' + page.id}" @click="pagition(page.id)">{{page.page}}</a></li >
		<li><a href="javascript:;">&raquo;</a></li>
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
      pagination: ''
    }
  },
  events: {
    pagination: function(pagination){
      this.pagination = pagination;
    }
  },
  methods: {
    pagition: function(page){
      this.$dispatch('page', page);
    }
  }

};
</script>