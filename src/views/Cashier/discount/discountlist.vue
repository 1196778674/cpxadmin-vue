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
				<th width="12%">折扣率</th>
				<th width="12%">排序</th>
				<th width="12%">状态</th>
				<th width="30%">有效时间</th>
				<th width="24%">操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(index,item) in list">
				<td>{{item.name}}</td>
				<td>{{item.rebate_con}}</td>
                <td>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up icon-top" @click="sort(item.promotion_id,index+1,1)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up" @click="sort(item.promotion_id,index+1,2)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down" @click="sort(item.promotion_id,index+1,3)"></a>
                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down icon-bottom" @click="sort(item.promotion_id,index+1,4)"></a>
                </td>
				<td>
					<div class="admin-change">
						<div class="checkbtn" @click="openOrClose(item.promotion_id,item.enabled,$event)">
							<span v-if="item.enabled" class="admin-open">启用</span>
							<span v-else>停用</span>
						</div>
					</div>
				</td>
                <td>{{item.start_time}}---{{item.end_time}}</td>
				<td>
					<a class="admin-make" role="button" data-toggle="modal" href="#add-eidt-staff" @click="edit(item.promotion_id)">修改折扣</a>
					<a class="admin-make" role="button" data-toggle="modal" href="#deletepromotion-modal" @click="saveOptionId(item.promotion_id)">删除折扣</a>
				</td>
			</tr>
			</tbody>
		</table>
	</div>

	<!-- 删除部门 start -->
	<div class="modal fade tips" id="deletepromotion-modal" data-backdrop='static'>
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
					<button type="button" class="btn btn-danger" @click="deletepromotion()">删除</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 删除部门 end -->

	<!-- 添加、编辑模板 start -->
	<div class="modal fade" id="add-eidt-staff" data-backdrop='static'>
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
                    <div class="form-group gower-group">
                        <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>开始时间:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control flatpickr glyphicon glyphicon-calendar" v-model="addForm.start_time" value="{{addForm.start_time}}"  placeholder="">
                        </div>
                    </div>
                    <div class="form-group gower-group">
                        <label for="inputEmail3" class="col-sm-2 control-label gower inputs"><span>*</span>结束时间:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control flatpickr glyphicon glyphicon-calendar" v-model="addForm.end_time" value="{{addForm.end_time}}" placeholder="">
                        </div>
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
        start_time: '',
        end_time: '',
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
      	$('.close').trigger('click');
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
          self.addForm.enabled = v.enabled,
          self.addForm.start_time = v.start_time,
          self.addForm.end_time = v.end_time
        };
      });
      this.initTime();
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
	    enabled :1,
	    start_time :'',
	    end_time :''
	  }
	  this.initTime();
    },

    // 时间控件
    initTime: function(){
		$(".flatpickr").flatpickr({
			enableTime: true,
			time_24hr: true,
			locale: zh.zh,
			defaultDate: new Date()
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
            promotion_id: id,
            weight: weight,
        };
        if ((weight == 0 || (index == 1 && type == 1)) && (this.$route.query.page == 1 || !this.$route.query.page)) {
          parent.Public.tips.init({type: 1, content: '已是第一项!'});
          return;
        };
        if ((this.pagination == this.page || this.pagination == 1) && this.list.length == index && (type == 3 || type == 4)) {
          parent.Public.tips.init({type: 1, content: '已是最后一项!'});
          return;
        };
        parent.Public.Ajax('/sort_promotion', params, 'GET', function(res){
            self.list = res.data;
        });
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
	      parent.Public.tips.init({content: '折扣率只允许输入1到99之间的整数'});
	      return;
	  };
	  if (!params.start_time) {
	      parent.Public.tips.init({content: '请输入折扣开始时间'});
	      return;
	  };
	  if (!params.end_time) {
	      parent.Public.tips.init({content: '请输入折扣结束时间'});
	      return;
	  };
      parent.Public.Ajax('/add_promotion', params, 'POST', function(res){
	  	$('.close').trigger('click');
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