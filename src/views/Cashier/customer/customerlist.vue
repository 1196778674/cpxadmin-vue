<template>
	<div class="main-tit">
        <form class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="text" class="form-control admin-cast" id="" placeholder="请输入客户名称" v-model="params.keyword">
            </div>
        </form>
        <div class="btn-group dishes-group">
            <button type="button" class="btn btn-default dishes-but" @click="searchFn">
                搜索
            </button>
            <button class="btn btn-default dishes-but" role="button" data-toggle="modal" data-toggle="dropdown" href="#add_edit" @click="add_edit_dialog('')">添加客户</button>
            <!-- <button type="button" class="btn btn-default dishes-but" @click="exportFn">
                导出表格
            </button> -->
        </div>
    </div>
    <div class="table-responsive">
    	<div class="table-title">
    		<ul>
    			<li>客户合计: {{ total }}</li>
    		</ul>
    	</div>
        <table class="table table-operation">
            <thead>
            <tr>
            	<th width="2%"></th>
                <th width="10%">客户名称</th>
                <th width="10%">担保人</th>
                <th width="15%">添加时间</th>
                <th width="15%">客户备注</th>
                <th width="10%">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, item) in list">
          	   <td class="sn">{{key + 1}}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.guarantee }}</td>
                <td>{{ item.create_time }}</td>
                <td>{{ item.remarks }}</td>
                <td>
                	<a class="admin-make" role="button" data-toggle="modal" href="#add_edit" @click="add_edit_dialog(item.customer_id)">修改</a>
                	<a class="admin-make" role="button" data-toggle="modal" href="#delete" @click="delete_dialog(item.customer_id)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
<!-- 添加修改客户模板 start -->
	<div class="modal fade" id="add_edit" data-backdrop='static'>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">{{ content.title }}客户</h4>
				</div>
				<div class="modal-body">
					<div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label"><span style="color:red;">*</span>客户名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="请输入客户名称" v-model="sub_data.name">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">担保人:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="请输入担保人姓名" v-model="sub_data.guarantee">
                        </div>
                    </div>
                    <div class="form-group kind-group">
                        <label for="inputEmail3" class="col-sm-3 control-label">客户备注:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" placeholder="" v-model="sub_data.remarks">
                        </div>
                    </div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" @click="save">{{ content.btn_text }}</button>
				</div>
			</div>
		</div>
	</div>
<!-- 添加修改客户模板 end -->
<!-- 删除客户 start -->
<div class="modal fade tips" id="delete" data-backdrop='static'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" href="#delete-dish" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">删除客户</h4>
      </div>
      <div class="modal-body">
        是否删除当前记录!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-danger" @click="delete_row_fn">删除</button>
      </div>
    </div>
  </div>
</div>
<!-- 删除客户 end -->
</template>

<script>
export default {

  name: 'customerlist',

  data () {
    return {
    	list: '',
    	params: {
  			keyword: '',
  			page: this.$route.query.page || 1,
    	},
    	total: 0,
    	content: {
    		title: '添加',
    		btn_text: '添加'
    	},
    	sub_data: {
    		customer_id: '',
    		name: '',
    		guarantee: '',
    		remarks: ''
    	},
    	delete_row: ''
    };
  },
  created: function(){
  	// 获取表单
  	this.getList();
  },
  events: {
    // 获取当前页码
  	page: function(page) {
  		this.params.page = page;
  		this.getList();
  	},
  },
  methods: {
  	// 添加编辑文案
  	add_edit_dialog: function (customer_id) {
  		var self = this;
  		if (customer_id == '') {
  			this.content = {
	    		title: '添加',
	    		btn_text: '添加'
	    	}
  		} else {
  			this.content = {
	    		title: '修改',
	    		btn_text: '保存'
	    	};
	    	$.each(store('list'), function(i, v) {
	    		if (v.customer_id == customer_id) {
	    			self.sub_data = {
			    		customer_id: v.customer_id,
			    		name: v.name,
			    		guarantee: v.guarantee,
			    		remarks: v.remarks
			    	};
	    		};
	    	});
  		};
  	},
  	// 搜索
  	searchFn: function(){
  		this.getList();
  	},
  	// 保存
  	save: function(){
  		var self = this;
  		if (!this.sub_data.name) {
  			parent.Public.tips.init({type:1, content: '请输入客户名称'});
  			return;
  		};
  		parent.Public.Ajax('add_customer', this.sub_data, 'POST', function(res){
  			$('.close').trigger('click');
  			self.getList();
  			self.sub_data = {
	    		customer_id: '',
	    		name: '',
	    		guarantee: '',
	    		remarks: ''
	    	};
  		});
  	},
  	// 记录删除id
  	delete_dialog: function(id){
  		this.delete_row = id;
  	},
  	// 删除行
  	delete_row_fn: function(){
  		var self = this;
  		var params = {
  			customer_id: this.delete_row
  		};
  		parent.Public.Ajax('del_customer', params, 'GET', function(res){
  			$('.close').trigger('click');
  			self.getList();
  		})
  	},
    // 导出
    exportFn: function(){
      // parent.Public.exportFn(12);
    },
  	getList: function(){
  		var self = this;
  		var params = this.params;
  		parent.Public.Ajax('customer_list', params, 'GET', function(res){
  			self.$dispatch('pagination', res.data.total_pages);
  			self.list = res.data.list;
  			self.total = res.data.total;
  			store('list', res.data.list);
  		});
  	},

  },
  destroyed: function(){
    store.remove('list');
  },
};
</script>

<style lang="css" scoped>
.sel-group{
	float: left;
	width: auto;
	height: 40px;
	padding-left: 10px;
}
.sel-kind{
	line-height: 40px;
}
.form-inline .admin-cast{
	background: #fff;
	padding-left: 5px;
}
#flatpickr{
	float: left;
	width: auto;
	background: #fff;
}
</style>