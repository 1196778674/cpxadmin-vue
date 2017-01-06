<template>
  <div class="admin-primary">
    <ul>
      <li v-for="(i,item) in headtop" :class="{'active': isActive == i}" @click="cActive($index)" type="button" class="btn btn-default admin-but" data-toggle="dropdown">
        <a v-if="item.id == '0'" v-link="{path: item.url + '/storelist/0', query:{id: 0}}">{{ item.name }}</a>
        <a v-if="item.id == '3'" v-link="{path: item.url + '/initializeStockInformation', query:{id: 3}}">{{ item.name }}</a>
        <a v-if="item.id == '2'" v-link="{path: item.url + '/classification', query:{id: 2}}">{{ item.name }}</a>
      </li>
    </ul>
 </div>
</template>

<script>
export default {

  name: 'headtab',

  data () {
    return {
    	headtop: '',
      isActive: '0'
    };
  },
  created: function(){
    var self = this;
    var params = {
      shopId: this.$route.query.shopId
    };
    parent.Public.Ajax('/top', params, 'GET', function(res){
      self.headtop = res.data;
    });
    switch (self.$route.name) {
      case 'home':
        self.isActive = 0;
        break;
      case 'warehouse':
        self.isActive = 1;
        break;
      case 'cashier':
        self.isActive = 2;
        break;
    }
  },
  methods: {
    cActive: function(i){
      this.isActive = i;
    }
  },
};
</script>