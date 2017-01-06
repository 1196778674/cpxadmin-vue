<template>
    <div class="main-tit">
        <form class="form-inline search-num" role="form">
          <div class="form-group">
            <input type="email" class="form-control admin-cast" v-model="subdata" placeholder="请输入菜品编号/首字母、名称">
            <button type="button" class="btn btn-default dishes-but" data-toggle="dropdown" @click="search">
              搜索
            </button>
          </div>
        </form>
        <div class="sel-group">
            <label for="" class="sel-kind">菜品类别:</label>
            <select class="form-control sel-add" v-model="selectCid" >
                <option value="">全部</option>
                <option v-for="item in category_list" value="{{item.category_id}}" >{{item.name}}</option>
            </select>
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">出品部门:</label>
            <select class="form-control sel-add" v-model="selectDid">
                <option value="">全部</option>
                <option v-for="item in department_list" value="{{item.id}}">{{item.name}}</option>
            </select>
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">状态:</label>
            <select class="form-control sel-add" v-model="selectEnable">
                <option value="">全部</option>
                <option value="1" >启用</option>
                <option value="0" >禁用</option>
            </select>
        </div>
        <div class="btn-group dishes-group">
            <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-eidt-dish" @click='add'>
                新增菜品
            </button>
          <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href='#uploadDown'>
            菜品导入
          </button>
          <a class="btn btn-default dishes-but" href='{{errorExportUrl}}' target="_blank">
              错误信息导出
          </a>
        </div>
    </div>
    <div class="table-responsive">
      <table class="table table-operation" v-if="list">
        <thead>
            <tr>
                <th width="10%">菜品编号</th>
                <th width="10%">菜品名称</th>
                <th width="10%">菜品类别</th>
                <th width="10%">出品部门</th>
                <th width="10%">规格单价</th>
                <th width="12%">打折</th>
                <th width="12%" v-if="selectCid && doSearch">排序</th>
                <th width="10%">状态</th>
                <th width="24%">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(index,item) in list">
                <td>{{item.identifier}}</td>
                <td>{{item.name}}</td>
                <td>{{item.category_name}}</td>
                <td>{{item.department_name}}</td>
                <td>{{item.norms_str}}</td>
                <td>
                    <a v-if="item.rebated==0" class="glyphicon glyphicon-remove"></a>
                    <a v-if="item.rebated>0" class="glyphicon glyphicon-ok" ></a>
                </td>
                <td v-if="selectCid && doSearch">
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up icon-top" @click="sort(item.dish_id,index+1,1)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up" @click="sort(item.dish_id,index+1,2)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down" @click="sort(item.dish_id,index+1,3)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down icon-bottom" @click="sort(item.dish_id,index+1,4)"></a>
                </td>
                <td>
                    <div class="admin-change">
                        <div class="checkbtn" @click="openOrClose(item.dish_id, $event)">
                          <span v-if="item.enabled==1" class="admin-open">启用</span>
                          <span v-else>停用</span>
                        </div>
                    </div>
                </td>
                <td>
                    <a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-dish" @click="edit(item.dish_id)">修改信息</a>
                    <a class="admin-make" role="button" data-toggle="modal" href="#delete-dish" @click="setDeleteId(item.dish_id)">删除菜品</a>
                </td>
            </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加、编辑模板 start -->
    <div class="modal fade" id="add-eidt-dish">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" href="#add-eidt-Staff" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">{{text.title}}菜品</h4>
          </div>
          <div class="modal-body">
            <div class="form-group gower-group">
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>菜品类别:</label>
              <div class="col-sm-4">
                <select name="" class="form-control" v-model="addForm.category_id">
                    <option value="-1">请选择</option>
                    <option v-for="item in category_list" value="{{item.category_id}}" >{{item.name}}</option>
                </select>
              </div>
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;*</span>出品部门:</label>
              <div class="col-sm-4">
                <select name="" class="form-control" v-model="addForm.department_id">
                    <option value="-1">请选择</option>
                    <option v-for="item in department_list" value="{{item.id}}" >{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="form-group gower-group">
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>菜品编号:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" v-model="addForm.identifier" value="{{addForm.identifier}}" placeholder="">
              </div>
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;*</span>菜品名称:</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" placeholder="">
              </div>
            </div>
            <div class="form-group gower-group">
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>启用状态:</label>
              <div class="col-sm-10">
                <div class="admin-change dialog">
                  <div class="checkbtn dialog" @click="changeEnable(1, $event)">
                      <span v-if="addForm.enabled==1" class="admin-open">启用</span>
                      <span v-else>停用</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group gower-group">
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>参与打折:</label>
              <div class="col-sm-10">
                <div class="admin-change dialog">
                  <div class="checkbtn dialog" @click="changeEnable(2, $event)">
                      <span v-if="addForm.rebated==1" class="admin-open">启用</span>
                      <span v-else>停用</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group gower-group">
              <label for="inputEmail3" class="col-sm-2 control-label gower inputs">
                <input type="checkbox" name="" value="" v-model="addForm.allow_decimal">
                允许菜品数量输入小数点后一位
              </label>
            </div>
            <div class="form-group">
                <div class="form-sprice">
                  <label for="" class="control-label format"><span>*</span>规格</label>
                  <label for="" class="control-label format"><span>*</span>￥单价</label>
                  <label for="" class="control-label format"><span>*</span>￥会员价</label>
                </div>
                <div class="form-rule" v-for="(k,v) in specifications">
                  <span class="col-sm-2 sprice-rule">规格{{k + 1}}</span>
                  <input type="text" class="col-sm-2 form-control sprice-cast" v-model="v.name">
                  <input type="text" class="col-sm-2 form-control sprice-cast" v-model="v.unit_price">
                  <input type="text" class="col-sm-2 form-control sprice-cast" v-model="v.vip_price">
                  <div class="form-plus">
                    <span class="glyphicon glyphicon-plus" @click="addSpecify"></span>
                    <span class="glyphicon glyphicon-minus" @click="removeSpecify($index)"></span>
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default kind-sure" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary kind-sure" @click="addDish">{{text.btn}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加、编辑模板 end -->
    <!-- 删除模板 start -->
    <div class="modal fade tips" id="delete-dish">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" href="#delete-dish" data-dismiss="modal" aria-hidden="true">&times;</button>
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
    <!-- 上传表格or下载模板 start -->
    <div class="modal fade" id="uploadDown">
        <div class="modal-dialog little">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">菜品初始化</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="downloadTpl">下载模板</button>
                    <label type="button" class="btn btn-primary" for="upload">上传表格</label>
                    <file-upload button-text="上传" class='uploadClass' name='' id='upload' action='import_dish' method='post' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></file-upload>
                </div>
            </div>
        </div>
    </div>
    <!-- 上传表格or下载模板 end -->
</template>

<script>
export default {

  name: 'cookbooklist',

  data () {
    return {
        subdata: '',
        page: 1,
        list: '',
        category_list: '',
        department_list: '',
        text: {
            title: '',
            btn: '',
            remove: '删除'
        },
        addForm: {
            identifier: '',
            department_id: -1,
            category_id: -1,
            name: '',
            norms: '',
            rebated: 1,
            allow_decimal: '',
            enabled: 1
        },
        // 页码
        pagination: '',
        // delete id
        deleteId: '',
        modifyId: '',
        selectCid: '',
        selectDid: '',
        selectEnable: '',
        doSearch: false,
        addImg: 'src/image/cpx-plus.png',
        deleteImg: 'src/image/cpx-minus.png',
        // 规格数据
        specifications: [{name: '', unit_price: '', vip_price: ''}],
        errorExportUrl: 'javascript:;'
    };
  },
  created: function(){
    this.getList();
  },
  events: {
    // 获取当前页码
  	page: function(page) {
  		this.page = page;
  		this.getList();
  	},
  	// 上传表格后操作
    onFileAfter: function(res) {
    //console.log(res.code);
      if (res.code != '0') {
        parent.Public.tips.init({content: res.msg});
        this.errorExportUrl = parent.Public.domain()+'export_dish_error?shop_id=' + $cookie('shopId') + '&token=' + $cookie('token');
      } else {
        parent.Public.tips.init({type: 3, content: res.msg});
        this.errorExportUrl = 'javascript:;';
      };
      this.getList();
      $('.close').trigger('click');
    }
  },
  components: {
	 fileUpload: require('../../../tpls/upload.vue'),
  },
  methods: {
  // 存储参数
    saveOptions: function(){
      //store('shopId', this.shopId);
      //store("excelType", this.excelType);
      //store("userId", this.userId);
    },
    // 下载模板
    downloadTpl: function(){
      parent.open('../../../src/download/菜品导入模板.xlsx');
    },

    exportError: function() {
        console.log(1);
    },

    // 修改model文案
    add: function(){
      this.text.title = '添加';
      this.text.btn = '添加';
      this.addForm = {
        identifier: '',
        category_id: -1,
        department_id: -1,
        name: '',
        norms: '',
        rebated: 1,
        allow_decimal: '',
        enabled: 1
      };
    },
    // 启用或关闭状态
    openOrClose: function(id, e){
      var self = this;
    	var params = {
    		dish_id: id,
    		enabled: $(e.target).find('span').hasClass('admin-open')? 0:1
    	};
    	parent.Public.Ajax('/enable_dish', params, 'GET', function(res){
	      	$(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用')
        });
    },
    changeEnable: function(type,e) {
        if (type==1) {
            this.addForm.enabled = $(e.target).find('span').hasClass('admin-open')? 0:1
        } else if (type==2) {
            this.addForm.rebated = $(e.target).find('span').hasClass('admin-open')? 0:1
        } else {
            return false;
        }
        $(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用')
    },
    // 添加员工
    addDish: function(){
        var self = this;
        var norms = [];
        $.each($('.form-rule'), function(i, v) {
            var norm = {
            'name': $(v).find("input").eq(0).val(),
            'unit_price': $(v).find("input").eq(1).val(),
            'vip_price': $(v).find("input").eq(2).val()
            };
            norms.push(norm);
        });

        var params = {
            department_id: self.addForm.department_id,
            category_id: self.addForm.category_id,
            name: self.addForm.name,
            identifier: self.addForm.identifier,
            rebated: self.addForm.rebated,
            enabled: self.addForm.enabled,
            allow_decimal: self.addForm.allow_decimal?1:0,
            norms: JSON.stringify(norms)
        };
        if (self.modifyId!='') {
            params.dish_id = self.modifyId;
        };
        if (params.category_id == -1) {
          parent.Public.tips.init({content: '请选择菜品类别'});
          return;
        };
        if (params.department_id == -1) {
          parent.Public.tips.init({content: '请选择出品部门'});
          return;
        };
        if (!params.identifier) {
          parent.Public.tips.init({content: '请输入菜品编号'});
          return;
        };
        if (!/^[1-9]\d*$/.test(params.identifier)) {
          parent.Public.tips.init({content: '请输入正确的菜品编号'});
          return;
        };
        if (!params.name) {
          parent.Public.tips.init({content: '请输入菜品名称'});
          return;
        };
        $('.close').trigger('click');
        parent.Public.Ajax('/add_dish', params, 'POST', function(res) {
            var params = {
                keyword: self.subdata,
        				category_id: self.selectCid,
        				department_id: self.selectDid,
        				enabled: self.selectEnable,
        				page: self.page
            }
            parent.Public.Ajax('/dish_list',params,'GET', function(res) {
                self.list = res.data.list;
                store('dish_list', res.data.list);
            });
        });
    },
    // 搜索
    search: function(){
      var self = this;
      self.doSearch = true;
      self.getList();
    },
    // 获取列表
    getList: function(){
      var self = this;
      var params = {
        keyword: self.subdata,
        enabled: self.selectEnable,
        category_id: self.selectCid,
        department_id: self.selectDid,
        page: self.page,
      };

      parent.Public.Ajax('/dish_list', params, 'GET', function(res){
        self.list = res.data.list;
        store('dish_list', res.data.list);
        self.pagination = res.data.total_pages;
        self.$dispatch('pagination', self.pagination);
      });
      parent.Public.Ajax('/department_list', {}, 'GET', function(res){
        self.department_list = res.data;
        store('department_list', res.data);
      });

      parent.Public.Ajax('/category_list', {}, 'GET', function(res){
        self.category_list = res.data;
        store('category_list', res.data);
      });
    },
    // 修改
    edit: function(id){
      var self = this;
      var dish_list = store('dish_list');
      this.text.title = '编辑';
      this.text.btn = '保存';
      self.modifyId = id;
      //console.log(dish_list);
      $.each(dish_list, function(i, v) {
        if (v.dish_id == id) {
          self.addForm.identifier = v.identifier;
          self.addForm.name = v.name;
          self.addForm.department_id = v.department_id;
          self.addForm.category_id = v.category_id;
          //self.addForm.norms = v.norms;
          self.addForm.enabled = v.enabled;
          self.addForm.rebated = v.rebated;
          self.addForm.allow_decimal = v.allow_decimal;

          self.specifications = v.norms.length>0?v.norms:[{name: '', unit_price: '', vip_price: ''}];
        }
      });
      //console.log(self.specifications);
    },
    // 设置删除id
    setDeleteId: function(id){
      this.deleteId = id;
    },
    // 删除
    remove: function() {
      console.log(this.deleteId);
      var self = this;
      var params = {
        dish_id: self.deleteId,
        category_id: self.selectCid,
        keyword: self.subdata,
        department_id: self.selectDid,
        enabled: self.selectEnable,
        page: self.page
      };

      parent.Public.Ajax('/del_dish', params, 'GET', function(res){
        self.list = res.data;
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
            dish_id: id,
            weight: weight,
            keyword: self.subdata,
            category_id: self.selectCid,
            department_id: self.selectDid,
            enabled: self.selectEnable,
            page: self.page

        };
        parent.Public.Ajax('/sort_dish', params, 'GET', function(res){
            self.list = res.data;
        });
    },

    // 添加规格
    addSpecify: function(){
      this.specifications.push({name: '', unit_price: '', vip_price: ''});
    },
    // 删除规格
    removeSpecify: function(index){
      if (this.specifications.length == 1) {
        return false;
      };
      this.specifications.splice(index,1);
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
.checkbtn.dialog{
  margin-left: 0;
}
.admin-change.dialog{
  margin-top: 6px;
}
.specifications{
  text-align: center;
  margin-bottom: 0px;
}
.uploadClass{
    display: none;
}
.glyphicon-ok:before{
  font-size: 19px;
  color: #3bcd1f;
}
.glyphicon-remove:before{
    font-size: 19px;
    color: red;
}
</style>