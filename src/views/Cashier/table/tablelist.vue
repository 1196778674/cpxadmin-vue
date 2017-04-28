<template>
    <div class="main-tit">
        <form class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="email" class="form-control admin-cast" v-model="keyword" id="" placeholder="请输入桌台编号/首字母、名称">
                <button type="button" class="btn btn-default dishes-but" data-toggle="dropdown" @click="search">
                    搜索
                </button>
            </div>
        </form>
        <div class="sel-group">
            <label for="" class="sel-kind">座位席数:</label>
            <select class="form-control sel-add" v-model="seating" @change="changedGetList(seating)">
                <option value="">全部</option>
                <option v-for="(index,item) in seating_group" value="{{item.seating}}">{{item.seating}}</option>
            </select>
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">状态:</label>
            <select class="form-control sel-add" v-model="enabled" @change="changedGetList(enabled)">
                <option value="">全部</option>
                <option value="1">启用</option>
                <option value="0">禁用</option>
            </select>
        </div>
        <div class="btn-group dishes-group">
            <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-edit-table" @click='add'>
                创建桌台
            </button>
            <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#more-create-table" @click='batchAdd'>
                批量创建桌台
            </button>
            <button type="button" href="#delete-table" @click="getDeleteIds()" class="btn btn-default dishes-but" data-toggle="modal" :disabled='dis_delete'>
                批量删除桌台
            </button>
            <!-- Modal -->

        </div>
    </div>
    <div class="table-responsive">
        <table class="table table-operation">
            <thead>
            <tr>
                <th width="2%"></th>
                <th width="3%"></th>
                <th width="10%">桌台区域</th>
                <th width="10%">桌台编号</th>
                <th width="10%">桌台名称</th>
                <th width="13%">座位席数</th>
                <th width="13%" v-if="$route.params.area_id && $route.params.area_id!='all'">排序</th>
                <th width="13%">状态</th>
                <th width="25%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,item) in list">
                <td class="sn">{{index + 1}}</td>
                <td>
                    <input class="table_checkbox" type="checkbox" value="{{item.table_id}}" @click="checkbox_fn" />
                </td>
                <td>{{item.areaName}}</td>
                <td>{{item.identifier}}</td>
                <td>{{item.name}}</td>
                <td>{{item.seating}}</td>
                <td v-if="$route.params.area_id && $route.params.area_id!='all'">
                    <!--<span class="operation-sort"></span>-->
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up icon-top" @click="sort(item.table_id,index+1,1)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up" @click="sort(item.table_id,index+1,2)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down" @click="sort(item.table_id,index+1,3)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down icon-bottom" @click="sort(item.table_id,index+1,4)"></a>
                </td>
                <!--<td>{{item.weight}}</td>-->
                <td>
                    <div class="admin-change">
                        <div class="checkbtn" @click="openOrClose(item.table_id, item.enabled)">
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
                    <a class="admin-make" role="button" data-toggle="modal" href="#add-edit-table" @click="edit(item.table_id)">修改信息</a>
                    <a class="admin-make" role="button" data-toggle="modal" href="#delete-table" @click="getDeleteId(item.table_id)">删除桌台</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!-- 创建桌台 start -->
    <div class="modal fade addmess" id="add-edit-table" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop='static'>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header change-header">
                    <h4 class="change-tit" id="myModalLabel">{{text.title}}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台区域:</label>
                        <div class="col-sm-6">
                            <select class="form-control" v-model="addForm.area_id">
                                <option value="-1">请选择</option>
                                <option v-for="(k,v) in areas" value="{{v.area_id}}">{{v.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">桌台编号:</label>
                        <div class="col-sm-6">
                            <input type="text" maxlength="4" class="form-control" placeholder="四位桌台编号" v-model="addForm.identifier">
                        </div>
                    </div>
                    <div class="form-group gower-group font-tips">
                        <label for="inputEmail3" class="col-sm-3 control-label"></label>
                        <div class="col-sm-6">
                            <p>编号可以不填写，系统自动分配</p>
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="addForm.name">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>座位席数:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="addForm.seating">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>状态:</label>
                        <div class="col-sm-6">
                            <div class="admin-change dialog">
                              <div class="checkbtn dialog" @click="changeEnable($event)">
                                  <span v-if="addForm.enabled==1" class="admin-open">启用</span>
                                  <span v-else>停用</span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button"  class="btn btn-default kind-sure close-dialog" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary kind-sure" @click="addTable">{{text.btn}}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 创建桌台 end -->
    <!-- 批量创建桌台 start -->
    <div class="modal fade addmess" id="more-create-table" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop='static'>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header change-header">
                    <h4 class="change-tit">{{text.title}}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台区域:</label>
                        <div class="col-sm-6">
                            <select class="form-control" v-model="batchAddForm.area_id">
                                <option value="-1">请选择</option>
                                <option v-for="(k,v) in areas" value="{{v.area_id}}">{{v.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台名前缀:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control"  placeholder="" v-model="batchAddForm.pre_name" @blur="checkTable()">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台名起始号:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="batchAddForm.identifier_start" @blur="checkTable()">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台名终止号:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="batchAddForm.identifier_end" @blur="checkTable()">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <div class="warning">注意:起始号和终止号间隔不能大于100</div>
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>状态:</label>
                        <div class="col-sm-6">
                            <div class="admin-change dialog">
                              <div class="checkbtn dialog" @click="changeEnable($event)">
                                <span class="admin-open">启用</span>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>座位席数:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="batchAddForm.seating">
                        </div>
                    </div>
                    <div class="form-group kind-group" v-if="preview_text">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span>*</span>桌台预览:</label>
                        <div class="col-sm-6" style="line-height: 30px;">
                            {{preview_text}}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_submit" class="btn btn-default close-dialog kind-sure" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary kind-sure" @click="batchAddTable">{{text.btn}}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 批量创建桌台 end -->
    <!-- 删除模板 start -->
    <div class="modal fade tips" id="delete-table" data-backdrop='static'>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" href="#delete-table" data-dismiss="modal" aria-hidden="true">&times;</button>
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

  name: 'tablelist',

  data () {
    return {
    	list: '',
    	seating_group: '',
    	keyword: '',
    	seating: '',
    	enabled: '',
    	text: {
            title: '',
            btn: '',
            remove: '删除'
        },
        preview_text: '',
        areas: '',
        addForm: {
            area_id: -1,
            identifier: '',
            name: '',
            seating: '',
            enabled: 1
        },
        batchAddForm: {
            area_id: -1,
            pre_name: '',
            identifier_start: '',
            identifier_end: '',
            enabled: 1,
            seating: ''
        },
        // 页码
        pagination: '',
        // delete id
        deleteIds: '',
        modifyId: '',
        pagination: '',
        page: 1,
        dis_delete: true
    };
  },

  created: function(){
    this.page = this.$route.query.page?this.$route.query.page:self.page;
    this.getList(this.$route.params.area_id);
  },
  events: {
    // 获取当前页码
  	page: function(page) {
  	    this.page = page;
  		this.getList();
  	},
  	area_id: function(area_id) {
        this.page = 1;
  	    this.getList(area_id);
    },
  },
  methods: {
    // 选择删除条数
    checkbox_fn: function(){
        var ids = [];
        $.each($('.table_checkbox'), function(i, v) {
            if ($(v).prop('checked')) {
              ids.push(v.value);
            }
        });
        if (ids.length > 0) {
            this.dis_delete = false;
        } else {
            this.dis_delete = true;
        };
    },
    // 修改model文案
    add: function(){
        var self = this;
        self.addForm = {
            area_id: -1,
            identifier: '',
            name: '',
            seating: '',
            enabled: 1
        };
        if (store('area_list')) {
            self.areas = store('area_list');
        } else {
            parent.Public.Ajax('/area_list', {}, 'GET', function(res){
                store('area_list', res.data.list);
                self.areas = res.data;
            });
        }

        self.modifyId = '';
        this.text.title = '添加';
        this.text.btn = '添加';
    },
    batchAdd: function() {
        var self = this;
        self.batchAddForm = {
            area_id: -1,
            pre_name: '',
            identifier_start: '',
            identifier_end: '',
            enabled: 1,
            seating: ''
        };
        if (store('area_list')) {
            self.areas = store('area_list');
        } else {
            parent.Public.Ajax('/area_list', {}, 'GET', function(res){
                store('area_list', res.data.list);
                self.areas = res.data;
            });
        }
        this.text.title = '批量添加';
        this.text.btn = '添加';
    },
    // 启用或关闭状态
    openOrClose: function(id, enabled){
    	var self = this;
    	var params = {
    		table_id: id,
    		enabled: enabled ? 0 : 1
    	};
    	parent.Public.Ajax('/enable_table', params, 'GET', function(res){
	      	self.getList();
        });
    },
    changeEnable: function(e) {
        this.addForm.enabled = $(e.target).find('span').hasClass('admin-open')? 0:1
        //console.log(this.addForm.enabled);
        $(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用')
    },
    checkTable: function() {
        var self = this;
        if (self.batchAddForm.pre_name!='' && self.batchAddForm.identifier_start!='' && self.batchAddForm.identifier_end!='') {
            var params = {
                pre_name: self.batchAddForm.pre_name,
                identifier_start: self.batchAddForm.identifier_start,
                identifier_end: self.batchAddForm.identifier_end
            }

            if (eval(params.identifier_start) > eval(params.identifier_end)) {
                parent.Public.tips.init({content: '起始桌号不能大于结束桌号'});
                return;
            };
            parent.Public.Ajax('/table_check', params, 'GET', function(res){
	      	    self.preview_text = self.batchAddForm.pre_name+self.batchAddForm.identifier_start+'至'+self.batchAddForm.pre_name+self.batchAddForm.identifier_end+',共创建'+(self.batchAddForm.identifier_end-self.batchAddForm.identifier_start+1)+'个桌台';
	      	});
        }
    },
    refreshArea: function() {
        this.$dispatch("refresh_area", 1);
    },
    // 添加桌台
    addTable: function(){
        var self = this;

        var params = {
            area_id: self.addForm.area_id,
            identifier: self.addForm.identifier,
            name: self.addForm.name,
            seating: self.addForm.seating,
            enabled: self.addForm.enabled,
        };
        if (self.modifyId!='') {
            params.table_id = self.modifyId;
        }
        if (params.area_id == -1) {
          parent.Public.tips.init({content: '请选择桌台区域'});
          return;
        };
        //if (!params.identifier) {
        //  parent.Public.tips.init({content: '请输入桌台编号'});
        //  return;
        //};
        //if (!/^[0-9]\d*$/.test(params.identifier)) {
        //  parent.Public.tips.init({content: '请输入正确的菜品编号'});
        //  return;
        //};
        if (!params.name) {
          parent.Public.tips.init({content: '请输入桌台名称'});
          return;
        };
        if (!params.seating) {
          parent.Public.tips.init({content: '请输入座位席数'});
          return;
        };
        //console.log(params);return;
        parent.Public.Ajax('/add_table', params, 'POST', function(res) {
            $('.close-dialog').trigger('click');
            self.getList();
            self.refreshArea();
        });
    },
    // 批量添加桌台
    batchAddTable: function(){
        var self = this;

        var params = {
            area_id: self.batchAddForm.area_id,
            pre_name: self.batchAddForm.pre_name,
            identifier_start: self.batchAddForm.identifier_start,
            identifier_end: self.batchAddForm.identifier_end,
            seating: self.batchAddForm.seating,
            enabled: self.addForm.enabled,
        };
        if (self.modifyId!='') {
            params.table_id = self.modifyId;
        };
        if (params.area_id == -1) {
          parent.Public.tips.init({content: '请选择桌台区域'});
          return;
        };
        if (!params.pre_name) {
          parent.Public.tips.init({content: '请输入桌台前缀'});
          return;
        };
        if (!params.identifier_start) {
          parent.Public.tips.init({content: '请输入桌台起始号'});
          return;
        };
        if (!params.identifier_end) {
          parent.Public.tips.init({content: '请输入桌台结束号'});
          return;
        };
        if (!/^[0-9]\d*$/.test(params.identifier_start) || !/^[0-9]\d*$/.test(params.identifier_end)) {
          parent.Public.tips.init({content: '请输入正确的桌台起始号|结束号'});
          return;
        };
        if (!params.seating) {
          parent.Public.tips.init({content: '请输入桌台席位数'});
          return;
        };
        if (params.identifier_start > params.identifier_end) {
            parent.Public.tips.init({content: '起始桌号不能大于结束桌号'});
            return;
        };
        //console.log(params);return;
        parent.Public.Ajax('/batch_add_table', params, 'POST', function(res){
            $('.close-dialog').trigger('click');
            self.preview_text = '';
            self.getList();
            self.refreshArea();
        });
    },
    // 搜索
    search: function(){
        this.page = 1;
        this.getList();
    },
    // 获取列表
    getList: function(area_id){
        var self = this;
        var params = {
            keyword: self.keyword,
            seating: self.seating,
            enabled: self.enabled,
            page: self.page
        };
        //console.log(self.$route.query.page);
        if (!area_id) {
            area_id = self.$route.params.area_id;
        }
        if (area_id && area_id!='all') {
            params.area_id = area_id;
        }
        parent.Public.Ajax('/table_list', params, 'GET', function(res){
            self.list = res.data.list;
            self.seating_group = res.data.seating;
            store('table_list', res.data.list);
            self.pagination = res.data.totalPages;
            self.$dispatch('total', res.data.total);
            self.$dispatch('pagination', self.pagination);
        });
        //console.log(store('area_list'));
        if (store('area_list')) {
            self.areas = store('area_list');
        } else {
            parent.Public.Ajax('/area_list', params, 'GET', function(res){
                self.areas = res.data.list;
                store('area_list', res.data.list);
            });
        }

    },
    // 修改
    edit: function(id) {
      var self = this;
      var table_list = store('table_list');
      this.text.title = '编辑';
      this.text.btn = '保存';
      //console.log(table_list);
      self.modifyId = id;
      $.each(table_list, function(i, v) {
        if (v.table_id == id) {
            //console.log(v);
          self.addForm.identifier = v.identifier;
          self.addForm.area_id = v.area_id;
          self.addForm.name = v.name;
          self.addForm.seating = v.seating;
          self.addForm.enabled = v.enabled;
        }
      });
    },
    // 获取删除id
    getDeleteId: function(id) {
      var ids = [];
      ids.push(id);
      this.deleteIds = JSON.stringify(ids);
    },
    getDeleteIds: function() {
        var ids = [];
        $.each($('.table_checkbox'), function(i, v) {
            if ($(v).prop('checked')) {
              ids.push(v.value);
            }
        });
        this.deleteIds = JSON.stringify(ids);
    },
    // 删除
    remove: function() {
      console.log(this.deleteIds);
      var self = this;
      var params = {
        table_ids: self.deleteIds
      };
      parent.Public.Ajax('/del_table', params, 'GET', function(res){
        $('.close').trigger('click');
        self.getList();
        self.refreshArea();
      });
    },
    sort: function(id, index, type) {
        var self = this;
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
        var params = {
            area_id: self.$route.params.area_id,
            table_id: id,
            weight: weight
        };
        parent.Public.Ajax('/sort_table', params, 'GET', function(res){
            self.getList();
        });
    },
    // 修改下拉后刷新表单
    changedGetList: function(id){
        this.page = 1;
        this.getList();
    },
  }
}
</script>

<style lang="css" scoped>
    .font-tips{
        margin-bottom: 0px;
    }
    .font-tips p{
        color: red;
    }
.checkbtn.dialog{
  margin-left: 0;
}
.table-responsive{
    overflow-y: scroll;
    max-height: 700px;
}
.table-operation tbody tr td input{
    position: inherit;
}
</style>