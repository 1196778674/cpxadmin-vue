<template>
  <h6>打印机分配列表<a data-toggle="modal" href='#changeDepartment' @click='getDepartmentList'>选择部门</a></h6>
  <ul>
    <li v-for="(key, item) in list" @click="leftId(item.department_id, item.departmentName)">
      <a href="#" v-link="{path: '/cashier/print/set/' + item.department_id}">
        <span class="list-tit">{{item.departmentName}}</span>
      </a>
      <div class="admin-change dialog">
        <div class="checkbtn dialog" @click='enableSet(item.department_id, item.enabled)'>
          <span v-if="item.enabled == 1" class="admin-open">启用</span>
          <span v-else>停用</span>
        </div>
      </div>
      <a class="list-edit delete" data-toggle="modal" href='#deleteDepartment-modal' @click="saveId(item.department_id)"></a>
    </li >
  </ul>

  <!-- 添加 start -->
  <div class="modal fade" id="changeDepartment">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">选择部门</h4>
        </div>
        <div class="modal-body">
            <label class="depart" v-for="item in deparlist">
              <input type="checkbox" name="" value="{{item.id}}" v-model="item.select">
              {{item.name}}
            </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click='addDepartment'>确定</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 添加 end -->
  <!-- 删除部门 start -->
  <div class="modal fade tips" id="deleteDepartment-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">删除部门</h4>
        </div>
        <div class="modal-body">
          确认删除该打印机部门!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove">删除</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 删除部门 end -->
</template>

<script>
export default {

  name: 'printleft',

  replace: false,

  data () {
    return {
    	list: '',
      deparlist:'',
      saveid: ''
    };
  },
  created: function(){
    this.getList();
  },
  methods: {
    // 获取列表
    getList: function(){
      var self = this;
      parent.Public.Ajax('/print_set_list',{},'GET',function(res){
        self.list = res.data;
      })
    },
    // 获取选择部门列表
    getDepartmentList: function(){
      var self = this;
      var params = {};
      parent.Public.Ajax('/get_department', params, 'GET', function(res){
        self.deparlist = res.data;
      });
    },
    // 保存id
    saveId: function(id){
      this.saveid = id;
    },
    // 删除部门
    remove: function(){
      var self = this;
      var params = {
        department_id: this.saveid
      };
      parent.Public.Ajax('/del_print_set', params, 'GET', function(res){
        self.getList();
      });
    },
    // 添加部门
    addDepartment: function(){
      var self = this;
      var ids = [];
      $.each(self.deparlist, function(i, v) {
         if (v.select) {
          ids.push(v.id);
         };
      });
      var params = {
        ids: ids
      };
      parent.Public.Ajax('/init_print_set', params, 'POST', function(res){
        self.getList();
      });
    },
    // 更改启用或停用 department_enabled_set
    enableSet: function(id, type){
      var self = this;
      var params = {
        department_id: id,
        enabled: type
      };
      parent.Public.Ajax('/department_enabled_set', params, 'GET', function(res){
        self.getList();
      });
    },
    // 上传id
    leftId: function(id, name){
      this.$dispatch('leftId', id);
      this.$dispatch('leftName', name);
    },

  }
};
</script>
<style lang="css" scoped>
  .list-edit{
    margin-top: -22px;
  }
  .depart{
    margin-right: 10px;
  }
</style>