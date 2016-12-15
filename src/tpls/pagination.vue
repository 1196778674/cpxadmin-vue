<template>
	<ul class="pagination">
		<li><a href="javascript:;">&laquo;</a></li>
		<li v-for="page in pagination"><a href="javascript:;" v-link="{path:'/home/storestaff/' + page.id}" @click="pagition">{{page.page}}</a></li >
		<li><a href="javascript:;">&raquo;</a></li>
	</ul>
</template>

<script>
export default {

  name: 'pagination',

  data () {
    return {
    	pagination: ''
    };
  },
  created: function(){
  	console.log(this);
  }
};
</script>