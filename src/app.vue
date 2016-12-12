<template>
  <vu-header></vu-header>

  <div style="float: left" v-for='store in stores'>
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
      <button type="button" value = "{{ store.id }}" class="btn btn-default">button</button>
    </ul>
  </div >
</template>

<script>
export default {

  name: 'index',

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
  },
  components: {
    "vuHeader": require('./tpls/header.vue')
  },
};
</script>