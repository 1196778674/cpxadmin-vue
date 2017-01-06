<template>
	<div class="main-tit">
	    <form class="form-inline search-num" role="form">
	      <div class="form-group">
	        <input type="email" class="form-control admin-cast" v-model="supplierName" placeholder="请输入供应商编号/首字母、名称">
	        <button type="button" class="btn btn-default dishes-but" data-toggle="dropdown" @click="search">
	          搜索
	        </button>
	      </div>
	    </form>
	    <div class="btn-group dishes-group">
	      <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-eidt-staff" @click='changeModelText' data-toggle="dropdown">
	        新增供应商
	      </button>
	    </div>
	</div>
	<div class="table-responsive">
	  <table class="table table-operation" v-if="list">
	    <thead>
	        <tr>
	            <th width="10%">供应商编号</th>
	            <th width="24%">供应商名称</th>
	            <th width="20%">联系人</th>
	            <th width="22%">手机号</th>
	            <th width="10%">状态</th>
	            <th width="14%">操作</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="item in list">
	            <td>{{item.supplierSn}}</td>
	            <td>{{item.name}}</td>
	            <td>{{item.createdAtUserName}}</td>
	            <td>{{item.phone}}</td>
	            <td>
	                <div class="admin-change">
	                    <div class="checkbtn" @click="openOrClose(item.id, $event)">
	                      <span v-if="item.type == 1" class="admin-open">启用</span>
	                      <span v-else>停用</span>
	                    </div>
	                </div>
	            </td>
	            <td>
	                <a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-staff" @click="edit(item.id)">修改信息</a>
	                <a class="admin-make" role="button" data-toggle="modal" href="#delete-staff" @click="getDeleteId(item.id)">删除供应商</a>
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
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">供应商编号:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.supplierSn" value="{{addForm.supplierSn}}" id="" placeholder="">
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>&nbsp;&nbsp;&nbsp;&nbsp;*</span>供应商名称:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.supplierName" value="{{addForm.supplierName}}" id="" placeholder="">
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">供应商分类:</label>
	          <div class="col-sm-4">
	            <select name="" id="" class="form-control" v-model="addForm.firstCategoryId" @change="getSecondCategory(addForm.firstCategoryId)">
	            	<option value="0">请选择</option>
	            	<option v-for="item in firstCategory" value="{{item.id}}">{{item.name}}</option>
	            </select>
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二级分类:</label>
	          <div class="col-sm-4">
	            <select name="" id="" class="form-control" v-model="addForm.secondCategoryId">
	            	<option value="0">请选择</option>
	            	<option v-for="item in secondCategory" value="{{item.id}}">{{item.name}}</option>
	            </select>
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系人:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.spCatName" value="{{addForm.spCatName}}" id="" placeholder="">
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电子邮箱:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.email" value="{{addForm.email}}" id="" placeholder="">
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;联系电话:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.spCatMobile" value="{{addForm.spCatMobile}}" id="" placeholder="">
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;供应商状态:</label>
	          <div class="col-sm-4">
	            <select name="" id="" class="form-control" v-model="addForm.spApplyType">
	            	<option value="0">请选择</option>
	            	<option value="1">正常</option>
	            	<option value="2">冻结</option>
	            </select>
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;省份:</label>
	          <div class="col-sm-4">
	            <select name="" id="" class="form-control" v-model="addForm.province" @change="getCity(addForm.province)">
	            	<option value="0">请选择</option>
	            	<option v-for="item in provice" value="{{item.id}}">{{item.name}}</option>
	            </select>
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;城市:</label>
	          <div class="col-sm-4">
	            <select name="" id="" class="form-control" v-model="addForm.city">
	            	<option value="0">请选择</option>
	            	<option v-for="item in citys" value="{{item.id}}">{{item.name}}</option>
	            </select>
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址:</label>
	          <div class="col-sm-10">
	            <input type="text" class="form-control" v-model="addForm.spAddress" value="{{addForm.spAddress}}" id="" placeholder="">
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注信息:</label>
	          <div class="col-sm-10">
	            <input type="text" class="form-control" v-model="addForm.remark" value="{{addForm.remark}}" id="" placeholder="">
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开户银行:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.bankName" value="{{addForm.bankName}}" id="" placeholder="">
	          </div>
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;银行账户:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.bankSn" value="{{addForm.bankSn}}" id="" placeholder="">
	          </div>
	        </div>
	        <div class="form-group gower-group">
	          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">收款单位/人:</label>
	          <div class="col-sm-4">
	            <input type="text" class="form-control" v-model="addForm.payee" value="{{addForm.payee}}" id="" placeholder="">
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

  name: 'supplierlist',

  data () {
    return {
      supplierName: '',
      supplierId: '',
    	list: [],
    	provice: [],
    	citys: [],
    	firstCategory: [],
    	secondCategory: [],
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
    this.provice = store('provice');
    this.getFirstCategory();
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
      this.text.title = '添加供应商';
      this.text.btn = '添加';
      this.addForm = {
      	supplierId: '',
        supplierName: '',
        supplierSn: '',
        firstCategoryId: '0',
        secondCategoryId: '0',
        spCatName: '',
        email: '',
        spCatMobile: '',
        spApplyType: '',
        province: '0',
        city: '0',
        county: '',
        spAddress: '',
        remark: '',
        bankSn: '',
        bankName: '',
        payee: ''
      };
    },
    // 启用或关闭状态
    openOrClose: function(id, e){
    	var self = this;
    	var params = {
    		id: id
    	};
    	parent.Public.Ajax('/supplier_status_set', params, 'GET', function(res){
	      	$(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用')
        });
    },
    // 添加员工
    addStaff: function(){
      var self = this;
      var datas = self.addForm;
      var params = {
      	supplierId: self.supplierId,
      	supplierName: datas.supplierName,
        supplierSn: datas.supplierSn,
        firstCategoryId: datas.firstCategoryId,
        secondCategoryId: datas.secondCategoryId,
        spCatName: datas.spCatName,
        email: datas.email,
        spCatMobile: datas.spCatMobile,
        spApplyType: datas.spApplyType,
        province: datas.province,
        city: datas.city,
        county: datas.county,
        spAddress: datas.spAddress,
        remark: datas.remark,
        bankSn: datas.bankSn,
        bankName: datas.bankName,
        payee: datas.payee
      };
      parent.Public.Ajax('/supplier_set_up', params, 'POST', function(res){
      	self.getList();
      });
    },
    // 搜索
    search: function(){
      var self = this;
      self.getList({supplierName: self.supplierName});
    },
    // 获取列表
    getList: function(obj){
      var self = this;
      var params = {};
      params = $.extend(true, params, obj);
      parent.Public.Ajax('/supplier_search', params, 'GET', function(res){
      	self.list = res.data.list;
      	// self.pagination = res.data.pagination;
      	// self.$dispatch('pagination', self.pagination);
      });
    },
    // 修改
    edit: function(id){
      var self = this;
      var params = {
      	id: id
      };
      self.supplierId = id;
      parent.Public.Ajax('/supplier_edit_by_id', params, 'GET', function(res){
      	var datas = res.data;
      	  self.text.title = '编辑供应商';
	      self.text.btn = '保存';
	      self.addForm = {
	      	supplierName: datas.supplierName,
	        supplierSn: datas.supplierSn,
	        firstCategoryId: datas.firstCategoryId,
	        secondCategoryId: datas.secondCategoryId,
	        spCatName: datas.spCatName,
	        email: datas.email,
	        spCatMobile: datas.spCatMobile,
	        spApplyType: datas.spApplyType,
	        province: datas.province,
	        city: datas.city,
	        county: datas.county,
	        spAddress: datas.spAddress,
	        remark: datas.remark,
	        bankSn: datas.bankSn,
	        bankName: datas.bankName,
	        payee: datas.payee
	      }
      });
      // 获取城市、二级类别
      $.each(store('savelist'), function(i, v) {
      	if (v.id == id) {
      		parent.Public.Ajax('/get_city_list_by_province', {provinceId: v.province}, 'GET', function(res){
		      	self.citys = res.data;
		    });
		    var params = {
		    	firstCategoryId: v.supplierCategoryId
		    };
		    parent.Public.Ajax('/supplier_second_category_list', params, 'GET', function(res){
		      	self.secondCategoryId = res.data.list;
		    });
      	};
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
      	id: self.deleteId
      }
      parent.Public.Ajax('/supplier_delete', params, 'GET', function(res){
      	self.getList();
      });
    },
    // 获取城市
    getCity: function(id){
    	var self = this;
    	parent.Public.Ajax('/get_city_list_by_province', {provinceId: id}, 'GET', function(res){
	      	self.citys = res.data;
	    });
    },
    // 获取供应商一级类别
    getFirstCategory: function(){
    	var self = this;
    	var params = {};
    	parent.Public.Ajax('/supplier_first_category_list', params, 'GET', function(res){
	      	self.firstCategory = res.data;
	    });
    },
    // 获取供应商二级类别
    getSecondCategory: function(id){
    	var self = this;
    	var params = {
    		firstCategoryId: id
    	};
    	parent.Public.Ajax('/supplier_second_category_list', params, 'GET', function(res){
	      	self.secondCategory = res.data.list;
	    });
    },
  },
};
</script>