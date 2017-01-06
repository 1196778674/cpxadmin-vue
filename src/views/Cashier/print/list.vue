<template>
	<table class="table">
		<thead>
			<tr>
				<th>打印机名称</th>
				<th>打印宽度</th>
				<th>打印机端口类型</th>
				<th>打印机端口地址</th>
				<th>打印机品牌</th>
				<th>打印机备注</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for='item in list'>
				<td>{{item.name}}</td>
				<td>{{item.width}}</td>
				<td>{{item.port_type}}</td>
				<td>{{item.ip}}</td>
				<td>{{item.brand}}</td>
				<td>{{item.remarks}}</td>
				<td>
					<a class="add-print" data-toggle="modal" href='#changeModal' @click="saveId('edit',item.printer_id)">修改</a>
					<a class="add-print" data-toggle="modal" href='#deleteModal' @click="saveId('del', item.printer_id)">删除</a>
				</td>
			</tr>
		</tbody>
	</table>
	<a class="add-print" data-toggle="modal" href='#changeModal' @click="saveId('add')">添加打印机</a>
	<!-- 添加/修改 start -->
	<div class="modal fade" id="changeModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">保存/修改打印机</h4>
				</div>
				<div class="modal-body form-horizontal">
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印机名称:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.name">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印机端口类型:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.port_type">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印机端口地址:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.ip">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印机品牌:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.brand">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印机备注:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.remarks">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label">打印宽度:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.width">
					    </div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" @click='addEditPrint'>保存</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 添加/修改 end -->
	<!-- 添加/修改 start -->
	<div class="modal fade tips" id="deleteModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">删除打印机</h4>
				</div>
				<div class="modal-body">
					是否删除当前打印机
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletePrint">删除</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 添加/修改 end -->

</template>

<script>
export default {

  name: 'list',

  data () {
    return {
    	list: '',
    	printer_id: '',
    	itemForm: {
    		name: '',
    		width: '',
    		port_type: '',
    		ip: '',
    		brand: '',
    		remarks: '',
    	}
    };
  },
  created: function(){
  	this.getList();
  },
  methods: {
  	// 请求列表
  	getList: function(){
  		var self = this;
	  	var params = {};
	  	parent.Public.Ajax('/printer_list', params, 'GET', function(res){
	  		self.list = res.data;
	  		store('printList', self.list);
	  	});
  	},
  	// 保存id
	saveId: function(type, id){
		var self = this;
		if (type == 'edit' || type == 'del') {
			this.printer_id = id;
			$.each(store('printList'), function(i, v) {
				if (id == v.printer_id) {
					self.itemForm = {
			    		name: v.name,
			    		width: v.width,
			    		port_type: v.port_type,
			    		ip: v.ip,
			    		brand: v.brand,
			    		remarks: v.remarks,
			    	}
				}
			});
		} else {
			this.printer_id = '';
			self.itemForm = {
	    		name: '',
	    		width: '',
	    		port_type: '',
	    		ip: '',
	    		brand: '',
	    		remarks: '',
	    	}
		};
	},
	// 添加修改
	addEditPrint: function(){
		var self = this;
		var params = $.extend(true, self.itemForm, {printer_id: self.printer_id});
		if (!params.name) {
          parent.Public.tips.init({content: '请输入打印机名称'});
          return;
        };
        if (!params.port_type) {
          parent.Public.tips.init({content: '请输入打印机端口类型'});
          return;
        };
        if (!params.ip) {
          parent.Public.tips.init({content: '请输入打印机ip'});
          return;
        };
        if (!params.brand) {
          parent.Public.tips.init({content: '请输入打印机品牌'});
          return;
        };
        if (!params.remarks) {
          parent.Public.tips.init({content: '请输入打印机备注'});
          return;
        };
        if (!params.width) {
          parent.Public.tips.init({content: '请输入打印宽度'});
          return;
        };
		$('.close').trigger('click');
		parent.Public.Ajax('/add_printer', params, 'POST', function(res){
			self.getList();
		});
	},
	// 删除打印机
	deletePrint: function(){
		var self = this;
		var params = {
			printer_id : self.printer_id
		};
		parent.Public.Ajax('/del_printer', params, 'GET', function(res){
			self.getList();
		});
	},
  },
};
</script>

<style lang="css" scoped>
.table{
	border: 1px solid #ccc;
	text-align: center
}
.table > thead > tr > th{
	border-bottom: 1px solid #ccc;
	text-align: center;
	border-left: 1px solid #ccc;
}
.table > tbody > tr > td{
	border-bottom: 1px solid #ccc;
	text-align: center;
	border-left: 1px solid #ccc;
}
.add-print{
	color: #1d9ee5;
	text-decoration: underline;
	font-size: 13px;
}
</style>