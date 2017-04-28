<template>
  <div class="main-tit parm-tit">
      <ul class="nav nav-tabs parm-tabs">
        <li :class="{'parm-act': isActive == 0}" @click="cActive(0)"><a href="#" v-link="{path:'/cashier/parameter/0'}">数据字典</a></li>
        <li :class="{'parm-act': isActive == 1}" @click="cActive(1)"><a href="#" v-link="{path:'/cashier/parameter/1'}">结账收银</a></li>
        <li :class="{'parm-act': isActive == 2}" @click="cActive(2)"><a href="#" v-link="{path:'/cashier/parameter/2'}">单据参数</a></li>
        <li :class="{'parm-act': isActive == 3}" @click="cActive(3)"><a href="#" v-link="{path:'/cashier/parameter/3'}">菜品设置</a></li>
      </ul>
  </div>
	<vu-list></vu-list>
</template>

<script>
export default {

  name: 'parameter',

  data () {
    return {
      activeList: [0,1,2,3],
      isActive: '0'
    };
  },
  created: function(){
    var activeIndex = this.$route.params.id;
    this.isActive = !activeIndex ? 0 : activeIndex;
  },
  methods: {
    cActive: function(i){
      this.isActive = i;
      this.$broadcast('activeEq', i);
    }
  },
  components: {
    vuList: require('./parameterlist.vue')
  }
};
</script>

<style lang="css" scoped>
</style>