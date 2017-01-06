<template>
<div class="main-tit">
    <form class="form-inline search-num" role="form">
      <div class="form-group">
        <input type="email" class="form-control admin-cast" v-model="subdata" placeholder="请输入分类编号/首字母、名称">
        <button type="button" class="btn btn-default dishes-but" data-toggle="dropdown" @click="search">
          搜索
        </button>
      </div>
    </form>
    <div class="btn-group dishes-group">
      <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-eidt-staff" @click='changeModelText' data-toggle="dropdown">
        新增员工
      </button>
    </div>
</div>
<div class="table-responsive">
  <table class="table table-operation" v-if="list">
    <thead>
        <tr>
            <th width="10%">员工编号</th>
            <th width="10%">员工姓名</th>
            <th width="24%">手机号码</th>
            <th width="32%">所在部门</th>
            <!-- <th width="24%">状态</th> -->
            <th width="24%">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in list">
            <td>{{item.identifier}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.user.phone}}</td>
            <td>{{item.departments}}</td>
            <!-- <td>
                <div class="admin-change">
                    <div class="checkbtn" @click="openOrClose(item.user.status)">
                      <span v-if="item.user.status" class="admin-open">启用</span>
                      <span v-else>停用</span>
                    </div>
                </div>
            </td> -->
            <td>
                <a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-staff" @click="edit(item.userId)">修改信息</a>
                <a class="admin-make" role="button" data-toggle="modal" href="#delete-staff" @click="getDeleteId(item.id)">删除员工</a>
            </td>
        </tr>
    </tbody>
  </table>
</div>

<!-- 添加、编辑模板 start -->
<div class="modal fade" id="add-eidt-staff">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#add-eidt-Staff" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.title}}</h4>
      </div>
      <div class="modal-body">
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>员工编号:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.identifier" value="{{addForm.identifier}}" id="" placeholder="">
          </div>
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>手机号:</label>
          <div class="col-sm-4">
            <input type="tel" class="form-control" v-model="addForm.phone" placeholder="">
          </div>
        </div>
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>员工姓名:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.nickname" value="{{addForm.nickname}}" id="" placeholder="">
          </div>
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;*</span>登录密码:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.password" value="{{addForm.password}}" id="" placeholder="">
          </div>
        </div>
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">备注信息:</label>
          <div class="col-sm-10" style="width:79.833333%">
            <input type="text" class="form-control" v-model="addForm.comment" value="{{addForm.comment}}" id="" placeholder="">
          </div>
        </div>
      </div>
      <div class="form-group gower-group in-store">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>所属部门:</label>
          <div class="col-sm-10">
            <!-- <li>
              <label>
                <input type="checkbox" name="" value="">全选
              </label>
            </li> -->
            <ul>
              <li v-for="(k,v) in addForm.departments">
                <label class="label-check">
                  <input type="checkbox" name="" value="{{v.id}}" v-if="v.statusType == 1" checked="checked">
                  <input v-else type="checkbox" name="" value="{{v.id}}">
                  {{v.name}}
                </label>
              </li>
            </ul>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default kind-sure" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary kind-sure" data-dismiss="modal" @click="addStaff">{{text.btn}}</button>
      </div>
    </div>
  </div>
</div>
<!-- 添加、编辑模板 end -->
<!-- 删除模板 start -->
<div class="modal fade tips" id="delete-staff">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#delete-staff" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.remove}}</h4>
      </div>
      <div class="modal-body">
        是否删除当前记录!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove">{{text.remove}}</button>
      </div>
    </div>
  </div>
</div>
<!-- 删除模板 end -->
</template>

<script>
export default {

  name: 'storestafflist',

  data () {
    return {
      subdata: '',
    	list: '',
      text: {
        title: '',
        btn: '',
        remove: '删除'
      },
      addForm: {
        identifier: '',
        phone: '',
        nickname: '',
        password: '',
        comment: '',
        departments: ''
      },
      // 页码
      pagination: '',
      // delete id
      deleteId: ''
    };
  },
  created: function(){
    this.getList();
  },
  events: {
    // 获取当前页码
  	page: function(page){
  		this.getList(page);
  	}
  },
  methods: {
    // 修改model文案/获取部门列表
    changeModelText: function(){
      var self = this;
      var params = {};
      parent.Public.Ajax('/department_list', params, 'GET', function(res){
        self.addForm = {
          identifier: '',
          phone: '',
          nickname: '',
          password: '',
          comment: '',
          departments: res.data
        };
      });
      self.text.title = '添加';
      self.text.btn = '添加';
    },
    // 启用或关闭状态
    openOrClose: function(status){
      console.log(status);
    },
    // 添加员工
    addStaff: function(){
      var self = this;
      var departments = [];
      $.each($('.label-check input'), function(i, v) {
        if ($(v).prop('checked')) {
          departments.push(v.value);
        };
      });
      var params = {
        phone: self.addForm.phone,
        password: self.addForm.password,
        nickname: self.addForm.nickname,
        identifier: self.addForm.identifier,
        departments: departments
      };
      if (self.text.title == '编辑') {
        params = $.extend(true, params, {isEdit: 1});
      } else {
        params = $.extend(true, params, {isEdit: 0});
      };
      parent.Public.Ajax('/add_shop_user', params, 'GET', function(res){
          self.list = res.data.list;
      });
    },
    // 搜索
    search: function(){
      var self = this;
      console.log(this.subdata);
      self.getList(self.subdata);
    },
    // 获取列表
    getList: function(page){
      var self = this;
      var params = {
        currentPage: page
      };
      parent.Public.Ajax('/shop_user_list', params, 'GET', function(res){
        self.list = res.data.list;
        // store('shop_user_list', res.data.list);
        self.pagination = res.data.totalPages;
        self.$dispatch('pagination', self.pagination);
      });
    },
    // 修改
    edit: function(id){
      var self = this;
      var params = {
        edituserId: id
      };
      // var user_list = store('shop_user_list');
      parent.Public.Ajax('/shop_user_info', params, 'GET', function(res){
        var datas = res.data;
        self.text.title = '编辑';
        self.text.btn = '保存';
        self.addForm.identifier = datas.identifier,
        self.addForm.phone = datas.phone,
        self.addForm.nickname = datas.nickname
        self.addForm.password = '',
        self.addForm.comment = datas.comment,
        self.addForm.departments = datas.deptList
      });
    },
    // 获取删除id
    getDeleteId: function(id){
      this.deleteId = id;
    },
    // 删除
    remove: function(){
      var self = this;
      var params = {
        deluserId: self.deleteId
      };
      parent.Public.Ajax('/del_shop_user', params, 'GET', function(res){
        self.list = res.data.list;
      });
    }
  },
};
</script>

<style lang="css" scoped>
.in-store{
  height: auto;
  min-height: 32px;
  overflow: hidden;
}
.in-store .col-sm-10{
  width:79.833333%;
  padding-top: 8px;
}
.in-store .col-sm-10 ul{
  overflow: hidden;
}
.in-store .col-sm-10 ul li{
  float: left;
  margin-right: 10px;
}
.in-store .col-sm-10 input[type=checkbox]{
  margin-right: 5px;
}
</style>