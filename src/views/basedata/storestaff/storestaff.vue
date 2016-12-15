<template>
	<div class="store-staff">
    <form class="form-inline" role="form">
      <div class="form-group">
        <input type="text" class="form-control" v-model="subdata" placeholder="编号">
      </div>
      <button type="button" class="btn btn-primary" @click="search">搜索</button>
      <a type="button" class="btn btn-primary" data-toggle="modal" @click="changeModelText" href="#add-eidt-Staff">添加</a>
    </form>
    <table class="table table-hover" v-if="list">
      <thead>
        <tr>
          <th>员工编号</th>
          <th>员工姓名</th>
          <th>手机号码</th>
          <th>所在部门</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{item.num}}</td>
          <td>{{item.name}}</td>
          <td>{{item.tel}}</td>
          <td>{{item.deparement}}</td>
          <td>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="item.status">
                开启
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <a class="btn btn-default" role="button" data-toggle="modal" data-id="{{item.id}}" href="#add-eidt-Staff" @click="edit($event)">{{item.change}}</a>
              <button class="btn btn-danger" role="button" data-id="{{item.id}}" @click="remove($event)">{{item.delete}}</button>
            </div>
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
            <ul class="input-group">
              <input type="text" class="form-control" v-model="addForm.num" value="{{addForm.num}}" placeholder="内容">
              <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" placeholder="内容">
              <input type="text" class="form-control" v-model="addForm.tel" value="{{addForm.tel}}" placeholder="内容">
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addStaff">{{text.btn}}</button>
          </div>
        </div>
      </div>
    </div>
  <!-- 添加、编辑模板 end -->
</template>

<script>
export default {

  name: 'storestaff',

  replace: false,

  data () {
    return {
      subdata: '',
    	list: '',
      text: {
        title: '',
        btn: ''
      },
      addForm: {
        num: '',
        name: '',
        tel: ''
      },
    };
  },
  created: function(){
    this.getList();
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
      self.getList(self.subdata);
    },
    // 获取列表
    getList: function(params){
      var self = this;
      var subdata = !params ? null : {params: params};
      window.Ajax('../../../../json/stafflist.json', subdata, 'GET', function(res){
        self.list = res.list;
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
  }
};
</script>