<template>
  <div class="admin-primary">
    <ul>
      <li v-for="(i,item) in headtop" :class="{'active': isActive == item.id}" @click="cActive(item.id)" type="button" class="btn btn-default admin-but">
        <a v-if="item.id == '0'" v-link="{path: item.url + '/storelist/0', query:{id: item.id}}">{{ item.name }}</a>
        <a v-if="item.id == '3'" v-link="{path: item.url + '/initializeStockInformation', query:{id: item.id}}">{{ item.name }}</a>
        <a v-if="item.id == '2'" v-link="{path: item.url + '/classification', query:{id: item.id}}">{{ item.name }}</a>
        <a v-if="item.id > '3'" v-link="{path: item.url, query:{id: item.id}}">{{ item.name }}</a>
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
      isActive: '0',
    };
  },
  created: function(){
    var self = this;
    var params = {};
    parent.Public.Ajax('/top', params, 'GET', function(res){
      self.headtop = res.data;
    });
    switch (self.$route.name) {
      case 'home':
        self.isActive = 0;
        break;
      case 'cashier':
        self.isActive = 2;
        break;
      case 'warehouse':
        self.isActive = 3;
        break;
      case 'finance':
        self.isActive = 4;
        break;
      default:
        self.isActive = 0;
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