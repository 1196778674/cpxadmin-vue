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
                    <div class="checkbtn" @click="openOrClose(item.status)">
                      <span v-if="item.status" class="admin-open">启用</span>
                      <span v-else>停用</span>
                    </div>
                </div>
            </td>
            <td>
                <a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-staff" @click="edit(item.id)">{{item.change}}</a>
                <a class="admin-make" role="button" data-toggle="modal" href="#delete-staff" @click="getDeleteId(item.id)">{{item.delete}}</a>
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
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>手机号:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
        </div>
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>员工姓名:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;*</span>登录密码:</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
        </div>
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>备注信息:</label>
          <div class="col-sm-10" style="width:79.833333%">
            <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
          </div>
        </div>
      </div>
      <div class="form-group gower-group in-store">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>所属部门:</label>
          <div class="col-sm-10">
            <li>
              <label>
                <input type="checkbox" name="" value="">全选
              </label>
            </li>
            <ul>
              <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" name="" value="">小灰灰
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
<div class="modal fade" id="delete-staff">
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
        num: '',
        name: '',
        tel: '',
        selected: ''
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
    // 修改model文案
    changeModelText: function(){
      this.text.title = '添加';
      this.text.btn = '添加';
      this.addForm = {
        num: '',
        name: '',
        tel: '',
        selected: ''
      };
    },
    // 启用或关闭状态
    openOrClose: function(status){
      console.log(status);
    },
    // 添加员工
    addStaff: function(){
      console.log(this.addForm);
    },
    // 搜索
    search: function(){
      var self = this;
      if (!this.subdata) {
        parent.Public.tips.init({content: '请输入搜索内容'});
        return false;
      };
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
    edit: function(id){
      console.log(id);
      this.text.title = '编辑';
      this.text.btn = '保存';
      this.addForm.num = '100';
      this.addForm.name = '刘飞',
      this.addForm.tel = '15222347690';
      this.addForm.selected = '2';
    },
    // 获取删除id
    getDeleteId: function(id){
      this.deleteId = id;
    },
    // 删除
    remove: function(){
      console.log(this.deleteId);
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