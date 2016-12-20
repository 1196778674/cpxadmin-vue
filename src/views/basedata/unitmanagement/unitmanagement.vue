<template>
	<div class="cpx-materialinit" :style='{height: bodyheight}'>
		<div class="material-top form-inline">
	    	<div class="form-group">
	    		<label for="">计量单位:</label>
	    		<input type="email" class="form-control" id="" placeholder="请输入单位名称">
	    	</div>
	    	<button type="submit" class="btn btn-primary">搜索</button>
	  	</div>
		<div class="unit-list">
			<div class="unit" :style="{height: unitheight}">
				<div class="form-group">
		    		<label for="">单计量单位:</label>
		    		<button type="submit" class="btn btn-primary">新增</button>
		    	</div>
		    	<table class="table table-operation">
		    		<thead>
		    			<tr>
		    				<th width="2%"></th>
		    				<th width="10%">操作</th>
		    				<th width="65%">计量单位名称</th>
		    			</tr>
		    		</thead>
		    		<tbody>
		    			<tr>
		    				<td>1</td>
		    				<td>
								<a class="list-edit"></a>
        						<a class="list-del"></a>
		    				</td>
		    				<td>个</td>
		    			</tr>
		    		</tbody>
		    	</table>
			</div>
			<div class="units" :style="{height: unitheight}">
				<div class="form-group">
		    		<label for="">多计量单位:</label>
		    		<button type="submit" class="btn btn-primary">新增</button>
		    	</div>
		    	<table class="table table-operation">
		    		<thead>
		    			<tr>
		    				<th width="2%"></th>
		    				<th width="10%">操作</th>
		    				<th width="65%">计量单位名称</th>
		    			</tr>
		    		</thead>
		    		<tbody>
		    			<tr>
		    				<td>1</td>
		    				<td>
								<a class="list-edit"></a>
        						<a class="list-del"></a>
		    				</td>
		    				<td>个,斤,吨</td>
		    			</tr>
		    		</tbody>
		    	</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'unitmanagement',

  data () {
    return {

    };
  },
  created: function(){
    this.bodyheight = ($(window).height() - 140) + 'px';
    this.unitheight = (($(window).height() - 200) / 2) + 'px';
  },
};
</script>

<style lang="css" scoped>
.material-top{
	text-align: left;
	border-bottom: 1px solid #dedede;
}
.list-edit{
	margin-right: 38%;
}
</style>