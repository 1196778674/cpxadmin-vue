<template>
	<div class="main-tit">
		<div class="btn-group dishes-group">
			<button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-eidt-staff" @click="add()" data-toggle="dropdown">
				新增折扣
			</button>
		</div>
	</div>
	<div class="table-responsive">
		<table class="table table-operation" v-if="list">
			<thead>
			<tr>
				<th width="22%">折扣名称</th>
				<th width="22%">折扣率</th>
				<th width="32%">状态</th>
				<th width="24%">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="item in list">
				<td>{{item.name}}</td>
				<td>{{item.rebate_con}}</td>
				<td>
					<div class="admin-change">
						<div class="checkbtn" @click="openOrClose(item.promotion_id,item.enabled,$event)">
							<span v-if="item.enabled" class="admin-open">启用</span>
							<span v-else>停用</span>
						</div>
					</div>
				</td>
				<td>
					<a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-staff" @click="edit(item.promotion_id)">修改折扣</a>
					<a class="admin-make" role="button" data-toggle="modal" href="#deletepromotion-modal" @click="saveOptionId(item.promotion_id)">删除折扣</a>
				</td>
			</tr>
			</tbody>
		</table>
	</div>

	<!-- 删除部门 start -->
	<div class="modal fade tips" id="deletepromotion-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">删除折扣</h4>
				</div>
				<div class="modal-body">
					确认删除折扣!
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal" @click="deletepromotion()">删除</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 删除部门 end -->

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
						<label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>折扣名称:</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" v-model="addForm.name" value="{{addForm.name}}" id="" placeholder="">
						</div>
					</div>
					<div class="form-group gower-group">
						<label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>折&nbsp;&nbsp;扣&nbsp;&nbsp;率:</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" v-model="addForm.rebate_rate" value="{{addForm.rebate_rate}}" id="" placeholder="">
						</div>
						<span class="col-sm-2 control-label gower inputs bfh">%</span>
					</div>
					<div class="form-group gower-group admin-change">
						<label class="col-sm-2 control-label gower inputs"><em style="color:red;">*</em>是否启用:</label>
						<div class="checkbtn tips" @click="openOrClose('','',$event)">
							<span v-if="addForm.enabled" class="admin-open">启用</span>
							<span v-else>停用</span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default kind-sure" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary kind-sure" @click="addPromotion">{{text.btn}}</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 添加、编辑模板 end -->
</template>

<script>
export default {

  name: 'discountlist',

  data () {
    return {
	  list : '',
	  newList:[],
	  text: {
        title: '',
        btn: '',
        remove: '删除'
      },
      addForm: {
        promotion_id:'',
        shop_id: '',
        name: '',
        rebate_rate: '',
        enabled: '',
      },
      promotion_id : ''
    };
  },
  created: function(){
	this.getList();
  },
  methods: {
	getList:function(){
	  var self = this;
      var params = {
		shop_id : 1322,
      };
  	  parent.Public.Ajax('/promotion_list', params, 'GET', function(res){
	     self.list = res.data;
	     store('promotion_list', res.data);
	  //   self.pagination = res.data.totalPages;
	  //   self.$dispatch('pagination', self.pagination);
  	  });
	},
  	// 保存当前操作id
    saveOptionId: function(id){
      this.optionId = id;//!id ? this.$route.params.type : id;
      console.log(this.optionId);
    },
	// 启用或关闭状态
    openOrClose: function(id,enabled,e){
      var params = {
      	promotion_id : id,
      	enabled      : enabled,
      };
      if (params.promotion_id) {
      	parent.Public.Ajax('/enable_promotion', params, 'GET', function(res){
		     $(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用');
	  	  });
      } else {
      	if ($(e.target).find('span').hasClass('admin-open')) {
      		$(e.target).find('span').removeClass('admin-open').text('停用');
      		this.addForm.enabled = 0;
      	} else {
      		$(e.target).find('span').addClass('admin-open').text('启用');
      		this.addForm.enabled = 1;
      	};
      };
  	},

  	 // 删除折扣
    deletepromotion: function(){
      var self = this;
      var params = {
      	promotion_id : self.optionId,
      };
      parent.Public.Ajax('/del_promotion', params, 'GET', function(res){
		 $.each(self.list, function(i, v) {
          if (v.promotion_id != self.optionId) {
            self.newList.push(v);
          };
        });
        self.list = self.newList;
        self.newList = [];
  	  });
    },
    // 修改
    edit: function(promotion_id){
      var self = this;
      var promotion_list = store('promotion_list');
      this.text.title = '修改折扣';
      this.text.btn = '保存';
      self.promotion_id = promotion_id;
      $.each(promotion_list, function(i, v) {
        if (v.promotion_id == promotion_id) {
          self.addForm.promotion_id = v.promotion_id,
          self.addForm.shop_id = v.shop_id,
          self.addForm.name = v.name,
          self.addForm.rebate_rate = v.rebate_rate,
          self.addForm.enabled = v.enabled
        };
      });
    },

    // 新建
    add: function(){
      var self = this;
      //var promotion_list = store('promotion_list');
      this.text.title = '新增折扣';
      this.text.btn = '添加';
      this.addForm = {
      	promotion_id :'',
	    shop_id :'',
	    name: '',
	    rebate_rate :'',
	    enabled :''
	  }

    },

    //添加折扣，编辑保存折扣
    addPromotion: function(){
      var params = this.addForm;
      var self = this;
      if (!params.name) {
	      parent.Public.tips.init({content: '请输入折扣名称'});
	      return;
	  };
	  if (!params.rebate_rate) {
	      parent.Public.tips.init({content: '请输入折扣率'});
	      return;
	  };
	  if (!/^[1-9]\d*$/.test(params.rebate_rate)) {
	      parent.Public.tips.init({content: '请输入正确的折扣率'});
	      return;
	  };
	  $('.close').trigger('click');
      parent.Public.Ajax('/add_promotion', params, 'POST', function(res){
	  	self.getList();
      });
	     // store('promotion_list', res.data);
	  //   self.pagination = res.data.totalPages;
	  //   self.$dispatch('pagination', self.pagination);
    },
  }
};
</script>

<style lang="css" scoped>
.checkbtn.tips{
	float: left;
    margin-left: 20px;
    margin-top: 5px;
}
.gower.inputs.bfh{
	margin-left: -20px;
}
</style>