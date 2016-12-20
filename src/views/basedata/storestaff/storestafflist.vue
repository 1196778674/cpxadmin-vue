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
      <button type="button" class="btn btn-default dishes-but" data-toggle="dropdown">
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
            <th width="20%">手机号码</th>
            <th width="22%">所在部门</th>
            <th width="24%">状态</th>
            <th width="14%">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in list">
            <td>{{item.num}}</td>
            <td>{{item.name}}</td>
            <td>{{item.tel}}</td>
            <td>{{item.deparement}}</td>
            <td>
                <div class="admin-change">
                    <div class="checkbtn">
                      <span v-if="item.status" class="admin-open">启用</span>
                      <span v-else>停用</span>
                    </div>
                </div>
            </td>
            <td>
                <a class="admin-make" role="button" data-toggle="modal" data-id="{{item.id}}" href="#add-eidt-Staff" @click="edit($event)">{{item.change}}</a>
                <a class="admin-make" role="button" data-toggle="modal" data-id="{{item.id}}" href="#delete-Staff" @click="remove($event)">{{item.delete}}</a>
            </td>
        </tr>
    </tbody>
  </table>
</div>

<!-- 添加、编辑模板 start -->
<div class="modal fade" id="add-eidt-Staff">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#add-eidt-Staff" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.title}}</h4>
      </div>
      <div class="modal-body">
        <div class="form-group kind-group">
          <label for="" class="col-sm-3 control-label"><span>*</span>分类名称:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
        </div>
        <div class="form-group kind-group">
          <label for="" class="col-sm-3 control-label"><span>*</span>分类编号:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="addForm.num" value="{{addForm.num}}" id="" placeholder="">
          </div>
        </div>
        <div class="form-group kind-group">
          <label for="" class="col-sm-3 control-label"><span>*</span>出品部门:</label>
          <div class="col-sm-6">
            <select class="form-control" v-model="addForm.selected">
                <option value="0">请选择</option>
                <option value="1">凉菜房</option>
                <option value="2">收   银</option>
                <option value="3">烤鸭房</option>
                <option value="4">酒   吧</option>
                <option value="5">面点房</option>
              </select>
          </div>
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
<div class="modal fade bs-example-modal-sm" id="delete-Staff">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#add-eidt-Staff" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.remove}}</h4>
      </div>
      <div class="modal-body">
        是否删除当前记录!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="addStaff">{{text.remove}}</button>
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
        num: '',
        name: '',
        tel: '',
        selected: '3'
      },
      pagination: ''
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
    // 修改model文案
    changeModelText: function(){
      this.text.title = '添加';
      this.text.btn = '添加';
      this.addForm = {
        num: '',
        name: '',
        tel: ''
      };
    },
    // 添加员工
    addStaff: function(){
      console.log(this.addForm);
    },
    // 搜索
    search: function(){
      var self = this;
      console.log(this.subdata);
      self.getList(self.subdata);
    },
    // 获取列表
    getList: function(params){
      var subdata = !params ? null : {params: params};
      this.$http.get('../../../../json/stafflist.json', subdata).then(function(res){
        this.list = res.data.list;
        this.pagination = res.data.pagination;
        this.$dispatch('pagination', this.pagination);
      });
    },
    // 修改
    edit: function(e){
      var id = $(e.target).data('id');
      this.text.title = '编辑';
      this.text.btn = '保存';
      this.addForm.num = '100';
      this.addForm.name = '刘飞',
      this.addForm.tel = '15222347690';
    },
    // 删除
    remove: function(e){
      var id = $(e.target).data('id');
      console.log(id);
    }
  },
};
</script>