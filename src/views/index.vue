<template>
	<div class="col-sm-3 col-md-3" v-for='store in stores'>
    	<ul>
      		<li>{{ store.title }}</li>
      		<li>{{ store.address }}</li>
      		<li>{{ store.address1 }}</li>
  		    <li>{{ store.tel }}</li>
  		    <li>{{ store.storeid }}</li>
  		    <li>{{ store.opentime }}</li>
  		    <li>{{ store.status }}</li>
  		    <li>{{ store.warehouse }}</li>
  		    <li>{{ store.money }}</li>
  		    <li>{{ store.pay }}</li>
      		<a href="#" v-link="{path:'/store', query:{ storeId: store.id }}">管理</a>
    	</ul>
  	</div >

</template>

<script>
export default {

  name: 'home',

  replace: false,

  data () {
    return {
      stores: ''
    };
  },
  created: function(){
    var self = this;
    window.Ajax('../json/index.json', null, 'GET', function(res){
      self.stores = res.stores;
    });
  }
};
</script>

<style lang="css" scoped>
</style>