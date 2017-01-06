<template>
<div class="main-tit">
    <div class="btn-group dishes-group">
      <button type="button" class="btn btn-default dishes-but" data-toggle="modal" href="#add-edit-warehouse" data-toggle="dropdown" @click="saveId('', 'add')">
        新增
      </button>
    </div>
</div>
<div class="table-responsive">
  <table class="table table-operation" v-if="list">
    <thead>
        <tr>
            <th width="5%"></th>
            <th width="15%">操作</th>
            <th width="24%">仓库编号</th>
            <th width="27%">仓库名称</th>
            <th width="24%">状态</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(k,v) in list">
            <td>{{k + 1}}</td>
            <td>
              <a class="list-edit" data-toggle="modal" href="#remove-warehouse" @click="saveId(v.id)"></a>
              <a class="list-del" data-toggle="modal" href="#add-edit-warehouse" @click="saveId(v.id, 'edit')"></a>
            </td>
            <td>{{v.warehouseSn}}</td>
            <td>{{v.warehouseName}}</td>
            <td @click='changeStatus(v.id)'>
              <button type="button" class="btn btn-primary btn-status" v-if="v.status == 1">{{v.storeType}}</button>
              <button v-else class="btn btn-default btn-status">{{v.storeType}}</button>
            </td>
        </tr>
    </tbody>
  </table>
</div>
<!-- 添加/修改单单位 start -->
<div class="modal fade" id="add-edit-warehouse">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">添加/修改库房</h4>
      </div>
      <div class="modal-body">
        <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-2 control-label gower inputs">库房编号:</label>
            <div class="col-sm-10">
              <input type="text" name="" class="form-control" value="" v-model="warehouse.sn">
            </div>
        </div>
        <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-2 control-label gower inputs">库房名称:</label>
            <div class="col-sm-10">
              <input type="text" name="" class="form-control" value="" v-model="warehouse.name">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addWarehouse">保存</button>
      </div>
    </div>
  </div>
</div>
<!-- 添加单单位 end -->
<!-- 删除单位 start -->
<div class="modal fade tips" id="remove-warehouse">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">移除</h4>
        </div>
        <div class="modal-body">
          是否确定删除该库房!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeWarehouse">确认</button>
        </div>
      </div>
    </div>
  </div>
<!-- 删除单位 end -->
</template>

<script>
export default {

  name: 'warehouseManagement',

  data () {
    return {
      list: '',
      warehouse: {
        sn: '',
        name: ''
      },
      warehouseId: ''
    };
  },
  created: function(){
  	this.getList();
  },
  methods: {
    // 获取当前列表
    getList: function(){
      var self = this;
      var params = {
        currentShopId: $cookie('shopId'),
      };
      parent.Public.Ajax('/warehouse_list', params, 'GET', function(res){
         self.list = res.data.list;
         store('warehouseList', self.list);
      });
    },
    // 存储当前id
    saveId: function(id, type){
      var self = this;
      this.warehouseId = !id ? '' : id;
      if (type == 'edit') {
        $.each(store('warehouseList'), function(i, v) {
           if (v.id == id) {
            self.warehouse = {
              sn: v.warehouseSn,
              name: v.warehouseName
            }
           };
        });
      } else {
        self.warehouse = {
          sn: '',
          name: ''
        }
      };
    },
    // 添加/编辑库房
    addWarehouse: function(){
      var self = this;
      var params = {
        currentShopId: $cookie('shopId'),
        warehouseName: self.warehouse.name,
        warehouseSn: self.warehouse.sn,
        id: self.warehouseId
      };
      parent.Public.Ajax('/warehouse_set_up', params, 'POST', function(res){
         self.getList();
      });
    },
    // 删除当前库房
    removeWarehouse: function(){
      var self = this;
      var params = {
        currentShopId: $cookie('shopId'),
        warehouseId: this.warehouseId
      };
      parent.Public.Ajax('/warehouse_delete', params, 'GET', function(res){
         self.getList();
      });
    },
    // 更改当前状态
    changeStatus: function(id){
      var self = this;
      var params = {
        warehouseId: id
      };
      parent.Public.Ajax('/warehouse_status_set_up', params, 'POST', function(res){
         self.getList();
      });
    },
  },
};
</script>

<style lang="css" scoped>
.btn-status.btn-primary{
  padding: 3px 7px;
  background-color: #1d9ee5;
  border-color: #1d9ee5;
}
.btn-status.btn-default{
  padding: 3px 7px;
  background-color: #e4e8ec;
  border: 1px solid #e4e8ec;
}
.list-edit{
  margin-right: 30%;
}
</style>