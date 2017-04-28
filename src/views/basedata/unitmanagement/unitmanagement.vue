<template>
	<div class="cpx-materialinit" :style='{height: bodyheight}'>
		<div class="material-top form-inline">
	    	<div class="form-group">
	    		<label for="">计量单位:</label>
	    		<input type="text" class="form-control" v-model="unitName" placeholder="请输入单位名称">
	    	</div>
	    	<button type="submit" class="btn btn-primary" @click="search">搜索</button>
	  	</div>
		<div class="unit-list">
			<div class="unit" :style="{height: unitheight}">
				<div class="form-group add-div">
		    		<label for="">单计量单位:</label>
		    		<button type="submit" class="btn btn-primary" data-toggle="modal" href="#add-edit-unit" @click="addEditUnit('add')">新增</button>
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
		    			<tr v-for="(k,v) in unitList">
		    				<td>{{k + 1}}</td>
		    				<td>
								<a class="list-edit" @click="removeUnit(v.id, '0')" data-toggle="modal" href="#remove-unit"></a>
        						<a class="list-del" data-toggle="modal" href="#add-edit-unit" @click="addEditUnit('edit', v.id, v.name)"></a>

		    				</td>
		    				<td>{{v.name}}</td>
		    			</tr>
		    		</tbody>
		    	</table>
			</div>
			<div class="units" :style="{height: unitheight}">
				<div class="form-group">
		    		<label for="">多计量单位:</label>
		    		<button type="submit" class="btn btn-primary" data-toggle="modal" href="#add-edit-unitGroup" @click="addEditUnitGroup('add', '')">新增</button>
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
		    			<tr v-for="(k,v) in unitGroupList">
		    				<td>{{k + 1}}</td>
		    				<td>
								<a class="list-edit" @click="removeUnit(v.id, '1')" data-toggle="modal" href="#remove-unit"></a>
        						<a class="list-del" data-toggle="modal" href="#add-edit-unitGroup" @click="addEditUnitGroup('edit', v.id)"></a>
		    				</td>
		    				<td>{{v.name}}</td>
		    			</tr>
		    		</tbody>
		    	</table>
			</div>
		</div>
	</div>
	<!-- 添加单单位 start -->
	<div class="modal fade" id="add-edit-unit" data-backdrop='static'>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">{{unitText.title}}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group gower-group">
		                <label for="inputEmail3" class="col-sm-2 control-label gower inputs">{{unitText.btn}}单单位:</label>
		                <div class="col-sm-10">
		                  <input type="text" name="" class="form-control" value="{{addUnitName}}" v-model="addUnitName">
		                </div>
		            </div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" @click="subUnitName">{{unitText.btn}}</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 添加单单位 end -->
	<!-- 添加多单位 start -->
	<div class="modal fade" id="add-edit-unitGroup" data-backdrop='static'>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title">{{unitGroupText.title}}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group gower-group">
		                <label for="inputEmail3" class="col-sm-2 control-label gower inputs">{{unitGroupText.btn}}多单位:</label>
		                <div class="col-sm-4">
		                  <input type="text" name="" class="form-control" value="{{addUnitName}}" v-model="addUnitName">
		                </div>
		                <div class="col-sm-6">
		                  <p style="line-height: 30px;margin-bottom: 0px;">基本单位应为最小度量单位</p>
		                </div>
		            </div>
		            <div class="form-group gower-group" v-for="(k,v) in auxiliaryUnitGroup">
		            	<label for="inputEmail3" class="col-sm-2 control-label gower inputs"><a class="list-edit add-model" @click="deleteAuxiliaryUnit(k)"></a>第{{k + 1}}单位:</label>
		                <div class="col-sm-4">
		                	<div class="input-group">
						      	<div class="input-group-addon">1</div>
						      	<input class="form-control" type="text" v-model="v.unit" placeholder="">
						    </div>
		                </div>
		                <span style="float:left;line-height:30px;">=</span>
		                <div class="col-sm-4">
		                  	<input type="text" name="" class="form-control" v-model="v.proportion" value="{{v.proportion}}">
		                </div>
		                <span style="float:left;line-height:35px;">{{addUnitName}}</span>
		            </div>
		            <div class="form-group gower-group" style="margin-top: 10px;">
						<button type="button" class="btn btn-primary col-sm-offset-2" @click="addAuxiliaryUnit">添加单位</button>
		            </div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" @click="subUnitGroupName">{{unitGroupText.btn}}</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 添加多单位 end -->
	<!-- 删除单位 start -->
	<div class="modal fade tips" id="remove-unit" data-backdrop='static'>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">移除</h4>
          </div>
          <div class="modal-body">
            是否确定删除该单位!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-danger" @click="removeUnitBtn">确认</button>
          </div>
        </div>
      </div>
    </div>
	<!-- 删除单位 end -->
</template>

