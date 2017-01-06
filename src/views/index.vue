<template>
  <div class="home-container" :style="{height: indexheight}">
    <div class="home-index">
      <div class="col-sm-6 col-md-4" v-for='store in stores'>
        <div class="thumbnail">
          <h3 class="title">{{ store.shopName }}</h3>
          <div class="caption address-tel">
            <ul>
              <li class="col-md-8 col-sm-8 address">{{ store.city }}-{{store.district}}</li>
              <li class="col-md-8 col-sm-8">{{ store.address }}</li>
              <li class="col-md-8 col-sm-8">{{ store.phone }}</li>
            </ul>
          </div>
          <div class="caption-hr">
            <div class="caption set-status">
              <ul>
                <li class="col-md-8 col-sm-8"><span>门店ID:</span>{{ store.shopId }}</li>
                <li class="col-md-8 col-sm-8"><span>启用时间:</span>{{ store.createTime }}</li>
                <li class="col-md-8 col-sm-8"><span>当前状态:</span>{{ store.status }}</li>
                <li class="col-md-8 col-sm-8" v-if="store.shopCount"><span>下属分店:</span>{{ store.shopCount }}个</li>
                <li class="col-md-8 col-sm-8" v-else>无分店</li>
              </ul>
            </div>
            <div class="checkbox-list">
              <label v-for="check in store.moduleList">
                <input type="checkbox" disabled checked v-if="check.modeleStatus == '1'">
                <input type="checkbox" disabled v-else>
                {{check.name}}
              </label>
              <a v-link="{path:'/home/storelist/0', query:{shopId: store.shopId}}" class="btn btn-primary">管理门店</a>
            </div>
          </div>
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
      stores: '',
      indexheight: '',
    };
  },
  created: function(){
    var self = this;
    if (!$cookie('token')) {return;};
    parent.Public.Ajax('/shop_list', {}, 'GET', function(res){
      self.stores = res.data;
    });
    this.indexheight = $(window).height() + 'px';
    store.clear();
  }
};
</script>
<style lang="css" scoped>
.home-container .checkbox-list label input {
  zoom: 1.3;
}
</style>