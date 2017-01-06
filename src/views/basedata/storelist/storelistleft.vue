<template>
  <h6>部门列表<a data-toggle="modal" href='#addStore' @click="saveOptionId(0, 'add')">添加部门</a></h6>
  <ul>
    <li v-for="(key, item) in list">
      <a href="#" v-link="{path: '/home/storelist/' + item.id}" @click="changeType(item.id, item.name)">
        <span class="list-tit">{{item.name}}</span>
      </a>
      <a v-if="item.status == 2" class="list-edit delete" data-toggle="modal" href='#deleteDepartment-modal' @click="saveOptionId(item.id)"></a>
      <a v-if="item.status == 2" class="list-del edit" data-toggle="modal" href='#addStore' @click="saveOptionId(item.id, 'edit', item.name)"></a>
    </li >
  </ul>

  <!-- 添加部门 start -->
  <div class="modal fade" id="addStore">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">{{add_edit_title}}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-3 control-label">部门名称:</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" id="" v-model="storename" placeholder="" value="">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click='addEditDepartment'>{{add_edit_btn}}</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 添加部门 end -->
  <!-- 删除部门 start -->
  <div class="modal fade tips" id="deleteDepartment-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">删除部门</h4>
        </div>
        <div class="modal-body">
          确认删除该部门!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteDepartment()">删除</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 删除部门 end -->
</template>

<script>
export default {

  name: 'storelistleft',

  replace: false,

  data () {
    return {
    	list: '',
      storename: '添加门店',
      add_edit_title: '添加部门',
      add_edit_btn: '添加',
      newList: []
    };
  },
  created: function(){
    this.getList();
  },
  methods: {
    // 获取部门列表
    getList: function(){
      var self = this;
      parent.Public.Ajax('/department_list', {}, 'GET', function(res){
        self.list = res.data;
      });
    },
    // 切换部门
    changeType: function(id, title){
      // 传递id到父级组件
      this.$dispatch("type", id);
      this.$dispatch("title", title);
    },
    // 保存当前操作id
    saveOptionId: function(id,type,name){
      this.optionId = !id ? '' : id;
      console.log(this.optionId);
      if (type == 'edit') {
        this.add_edit_title = '编辑部门',
        this.add_edit_btn = '保存',
        this.storename = name
      } else {
        this.add_edit_title = '添加部门',
        this.add_edit_btn = '添加',
        this.storename = ''
      };
    },
    // 添加、编辑部门
    addEditDepartment: function(){
      var self = this;
      var params = {
        deptId: self.optionId,
        name: self.storename,
      }
      parent.Public.Ajax('/operation_department', params, 'GET', function(res){
        self.list = res.data.deptlist;
        self.storename = '';
      });
    },
    // 删除部门
    deleteDepartment: function(){
      var self = this;
      parent.Public.Ajax('/del_department', {deptId: this.optionId}, 'GET', function(res){
        if (!res.data) {
          parent.Public.tips.init({content: res.msg});
          return;
        };
        self.getList();
      });
    }
  }
};
</script>