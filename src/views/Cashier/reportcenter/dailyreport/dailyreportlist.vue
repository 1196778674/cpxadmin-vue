<template>
	<div class="main-tit">
		<div class="sel-group input-group">
            <label for="" class="sel-kind">业务时间:</label>
            <input type="text" id="flatpickr" readonly class="form-control glyphicon glyphicon-calendar" v-model="params.date">
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">排序方式:</label>
            <select class="form-control sel-add" v-model="params.order">
                <option value="create_time" selected>就餐时间</option>
                <option value="per_ticket_sales">客单价</option>
                <option value="pay_amount">消费金额</option>
                <option value="male_duration">就餐时长</option>
            </select>
        </div>
        <div class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="text" class="form-control admin-cast" id="" placeholder="请输入单号名称/服务员/收银员等" v-model="params.keyword" @keyup="enterSearch($event)">
            </div>
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
    <div class="table-responsive">
    	<div class="table-title">
    		<ul>
    			<li>订单销售总金额: {{total_amount}}</li>
    			<li>就餐总人数: {{total_peoples}}</li>
    			<li>平均客单价: {{avg_per_ticket_sales}}</li>
    		</ul>
    	</div>
        <table class="table table-operation">
            <thead>
            <tr>
            	<th width="2%"></th>
                <th width="6%">日期</th>
                <th width="10%">单号</th>
                <th width="6%">桌号</th>
                <th width="4%">人数</th>
                <th width="6%">服务员</th>
                <th width="6%">就餐时间</th>
                <th width="6%">就餐时长</th>
                <th width="6%">菜品数量</th>
                <th width="6%">消费金额</th>
                <th width="6%">折扣金额</th>
                <th width="6%">抹零金额</th>
                <th width="6%">应收金额</th>
                <th width="6%">发票税额</th>
                <th width="6%">收银员</th>
                <th width="6%">客单价</th>
                <th width="8%">付款详情</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, item) in list">
          	   <td class="sn">{{key + 1}}</td>
                <td>{{item.date}}</td>
                <td>{{item.identifier}}</td>
                <td>{{item.area_name}}-{{item.table_name}}</td>
                <td>{{item.peoples}}</td>
                <td>{{item.waiter_name}}</td>
                <td>{{item.create_time}}--{{item.checkout_time}}</td>
                <td>{{item.male_duration}}</td>
                <td>{{item.dishes}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.discount_amount}}</td>
                <td>{{item.give_amount}}</td>
                <td>{{item.receive_amount}}</td>
                <td>{{item.tax_amount}}</td>
                <td>{{item.cashier}}</td>
                <td>{{item.per_ticket_sales}}</td>
                <td>
                    <span v-for="row in item.payment">
                        {{row.pay_channel_name}}:{{row.pay_amount}}<br>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

  name: 'dailyreportlist',

  data () {
    return {
    	list: '',
    	params: {
    		date: parent.Public.getStartToNow(),
  			order: 'create_time',
  			keyword: '',
  			page: this.$route.query.page || 1,
    	},
    	avg_per_ticket_sales: '0',
    	total_amount: '0',
    	total_peoples: '0',
    };
  },
  created: function(){
  	// this.params.date = parent.Public.getNow();
  	// 获取表单
  	this.getList();
  	// 初始化时间
  	this.initTime();
  },
  events: {
    // 获取当前页码
  	page: function(page) {
  		this.params.page = page;
  		this.getList();
  	},
  },
  methods: {
    // 回车事件
    enterSearch: function(e){
      var keyCode = e.keyCode;
      if (keyCode == 13) {
        this.getList();
      };
    },
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
    // 导出
    exportFn: function(){
      parent.Public.exportFn(12);
    },
  	getList: function(){
  		var self = this;
      this.params.start_date = this.params.date.split('至')[0];
      this.params.end_date = this.params.date.split('至')[1];
  		var params = this.params;
  		parent.Public.Ajax('/stats_order_list', params, 'GET', function(res){
  			self.$dispatch('pagination', res.data.total_pages);
        self.$dispatch('total', res.data.total);
  			self.avg_per_ticket_sales = res.data.avg_per_ticket_sales;
  			self.total_amount = res.data.total_amount;
  			self.total_peoples = res.data.total_peoples;
  			self.list = res.data.list;
        if (!res.data.list.length) {
          parent.Public.tips.init({type: 2, content: '当前数据为空'});
        };
  		});
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
</style>