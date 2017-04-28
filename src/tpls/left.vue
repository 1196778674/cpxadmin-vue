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
        <a v-if="i == 6" href="#" v-link="{path: '/cashier' + item.url + '/set/0'}">{{item.name}}</a>
        <a v-if="i == 7" href="#" v-link="{path: '/cashier' + item.url + '/0'}">{{ item.name }}</a>
        <a v-if="i == 8" href="#" v-link="{path: '/cashier/report/stats_dish'}" @mouseover="showTabItem()" @mouseleave="hideTabItem()">{{ item.name }}</a>
        <a v-else href="#" v-link="{path: '/cashier' + item.url}">{{ item.name }}</a>
      </li>
      <div v-for="(i,item) in left" :class="{'tab-item show': show, 'tab-item': !show}" @mouseover="showTabItem()" @mouseleave="hideTabItem()">
        <ul v-if="i == 8">
          <li v-for="(i,child_item) in item.child" @click="hideTab(i)" :class="{'itemActive': itemActive == i}">
            <a href="#" v-link="{path: '/cashier/report' + child_item.url}">
            {{child_item.name}}</a>
          </li>
        </ul>
      </div>
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
      itemActive: '0',
      show: false,
      leftPathArr: [],
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

    parent.Public.Ajax('/left', params, 'GET', function(res){
      self.left = res.data.list;
      $.each(self.left, function(i, v) {
        self.leftPathArr.push(v.url.split('/')[1]);
      });
      // left active 事件
      var leftPath = self.$route.path.split('?')[0].split('/')[2];
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
      this.itemActive = 0;
      if (i == 8) {
        this.show = true;
      } else {
        this.show = false;
      };
    },
    // 点击item后隐藏tab
    hideTab: function(i){
      this.isActive = 8;
      this.show = false;
      this.itemActive = i;
    },
    // 展示报表中心
    showTabItem: function(){
      if (this.isActive == 8) {
        this.show = true;
      };
    },
    // 隐藏报表中心
    hideTabItem: function(){
      if (this.isActive == 8) {
        this.show = false;
      };
    },
  },
};
</script>
<style lang="css" scoped>
  .tab-item{
    position: absolute;
    left: 162px;
    border: 1px solid #dedede;
    border-left: none;
    background: #fff;
    bottom: 0px;
    z-index: 2;
    border-top: none;
    display: none;
  }
  .tab-item.show{
    display: block;
  }
  .tab-item ul{

  }
  .tab-item ul li{
    height: 35px;
    line-height: 35px;
  }
  .tab-item ul li.itemActive{
    background: #D9ECFC;
  }
  .tab-item ul li a{
    font-size: 14px;
    font-weight: 100;
  }
</style>