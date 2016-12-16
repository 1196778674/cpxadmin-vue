<template>
  <div class="home-container">
    <div class="col-sm-6 col-md-4" v-for='store in stores'>
      <div class="thumbnail">
        <h3 class="title">{{ store.title }}</h3>
        <div class="caption address-tel">
          <ul>
            <li class="col-md-8 col-sm-8 address">{{ store.address }}</li>
            <li class="col-md-8 col-sm-8">{{ store.address1 }}</li>
            <li class="col-md-8 col-sm-8">{{ store.tel }}</li>
          </ul>
        </div>
        <hr class="caption-hr">
        <div class="caption set-status">
          <ul>
            <li class="col-md-8 col-sm-8"><span>门店ID:</span>{{ store.storeid }}</li>
            <li class="col-md-8 col-sm-8"><span>启用时间:</span>{{ store.opentime }}</li>
            <li class="col-md-8 col-sm-8"><span>当前状态:</span>{{ store.status }}</li>
            <li class="col-md-8 col-sm-8" v-if="store.num"><span>下属分店:</span>{{ store.num }}个</li>
            <li class="col-md-8 col-sm-8" v-else>无分店</li>
          </ul>
        </div>
        <div class="checkbox-list">
          <label><input type="checkbox" disabled v-model="store.warehouse">库房系统</label>
          <label><input type="checkbox" disabled v-model="store.money">财务系统</label>
          <label><input type="checkbox" disabled v-model="store.pay">收银系统</label>
          <a v-link="{path:'/home', query:{ storeId: store.id }}" class="btn btn-primary">管理门店</a>
        </div>
      </div>
    </div>
  </div>

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
    this.$http.get('../json/index.json').then(function(res){
      this.stores = res.data.stores;
    });
  }
};
</script>