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
      <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-edit-category" @click='add' data-toggle="dropdown">
        新增分类
      </button>
    </div>
</div>
<div class="table-responsive">
  <table class="table table-operation" v-if="list">
    <thead>
        <tr>
            <th width="2%"></th>
            <th width="10%">分类编号</th>
            <th width="10%">分类名称</th>
            <th width="10%">菜品数量</th>
            <th width="20%">出品部门</th>
            <th width="10%">排序</th>
            <th width="10%">状态</th>
            <th width="24%">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(index, item) in list">
            <td class="sn">{{index + 1}}</td>
            <td>{{item.identifier}}</td>
            <td>{{item.name}}</td>
            <td>{{item.dish_count}}</td>
            <td>{{item.departments_str}}</td>
            <td>
                <a href="javascript:;" class="glyphicon glyphicon-arrow-up icon-top" @click="sort(item.category_id,index+1,1)"></a>
                <a href="javascript:;" class="glyphicon glyphicon-arrow-up" @click="sort(item.category_id,index+1,2)"></a>
                <a href="javascript:;" class="glyphicon glyphicon-arrow-down" @click="sort(item.category_id,index+1,3)"></a>
                <a href="javascript:;" class="glyphicon glyphicon-arrow-down icon-bottom" @click="sort(item.category_id,index+1,4)"></a>
            </td>

            <td>
                <div class="admin-change">
                    <div class="checkbtn" @click="openOrClose(item.category_id, item.enabled)">
                        <span v-if="item.enabled==1" class="admin-open">启用</span>
                        <span v-else>停用</span>
                    </div>
                </div>
                <!--<div class="admin-change">-->
                    <!--<div class="checkbtn" @click="openOrClose(item.user.status)">-->
                      <!--<span v-if="item.user.status" class="admin-open">启用</span>-->
                      <!--<span v-else>停用</span>-->
                    <!--</div>-->
                <!--</div>-->
            </td>
            <td>
                <a class="admin-make" role="button" data-toggle="modal" @click="loadUrl('/cashier/cookbook')">设置菜品</a>
                <a class="admin-make" role="button" data-toggle="modal" href="#add-edit-category" @click="edit(item.category_id)" v-if="item.is_temp != 1">修改信息</a>
                <a class="admin-make" role="button" data-toggle="modal" href="#delete-category" @click="getDeleteId(item.category_id)" v-if="item.is_temp != 1">删除分类</a>
            </td>
        </tr>
    </tbody>
  </table>
</div>

<!-- 添加、编辑模板 start -->
<div class="modal fade" id="add-edit-category" data-backdrop='static'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#add-edit-category" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.title}}</h4>
      </div>
      <div class="modal-body">
        <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>分类名称:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" placeholder="">
            </div>
            <label for="inputEmail3" class="col-sm-2 control-label gower inputs">分类编号:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="addForm.identifier" value="{{addForm.identifier}}" placeholder="">
            </div>
        </div>
        <div class="form-group gower-group tips">
            <p>编号可以不填写，系统自动分配</p>
        </div>
      </div>
      <div class="form-group gower-group in-store">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>所属部门:</label>
          <div class="col-sm-10">
            <!-- <li>
              <label>
                <input type="checkbox" name="" value="" @click='checkedAll($event)'>全选
              </label>
            </li> -->
            <ul>
              <li v-for="(k,v) in addForm.departments">
                <label class="label-check">
                  <input type="checkbox" name="" value="{{v.id}}" data="{{v.name}}" checked="{{v.checked}}">
                  {{v.name}}
                </label>
              </li>
            </ul>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default kind-sure" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary kind-sure" @click="addCategory">{{text.btn}}</button>
      </div>
    </div>
  </div>
</div>
<!-- 添加、编辑模板 end -->
<!-- 删除模板 start -->
<div class="modal fade tips" id="delete-category" data-backdrop='static'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#delete-category" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">{{text.remove}}</h4>
      </div>
      <div class="modal-body">
        是否删除当前记录!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" @click="remove">{{text.remove}}</button>
      </div>
    </div>
  </div>
</div>
<!-- 删除模板 end -->
</template>

