<template>
  <div class="admin-menu" :style="{height:leftheight}">
    <ul v-if="type == undefined">
      <li v-for="(i,item) in left" :class="{'classify': isActive == i}" @click="cActive($index)">
        <a v-if="i == 0" href="#" v-link="{path: '/home' + item.url + '/0'}">{{ item.name }}</a>
        <a v-if="i == 3" href="#" v-link="{path: '/home' + item.url + '/0'}">{{ item.name }}</a>
        <a v-if="i == 6" href="#" v-link="{path: '/home' + item.url + '/0/0'}">{{ item.name }}</a>
        <a v-else href="#" v-link="{path: '/home' + item.url}">{{ item.name }}</a>
      </li>
    </ul>
    <ul v-if="type == '0'">
      <li v-for="(i,item) in left" :class="{'classify': isActive == i}" @click="cActive($index)">
        <a v-if="i == 0" href="#" v-link="{path: '/home' + item.url + '/0'}">{{ item.name }}</a>
        <a v-if="i == 3" href="#" v-link="{path: '/home' + item.url + '/0'}">{{ item.name }}</a>
        <a v-if="i == 6" href="#" v-link="{path: '/home' + item.url + '/0/0'}">{{ item.name }}</a>
        <a v-else href="#" v-link="{path: '/home' + item.url}">{{ item.name }}</a>
      </li>
    </ul>
    <ul v-if="type == '3'">
      <li v-for="(i,item) in left" :class="{'classify': isActive == i}" @click="cActive($index)">
        <a href="#" v-link="{path: '/warehouse' + item.url}">{{ item.name }}</a>
      </li>
    </ul>
    <ul v-if="type == '2'">
      <li v-for="(i,item) in left" :class="{'classify': isActive == i}" @click="cActive($index)">
        <a v-if="i == 4" href="#" v-link="{path: '/cashier' + item.url + '/set/0'}">{{item.name}}</a>
        <a v-if="i == 5" href="#" v-link="{path: '/cashier' + item.url + '/0'}">{{ item.name }}</a>
        <a v-else href="#" v-link="{path: '/cashier' + item.url}">{{ item.name }}</a>
      </li>
    </ul>
    <ul v-if="type == '4'">
      <li v-for="(i,item) in left" :class="{'classify': isActive == i}" @click="cActive($index)">
        <a href="#" v-link="{path: '/finance' + item.url}">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

  name: 'left',

  replace: false,

  props: {
    url: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
    	left: '',
      leftheight: '',
      type: '0',
      isActive: '0',
      leftPathArr: []
    };
  },
  created: function(){
    var self = this;
    this.type = !this.$route.query.id ? store('topType') : this.$route.query.id;
    var params = {
      type: this.type
    };
    if (this.$route.query.id) {
      store('topType', this.type);
    };
    if (this.$route.query.shopId) {
      $cookie('shopId', this.$route.query.shopId);
    };
    parent.Public.Ajax('/left', params, 'GET', function(res){
      self.left = res.data.list;
      $.each(self.left, function(i, v) {
        self.leftPathArr.push(v.url.split('/')[1]);
      });
      // left active 事件
      var leftPath = self.$route.path.split('/')[2];
      $.each(self.leftPathArr, function(i, v) {
        if (leftPath == v) {
          self.isActive = i;
        };
      });
    });
    // 左侧高度
    this.leftheight = ($(window).height() - 185) + 'px';
  },
  methods: {
    // active事件
    cActive: function(i){
      this.isActive = i;
    }
  },
};
</script>