<script>
export default {

  name: 'unitmanagement',

  data () {
    return {
    	unitList: '',
    	unitGroupList: '',
    	unitName: '',
    	unitText: {
    		title: '添加单单位',
    		btn: '添加'
    	},
    	unitGroupText: {
    		title: '添加多单位',
    		btn: '添加'
    	},
    	unitId: '',
    	addUnitName: '',
    	unitGroupId: '',
    	addUnitGroupName: '',
    	auxiliaryUnitGroup: [{unit: '', proportion: ''}]
    };
  },
  created: function(){
    this.bodyheight = ($(window).height() - 140) + 'px';
    this.unitheight = (($(window).height() - 200) / 2) + 'px';
    // 加载单位列表
    this.search();
  },
  methods: {
  	// 搜索单，多单位
  	search: function(){
  		var self = this;
  		var params = {
  			unitName: self.unitName
  		};
  		parent.Public.Ajax('/material_unit_search_list', params, 'GET', function(res){
  			self.unitList = res.data.unit;
  			self.unitGroupList = res.data.unitgroup;
  			store('unitList', res.data.unit);
  			store('unitGroupList', res.data.unitgroup);
  		});
  	},
  	// 删除单位
  	removeUnit: function(id, type){
  		if (type == '1') {
  			this.unitGroupId = id;
  			this.unitId = '';
  		} else {
  			this.unitGroupId = '';
  			this.unitId = id;
  		};
  	},
  	// 编辑单单位时存储id
  	addEditUnit: function(type, id, name){
  		if (type == 'add') {
  			this.unitText = {
	  			title: '添加单单位',
	  			btn: '添加'
	  		}
  		} else {
  			this.unitText = {
	  			title: '修改单单位',
	  			btn: '修改'
	  		}
  		};
  		this.unitId = id;
  		this.addUnitName = name;
  	},
  	// 编辑多单位时存储id，name
  	addEditUnitGroup: function(type, id){
  		var self = this;
  		if (type == 'add') {
  			self.unitGroupText = {
	  			title: '添加多单位',
	  			btn: '添加'
	  		}
        self.auxiliaryUnitGroup = [{unit: '', proportion: ''}];
        self.addUnitName = '';
        self.unitGroupId = '';
        return;
  		} else {
  			self.unitGroupText = {
	  			title: '修改多单位',
	  			btn: '修改'
	  		}
        self.unitGroupId = id;
        parent.Public.Ajax('/material_unit_group_edit_data', {id: id}, 'GET', function(res){
          self.auxiliaryUnitGroup = res.data.splice(1,res.data.length - 1);
          self.addUnitName = res.data[0].unit;
        });
  		};
  	},
  	// 提交单单位数据
  	subUnitName: function(){
  		var self = this;
  		var params = {
  			unitName: self.addUnitName,
  			unitId: self.unitId
  		};
  		parent.Public.Ajax('/material_unit_set', params, 'GET', function(res){
        $('.close').trigger('click');
  			self.unitList = res.data.unit;
  			self.unitName = '';
  		});
  	},
  	// 提交多单位数据
  	subUnitGroupName: function(){
  		var self = this;
  		var unitList = [self.addUnitName],
  		    proportionList = [1];
  		$.each(self.auxiliaryUnitGroup, function(i, v) {
  			unitList.push(v.unit);
  			proportionList.push(v.proportion);
  		});
  		var params = {
        unitGroupId: self.unitGroupId,
  			unit: unitList,
  			proportion: proportionList
  		};
  		parent.Public.Ajax('/material_unit_group_set', params, 'GET', function(res){
        $('.close').trigger('click');
  			self.unitGroupList = res.data.unitGroup;
  			store('unitGroupList', res.data.unitGroup);
  		});
  	},
  	// 删除当前单位
  	removeUnitBtn: function(){
  		var self = this;
  		var params = {
  			unitId: self.unitId,
  			unitGroupId: self.unitGroupId
  		};
  		parent.Public.Ajax('/material_unit_delete', params, 'GET', function(res){
        $('.close').trigger('click');
  			self.unitList = res.data.unit;
  			self.unitGroupList = res.data.unitGroup;
  			store('unitList', res.data.unit);
  			store('unitGroupList', res.data.unitgroup);
  		});
  	},
  	// 添加辅单位
  	addAuxiliaryUnit: function(){
  		var obj = {unit: '', proportion: ''};
  		this.auxiliaryUnitGroup.push(obj);
  	},
  	// 删除辅单位
  	deleteAuxiliaryUnit: function(id){
  		if (this.auxiliaryUnitGroup.length == 1) {
  			return;
  		};
  		this.auxiliaryUnitGroup.splice(id, 1);
  	},
  },
};
</script>

<style lang="css" scoped>
.material-top{
	text-align: left;
	border-bottom: 1px solid #dedede;
  padding-bottom: 15px;
}
.list-edit{
	margin-right: 38%;
}
.list-edit.add-model{
    float: left;
    vertical-align: middle;
    margin-top: 10px;
    margin-right: 5px;
    margin-left: -5px;
}
</style>