<template>
  <div class="table-responsive">
    <div class="main-tit">
        <div class="dishes-group">
          <a class="btn btn-warning list-but" v-link="{path: '/cashier/print/set/0'}">
            打印机分配
          </a>
          <a class="btn btn-warning list-but" v-link="{path: '/cashier/print/list'}">
            打印机列表
          </a>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

  name: 'print',

  replace: false,

  data () {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
.main-tit{
  margin-top: 0px;
}
.table-responsive{
  padding-top: 15px;
}
.table-allot{
  width: 25%;
}
.register-right{
  width: 75%;
}
.list-but{
  line-height: 2;
}
</style>