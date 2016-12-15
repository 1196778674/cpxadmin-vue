<template>
	<div class="storelistleft-list">
   <div class="header-add">
    部门列表
    <a class="btn btn-primary" data-toggle="modal" href='#add-list'>添加部门</a>
  </div>
  <!-- model start -->
  <div class="modal fade" id="add-list">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">添加部门</h4>
        </div>
        <div class="modal-body">
          <label>部门名称:</label>
          <input type="text" name="" class="form-control" value="" v-model="storename">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addStore">确定</button>
        </div>
      </div>
    </div>
  </div>
  <!-- model end -->
   <ul>
    <li v-for="item in list">
      <a href="#" v-link="{path: '/home/storelist/' + item.id}" @click="changeType(item.id)">{{item.name}}</a>
    </li >
  </ul>
  </div>
</template>

<script>
export default {

  name: 'storelistleft',

  replace: false,

  data () {
    return {
    	list: '',
      storename: '添加门店',
    };
  },
  created: function(){
    var self = this;
    window.Ajax('../../../../../json/storelistleft.json', null ,'GET', function(res){
      self.list = res;
    });
  },
  methods: {
    // 添加部门
    addStore: function(){
      this.list.push({
          name: this.storename
      });
      this.storename = '';
    },
    // 切换部门
    changeType: function(id){
      // 传递id到父级组件
      this.$dispatch("type", id);
    }
  }
};
</script>