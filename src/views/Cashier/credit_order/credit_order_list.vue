<template>
	<div class="main-tit">
		<div class="sel-group input-group">
            <label for="" class="sel-kind">业务时间:</label>
            <input type="text" id="flatpickr" readonly class="form-control glyphicon glyphicon-calendar" v-model="params.date">
        </div>
        <form class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="text" class="form-control admin-cast" id="" placeholder="请输入客户名称" v-model="params.keyword">
            </div>
        </form>
        <div class="btn-group dishes-group">
            <button type="button" class="btn btn-default dishes-but" @click="searchFn">
                搜索
            </button>
            <!-- <button type="button" class="btn btn-default dishes-but" @click="exportFn">
                导出表格
            </button> -->
        </div>
    </div>
    <div class="table-responsive">
    	<div class="table-title">
    		<ul>
    			<li>挂账金额总计: {{ total_amount }}</li>
    		</ul>
    	</div>
        <table class="table table-operation">
            <thead>
            <tr>
            	<th width="2%"></th>
                <th width="10%">客户名称</th>
                <th width="10%">挂账时间</th>
                <th width="10%">订单号</th>
                <th width="10%">挂账金额</th>
                <th width="10%">结账流水号</th>
                <th width="10%">收银员</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, item) in list">
          	   <td class="sn">{{key + 1}}</td>
                <td>{{item.customer_name}}</td>
                <td>{{item.create_time}}</td>
                <td>{{item.identifier}}</td>
                <td>{{item.receive_amount}}</td>
                <td>{{item.checkout_number}}</td>
                <td>{{item.cashier}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

  name: 'credit_order_list',

  data () {
    return {
    	list: '',
    	params: {
    		date: parent.Public.getStartToNow(),
  			keyword: '',
  			page: this.$route.query.page || 1,
    	},
    	total_amount: 0
    };
  },
  created: function(){
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
  	// 搜索
  	searchFn: function(){
  		this.getList();
  	},
  	initTime: function(){
  		$(function(){
			$("#flatpickr").flatpickr({
				locale: zh.zh,
        defaultDate: parent.Public.getStartToNow(),
        mode: "range"
			});
  		});

  	},
    // 导出
    exportFn: function(){
      // parent.Public.exportFn(12);
    },
  	getList: function(){
  		var self = this;
      this.params.start_date = this.params.date.split('至')[0];
      this.params.end_date = this.params.date.split('至')[1];
  		var params = this.params;
  		parent.Public.Ajax('/credit_order_list', params, 'GET', function(res){
  			self.$dispatch('pagination', res.data.total_pages);
  			self.list = res.data.list;
  			self.total_amount = res.data.total_amount;
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
	width: auto;
	background: #fff;
}
</style>