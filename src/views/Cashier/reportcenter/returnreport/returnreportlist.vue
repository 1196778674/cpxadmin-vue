<template>
	<div class="main-tit">
		<div class="sel-group input-group">
            <label for="" class="sel-kind">业务时间:</label>
            <input type="text" readonly class="form-control flatpickr glyphicon glyphicon-calendar" v-model="params.date">
        </div>
        <div class="form-inline search-num" role="form">
            <div class="form-group">
                <input type="text" class="form-control admin-cast" id="" placeholder="请输入菜品名称或编号" v-model="params.keyword" @keyup="enterSearch($event)">
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
        <table class="table table-operation">
            <thead>
	            <tr>
	            	<th width="2%"></th>
	                <th width="8%">日期</th>
	                <th width="10%">单号</th>
	                <th width="10%">桌号</th>
	                <th width="10%">菜品名称</th>
	                <th width="10%">菜品类别</th>
	                <th width="10%">菜品编码</th>
	                <th width="8%">规格</th>
	                <th width="8%">退菜数量</th>
	                <th width="8%">服务员</th>
	                <th width="18%">退菜理由</th>
	            </tr>
            </thead>
            <tbody>
				<tr v-for="(key, item) in list">
                    <td class="sn">{{key + 1}}</td>
                    <td>{{item.date}}</td>
					<td>{{item.identifier}}</td>
					<td>{{item.area_name}}-{{item.table_name}}</td>
					<td>{{item.dish_name}}</td>
					<td>{{item.category_name}}</td>
					<td>{{item.dish_identifier}}</td>
					<td>{{item.norm_name}}</td>
					<td>{{item.cancel_number}}</td>
					<td>{{item.waiter_name}}</td>
					<td>{{item.cancel_reason}}</td>
				</tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

  name: 'returnreportlist',

  data () {
    return {
    	list: '',
    	params: {
    		date: parent.Public.getStartToNow(),
  			keyword: '',
  			page: this.$route.query.page || 1,
    	},
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
  		var self = this;
  		$(function(){
			$(".flatpickr").flatpickr({
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
      parent.Public.exportFn(14);
    },
  	getList: function(){
  		var self = this;
  		this.params.start_date = this.params.date.split('至')[0];
  		this.params.end_date = this.params.date.split('至')[1];
  		var params = this.params;
  		parent.Public.Ajax('/stats_cancel_dish_list', params, 'GET', function(res){
  			self.$dispatch('pagination', res.data.total_pages);
        self.$dispatch('total', res.data.total);
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
.flatpickr{
	float: left;
	width: 225px;
	font-size: 12px;
	background: #fff;
}
</style>