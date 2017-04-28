<template>
	<div class="cpx-materialinit systemParameter" :style='{height: bodyheight}'>
		<div class="form-group group-both">
			<label class="col-md-3 control-label text-title" for="">是否启用多仓库:</label>
			<div class="checkbox col-md-9">
				<label @click="isCloseWarehouse">
					<input type="checkbox" value="" v-model="warehouseStatus">
					启用多仓库
				</label>
			</div>
		</div>
		<div class="form-group btn-save">
			<button type="button" class="btn btn-primary col-md-3 text-title" @click="saveSet">保存</button>
		</div>
	</div>
</template>

<script>
export default {

  name: 'systemParameter',

  data () {
    return {
    	warehouseStatus: '',
    	isAllowOperation: ''
    };
  },
  created: function(){
  	this.bodyheight = ($(window).height() - 140) + 'px';
  	this.getStatus();
  },
  methods: {
  	// 获取是否开启多仓库和可否关闭多仓库状态
  	getStatus: function(){
  		var self = this;
  		var url = '/system_parameter_list';
  		parent.Public.Ajax(url, {}, 'GET', function(res){
  			var datas = res.data.isOpenWareHouse;
  			self.warehouseStatus = datas.isOpenWareHouse;
  			self.isAllowOperation = datas.isAllowOperation;
  		});
  	},
  	// 是否可关闭多仓库
  	isCloseWarehouse: function(){
  		if (!this.isAllowOperation) {
  			parent.Public.tips.init({content: '多个仓库存在关联，无法关闭多仓库模式'});
  			this.warehouseStatus = !this.warehouseStatus;
  		}
  	},
  	// 保存当前设置
  	saveSet: function(){
  		var url = '/system_parameter';
  		var params = {
  			isOpenWareHouse: this.warehouseStatus
  		};
  		parent.Public.Ajax(url, {params: params}, 'POST', function(res){
  			parent.Public.tips.init({type: 3, content: '保存成功'});
  		});
  	},
  }
};
</script>

<style lang="css" scoped>
.systemParameter{
	padding: 20px;
	padding-top: 40px;
}
.group-both{
	overflow: hidden;
}
.text-title{
	text-align: left;
	width: auto;
}
.checkbox{
	margin-top: 5px;
}
.btn-save{
	clear: both;
	margin-left: 15px;
	margin-top: 30px;
}
</style>