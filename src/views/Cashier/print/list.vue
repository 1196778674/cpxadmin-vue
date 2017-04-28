<template>
	<table class="table">
		<thead>
			<tr>
				<th>打印机名称</th>
				<th>打印宽度</th>
				<th>打印机端口类型</th>
				<th>打印机端口地址</th>
				<th>打印机品牌</th>
				<th>开放给点菜宝</th>
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
				<td>
                    <div class="admin-change">
                        <div class="checkbtn" @click="openOrClose(item.printer_id, item.open_for_dcb)">
                            <span v-if="item.open_for_dcb==1" class="admin-open">开放</span>
                            <span v-else>关闭</span>
                        </div>
                    </div>
                </td>
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
	<div class="modal fade" id="changeModal" data-backdrop='static'>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">{{text.title}}打印机</h4>
				</div>
				<div class="modal-body form-horizontal">
					<div class="form-group">
					    <label class="col-sm-3 control-label"><span>*</span>打印机名称:</label>
					    <div class="col-sm-7">
							<input type="text" class="form-control" v-model="itemForm.name">
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label"><span>*</span>打印机端口类型:</label>
					    <div class="col-sm-7">
					    	<select name="" class="form-control" v-model="itemForm.port_type">
					    		<option value="网口">网口</option>
					    		<option value="串口">串口</option>
					    		<option value="驱动">驱动</option>
					    	</select>
					    </div>
					</div>
					<div class="form-group">
					    <label class="col-sm-3 control-label"><span>*</span>打印机端口地址:</label>
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
                    <div class="form-group gower-group">
                        <label class="col-sm-3 control-label"><span>*</span>开放给点菜宝:</label>
                        <div class="col-sm-6">
                            <div class="admin-change dialog">
                                <div class="checkbtn dialog" @click="changeOpen($event)">
                                    <span v-if="itemForm.open_for_dcb==1" class="admin-open">开放</span>
                                    <span v-else>关闭</span>
                                </div>
                            </div>
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
							<input type="text" readonly="readonly" class="form-control" v-model="itemForm.width">
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
	<div class="modal fade tips" id="deleteModal" data-backdrop='static'>
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
					<button type="button" class="btn btn-danger" @click="deletePrint">删除</button>
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
    	text: {
            title: '',
            btn: '',
            remove: '删除'
        },
    	itemForm: {
    		name: '',
    		width: 80,
    		port_type: '网口',
    		ip: '',
    		brand: '',
    		remarks: '',
    		open_for_dcb: ''
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
			    		open_for_dcb: v.open_for_dcb
			    	}
				}
			});
			console.log(self.itemForm);
			self.text.title = '修改';
		} else {
			this.printer_id = '';
			self.itemForm = {
	    		name: '',
	    		width: 80,
	    		port_type: '网口',
	    		ip: '',
	    		brand: '',
	    		remarks: '',
	    		open_for_dcb: 1
	    	};

            self.text.title = '添加';
		};
	},
	// 启用或关闭状态
    openOrClose: function(id, open){
      var self = this;
    	var params = {
    		printer_id: id,
    		open: open ? 0 : 1
    	};
    	parent.Public.Ajax('/open_printer', params, 'GET', function(res){
	      	self.getList();
        });
    },
    changeOpen: function(e) {
        this.itemForm.open_for_dcb = $(e.target).find('span').hasClass('admin-open')? 0:1
        $(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('关闭') : $(e.target).find('span').addClass('admin-open').text('开放')
    },
	// 添加修改
	addEditPrint: function(){
		var self = this;
		var params = $.extend(true, self.itemForm, {printer_id: self.printer_id});
		console.log(params);
		if (!params.name) {
          parent.Public.tips.init({content: '请输入打印机名称'});
          return;
        };
        if (!params.port_type) {
          parent.Public.tips.init({content: '请输入打印机端口类型'});
          return;
        };
        if (!params.ip) {
          parent.Public.tips.init({content: '请输入打印机端口地址'});
          return;
        };
		parent.Public.Ajax('/add_printer', params, 'POST', function(res){
			$('.close').trigger('click');
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
			$('.close').trigger('click');
			self.getList();
		});
	},
  },
  destroyed: function(){
    store.remove('printList');
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
.checkbtn.dialog{
	float: left;
	width: 78px;
}
</style>