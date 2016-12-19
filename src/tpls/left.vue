<template>
  <div class="admin-menu" :style="{height:leftheight}">
    <ul>
      <li v-for="item in left" :class="{'classify': item.active}" @click="isActive($index)">
        <a href="#" v-link="{path: item.url}">{{ item.name }}</a>
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
      leftheight: ''
    };
  },
  created: function(){
    this.$http.get(this.url).then(function(res){
      this.left = res.data;
    });
    // 左侧高度
    this.leftheight = ($(window).height() - 185) + 'px';
  },
  methods: {
    isActive: function(i){
      $.each(this.left, function(i, val) {
        val.active = false;
      });
      this.left[i].active = true;
    }
  },
};
</script>