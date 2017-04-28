<template>
	<div class="main-tit">
		<div class="sel-group input-group">
            <label for="" class="sel-kind">业务时间:</label>
            <input type="text" id="flatpickr" readonly class="form-control glyphicon glyphicon-calendar" v-model="params.date">
        </div>
        <div class="btn-group dishes-group">
            <button type="button" class="btn btn-default dishes-but" @click="searchFn()">
                搜索
            </button>
            <button type="button" class="btn btn-default dishes-but" @click="exportFn()">
                导出表格
            </button>
        </div>
    </div>
    <div class="table-responsive" v-for="(key, item) in listAll">
    	<div v-if="key == 'summary'">
    		<p class="table-title">汇总表</p>
			<table class="table table-operation" v-if="listAll.summary">
				<thead>
		            <tr>
		                <th width="10%">销售总金额</th>
		                <th width="15%">菜品销售总数</th>
		                <th width="10%">就餐人数</th>
		                <th width="10%">订单总数</th>
		                <th width="15%">最高客单价</th>
		                <th width="10%">最低客单价</th>
		                <th width="10%">平均客单价</th>
		            </tr>
	            </thead>
	            <tbody>
	            	<tr>
	            		<td>{{listAll.summary.total_amount}}</td>
	            		<td>{{listAll.summary.dish_number}}</td>
	            		<td>{{listAll.summary.people_number}}</td>
	            		<td>{{listAll.summary.order_number}}</td>
	            		<td>{{listAll.summary.max_per_ticket_sales}}</td>
	            		<td>{{listAll.summary.min_per_ticket_sales}}</td>
	            		<td>{{listAll.summary.avg_per_ticket_sales}}</td>
	            	</tr>
	            </tbody>
			</table>
			<p v-else>当前数据为空!</p>
    	</div>
    	<div v-if="key == 'list'">
			<div v-for="(j, val) in listAll.list">
				<div v-if="val.id == 1">
					<p class="table-title">{{val.name}}</p>
					<table class="table table-operation" v-if="val.list.length">
						<thead>
				            <tr>
				                <th width="15%">支付方式</th>
				                <th width="10%" v-for="(ji,jv) in val.list">{{jv.name}}</th>
				            </tr>
			            </thead>
			            <tbody>
			            	<tr>
			            		<td style="font-size: 14px;">支付金额</td>
			            		<td v-for="(ji,jv) in val.list">{{jv.amount}}</td>
			            	</tr>
			            	<tr>
			            		<td style="font-size: 14px;">支付占比</td>
			            		<td v-for="(ji,jv) in val.list">{{jv.proportion}}%</td>
			            	</tr>
			            </tbody>
					</table>
					<p v-else>当前数据为空!</p>
				</div>
                <div v-if="val.id == 3">
                    <p class="table-title">{{val.name}}</p>
                    <table class="table table-operation" v-if="val.list.length">
                        <thead>
                        <tr>
                            <th width="10%">区域名称</th>
                            <th width="10%" v-for="(ji,jv) in val.list">{{jv.name}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="font-size: 14px;">就餐人数</td>
                            <td v-for="(ji,jv) in val.list">{{jv.number}}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px;">销售金额</td>
                            <td v-for="(ji,jv) in val.list">{{jv.amount}}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px;">销售占比</td>
                            <td v-for="(ji,jv) in val.list">{{jv.proportion}}%</td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px;">账单数量</td>
                            <td v-for="(ji,jv) in val.list">{{jv.order_number}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p v-else>当前数据为空!</p>
                </div>
				<div v-if="val.id == 2">
					<p class="table-title">{{val.name}}</p>
					<table class="table table-operation" v-if="val.list.length">
						<thead>
				            <tr>
				                <th width="10%">分类名称</th>
				                <th width="10%" v-for="(ji,jv) in val.list">{{jv.name}}</th>
				            </tr>
			            </thead>
			            <tbody>
			            	<tr>
			            		<td style="font-size: 14px;">销售数量</td>
			            		<td v-for="(ji,jv) in val.list">{{jv.number}}</td>
			            	</tr>
			            	<tr>
			            		<td style="font-size: 14px;">销售金额</td>
			            		<td v-for="(ji,jv) in val.list">{{jv.amount}}</td>
			            	</tr>
			            	<tr>
			            		<td style="font-size: 14px;">销售占比</td>
			            		<td v-for="(ji,jv) in val.list">{{jv.proportion}}%</td>
			            	</tr>
			            </tbody>
					</table>
					<p v-else>当前数据为空!</p>
				</div>
                <div v-if="val.id == 4">
                    <p class="table-title">{{val.name}}</p>
                    <table class="table table-operation" v-if="val.list.length">
                        <thead>
                        <tr>
                            <th width="10%">部门名称</th>
                            <th width="10%" v-for="(ji,jv) in val.list">{{jv.name}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="font-size: 14px;">销售数量</td>
                            <td v-for="(ji,jv) in val.list">{{jv.number}}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px;">销售金额</td>
                            <td v-for="(ji,jv) in val.list">{{jv.amount}}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 14px;">销售占比</td>
                            <td v-for="(ji,jv) in val.list">{{jv.proportion}}%</td>
                        </tr>
                        </tbody>
                    </table>
                    <p v-else>当前数据为空!</p>
                </div>
			</div>
    	</div>
    </div>
</template>

<script>
export default {

  name: 'dailysummarylist',

  data () {
    return {
    	listAll: '',
    	params: {
    		date: parent.Public.getStartToNow()
    	},
    };
  },
  created: function(){
  	// this.params.date = parent.Public.getNow();
  	// 获取表单
  	this.getList();
  	// 初始化时间
  	this.initTime();
  },
  methods: {
  	// 搜索
  	searchFn: function(){
  		this.getList();
  	},
  	initTime: function(){
  		$(function(){
			$("#flatpickr").flatpickr({
				locale: zh.zh,
				defaultDate: parent.Public.getStartToNow(),
    		mode: "range",
        onChange: function(selectedDates, dateStr, instance){
          if (dateStr.indexOf('至') > '-1') {
            instance.close();
          };
        }
			});
  		});

  	},
  	getList: function(){
  		var self = this;
  		this.params.start_date = this.params.date.split('至')[0];
      	this.params.end_date = this.params.date.split('至')[1];
  		var params = this.params;
  		parent.Public.Ajax('/stats_sale_list', params, 'GET', function(res){
  			self.listAll = res.data;
  		});
  	},
  	// 导出
  	exportFn: function(){
  		parent.Public.exportFn(13);
  	},

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
  width: 225px;
  font-size: 12px;
  background: #fff;
}
.table-title{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #dedede;
	margin-bottom: 0;
	font-size: 15px;
	color: #1d9ee5;
	font-weight: 500;
}
</style>