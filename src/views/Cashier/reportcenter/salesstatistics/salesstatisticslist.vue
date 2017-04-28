<template>
	<div class="main-tit">
		<div class="sel-group input-group">
            <label for="" class="sel-kind">业务时间:</label>
            <input type="text" id="flatpickr" readonly class="form-control glyphicon glyphicon-calendar" v-model="params.date">
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">菜品分类:</label>
            <select class="form-control sel-add" v-model="params.category_id">
                <option value="-1" selected>全部</option>
                <option v-for="(i, v) in categoryList" value="{{v.category_id}}">{{v.name}}</option>
            </select>
        </div>
        <div class="sel-group">
            <label for="" class="sel-kind">排序方式:</label>
            <select class="form-control sel-add" v-model="params.order">
                <option value="sale_number" selected>销售数量</option>
                <option value="sale_amount">销售金额</option>
            </select>
        </div>
        <div class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="text" class="form-control admin-cast" id="" placeholder="请输入菜品名称或编码" v-model="params.keyword" @keyup="enterSearch($event)">
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
    			<li>菜品销售总数: {{total_dish}}</li>
    			<li>菜品销售总金额: {{total_amount}}</li>
    		</ul>
    	</div>
        <table class="table table-operation">
            <thead>
            <tr>
                <th width="2%"></th>
                <th width="8%">日期</th>
                <th width="12%">菜品名称</th>
                <th width="8%">菜品类别</th>
                <th width="6%">编码</th>
                <th width="6%">规格</th>
                <th width="7%">销售数量</th>
                <th width="7%">赠菜数量</th>
                <th width="7%">退菜数量</th>
                <th width="7%">菜品单价/元</th>
                <th width="7%">销售金额</th>
                <th width="7%">折扣金额</th>
                <th width="7%">应收金额</th>
                <th width="14%">今日收入占比</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(key, item) in list">
                <td class="sn">{{key + 1}}</td>
                <td>{{item.date}}</td>
                <td>{{item.dish_name}}</td>
                <td>{{item.dish_category_name}}</td>
                <td>{{item.dish_identifier}}</td>
                <td>{{item.dish_norm_name}}</td>
                <td>{{item.sale_number-item.cancel_number}}</td>
                <td>{{item.present_number}}</td>
                <td>{{item.cancel_number}}</td>
                <td>{{item.unit_price}}</td>
                <td>{{item.sale_amount}}</td>
                <td>{{item.discount_amount}}</td>
                <td>{{item.receive_amount}}</td>
                <td>{{item.income_proportion}}%</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

  name: 'salesstatisticslist',

  data () {
    return {
    	list: '',
    	params: {
    		date: parent.Public.getStartToNow(),
  			category_id: '-1',
  			order: 'sale_number',
  			keyword: '',
  			page: this.$route.query.page || 1,
    	},
    	categoryList: '',
    	total_dish: '0',
    	total_amount: '0'
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
        mode: "range",
				locale: zh.zh,
				defaultDate: parent.Public.getStartToNow(),
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
      parent.Public.exportFn(11);
    },
  	getList: function(){
  		var self = this;
      this.params.start_date = this.params.date.split('至')[0];
      this.params.end_date = this.params.date.split('至')[1];
  		var params = this.params;
  		parent.Public.Ajax('/stats_dish_list', params, 'GET', function(res){
  			self.categoryList = res.data.category;
  			self.list = res.data.list;
  			self.total_dish = res.data.total_dish;
  			self.total_amount = res.data.total_amount;
  			self.$dispatch('pagination', res.data.total_pages);
        self.$dispatch('total', res.data.total);
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