<script>
export default {

  name: 'classificationlist',

  data () {
    return {
      modifyId:'',
      subdata: '',
    	list: '',
      text: {
        title: '',
        btn: '',
        remove: '删除'
      },
      addForm: {
        identifier: '',
        name: '',
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
  	//	this.getList(page);
  	}
  },
  methods: {
    // 修改model文案
    add: function(){
      var self = this;
      self.modifyId = '';
      var params = {
        shopId: 129
      };
      parent.Public.Ajax('/department_list', params, 'GET', function(res) {
        self.addForm = {
          identifier: '',
          name: '',
          departments: res.data
        };
      });
      self.text.title = '添加';
      self.text.btn = '添加';
    },
    // 设置菜品
    loadUrl: function(url){
      window.location.href = '#!' + url;
    },
    // 启用或关闭状态
    openOrClose: function(id, enabled){
    	var self = this;
    	var params = {
    		category_id: id,
    		enabled: enabled ? 0 : 1
    	};
    	parent.Public.Ajax('/enable_category', params, 'GET', function(res){
          self.getList();
        });
    },
    // 添加员工
    addCategory: function(){
      var self = this;
      var departments = [];
      $.each($('.label-check input'), function(i, v) {
        if ($(v).prop('checked')) {
          var department = {
            'department_id':v.value,
            'department_name':$(v).attr('data'),
          }
          departments.push(department);
        };
      });

      var params = {
        name: self.addForm.name,
        identifier: self.addForm.identifier,
        departments: JSON.stringify(departments)
      };
      if (self.modifyId!='') {
        params.category_id = self.modifyId;
      }
      if (!params.name) {
        parent.Public.tips.init({content: '请输入分类名称'});
        return;
      };
      if (params.identifier!='' && !/^[1-9]\d*$/.test(params.identifier)) {
        parent.Public.tips.init({content: '分类编号只允许纯数字，长度不超过6位'});
        return;
      };
      if (params.departments.length < 3) {
        parent.Public.tips.init({content: '请选择所属部门'});
        return;
      };
      parent.Public.Ajax('/add_category', params, 'POST', function(res) {
        $('.close').trigger('click');
        parent.Public.Ajax('/category_list',{keyword:self.subdata},'GET', function(res) {
            self.list = res.data;
            store('category_list', res.data);
        });
      });
    },
    // 搜索
    search: function(){
      var self = this;
      self.getList();
    },
    // 获取列表
    getList: function(){
      var self = this;
      var params = {
        keyword: self.subdata,
      };
      parent.Public.Ajax('/category_list', params, 'GET', function(res) {
        //console.log(res.data);
        //res.data.forEach(function(item){
        //  console.log(item);
        //});
        self.list = res.data;
        store('category_list', res.data);
        // self.pagination = res.data.totalPages;
        // self.$dispatch('pagination', self.pagination);
        // self.$dispatch('total', res.data.total);
      });
    },
    // 修改
    edit: function(id) {
      var self = this;
      var category_list = store('category_list');
      //console.log(category_list);
      self.text.title = '编辑';
      self.text.btn = '保存';
      self.modifyId = id;
      $.each(category_list, function(i, v) {
        if (v.category_id == id) {
          self.addForm.identifier = v.identifier;
          self.addForm.name = v.name;

          parent.Public.Ajax('/department_list', {}, 'GET', function(res) {
            var data = res.data;
            for (var i=0;i<data.length;i++) {
              for (var j=0;j<v.departments.length;j++) {
                if (data[i].id==v.departments[j].department_id) {
                  data[i].checked = true;
                  break;
                }
              }
            }

            self.addForm.departments = data;
          });
        };
      });
    },
    // 获取删除id
    getDeleteId: function(id){
      this.deleteId = id;
    },
    // 删除
    remove: function() {
        var self = this;
        var params = {
            category_id: self.deleteId
        };
        parent.Public.Ajax('/del_category', params, 'GET', function(res){
          $('.close').trigger('click');
            parent.Public.Ajax('/category_list',{keyword:self.subdata},'GET', function(res) {
                self.list = res.data;
                store('category_list', res.data);
            });
        });
    },
    sort: function(id, index, type) {
        self = this;
        var weight = 0;
        switch (type) {
            case 1:
                weight = 1;
                break;
            case 2:
                weight = index-1;
                break;
            case 3:
                weight = index+1;
                break;
            case 4:
                weight = self.list.length+1;
                break;
        }
        var self = this;
        var params = {
            category_id: id,
            weight: weight,
            keyword:self.subdata,
        };
        if ((weight == 0 || (index == 1 && type == 1)) && (this.$route.query.page == 1 || !this.$route.query.page)) {
          parent.Public.tips.init({type: 1, content: '已是第一项!'});
          return;
        };
        if (this.list.length == index && (type == 3 || type == 4)) {
          parent.Public.tips.init({type: 1, content: '已是最后一项!'});
          return;
        };
        parent.Public.Ajax('/sort_category', params, 'GET', function(res){
            self.list = res.data;
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
.form-group.tips{
  margin-left: 260px;
}
</style>