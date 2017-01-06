<template>
<button v-if="isActive != 0" type="button" class="btn btn-default dishes-but register-but register-sure" data-toggle="dropdown" @click="saveSet">
      保存
</button>
<div class="mian-foot">
  <!-- 数据字典 start -->
  <div v-if="isActive == 0">
    <div class="parm-Remarks" v-for="(key, value) in list">
      <h4>{{value.name}}</h4>
      <div class="parm-single" v-for="(k, v) in value.list">
        <p>{{v.name}}</p>
        <div class="parm-butt">
            <span class="parm-add" data-toggle="modal" href='#dish_remarks_modal' @click='saveEdit(v.dish_remarks_id, v.name, value.name)'></span>
            <span class="parm-del" data-toggle="modal" href='#delete-notes' @click='saveEdit(v.dish_remarks_id)'></span>
        </div>
      </div>
      <div class="parm-single" data-toggle="modal" href='#dish_remarks_modal' @click='saveEditTaste(value.id,value.name)'>
        <span class="single-add"></span>
      </div>
    </div>
  </div>
  <!-- 数据字典 end -->
  <!-- 结账收银 start -->
  <div v-if="isActive == 1">
    <div class="register-data">
      <div class="form-group col-sm-4" v-for="(k,v) in list.list">
        <label for="" class="sel-kind col-sm-6 inputs">{{v.name}}</label>
        <select class="form-control sel-add col-sm-4" style="color:#555;" v-model="v.selected">
          <option v-for="(i,e) in v.list" value="{{e.id}}">{{e.name}}</option>
        </select>
      </div>
    </div>
    <div class="register-footer">
      <div class="checkbox">
        <label>
          <input type="checkbox" value="" v-model="display_shop">
          单据底部是否显示店铺信息
        </label>
      </div>
      <ul>
        <li>电话：{{list.phone}}</li>
        <li>地址：{{list.address}}</li>
      </ul>
    </div>
  </div>
  <!-- 结账收银 end -->
  <!-- 单据参数 start -->
  <div v-if="isActive == 2">
    <div class="register-data">
      <div class="form-group col-sm-4">
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">开发票默认税率:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="sRate" value="" id="" placeholder="">
            <span class="form-control-feedback" style="top:1px;right:10px;">%</span>
          </div>
        </div>
      </div>
      <div class="form-group col-sm-4" v-for="(k,v) in list.listType">
        <label for="" class="sel-kind col-sm-3 gower inputs">{{v.name}} :</label>
        <select class="form-control sel-add col-sm-6" style="color:#555;" v-model="v.selected">
          <option v-for="(i,e) in v.list" value="{{e.id}}">{{e.name}}</option>
        </select>
      </div>
      <div class="form-group col-sm-4">
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">单据起始编号:</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="sNumber" value="" id="" placeholder="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 单据参数 end -->

  <!-- 数据字典添加编辑 modal start -->
  <div class="modal fade" id="dish_remarks_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">添加/编辑{{notesTaste}}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-2 control-label gower inputs">{{notesTaste}}</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="notesValue" value="" id="" placeholder="">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" @click="saveNote">保存</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 数据字典添加编辑 modal end -->
  <!-- 删除模板 start -->
  <div class="modal fade tips" id="delete-notes">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" href="#delete-staff" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">删除</h4>
        </div>
        <div class="modal-body">
          是否删除当前记录!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove">删除</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 删除模板 end -->
</div>
</template>

<script>
export default {

  name: 'parameterlist',

  data () {
    return {
      list :'',
      isActive: '0',
      notesTaste: '',
      notesId: '',
      notesValue: '',
      markType : '',
      sRate: '',
      sNumber: '',
      display_shop:''
    };
  },
  events: {
    activeEq: function(i){
      if (i == 0) {
        this.getList('/dish_remarks_list');
      };
      if (i == 1 || i == 2) {
        this.getList('/bill_set_list', i);
      };
      this.isActive = i;
    }
  },
  created: function(){
    if (this.$route.params.id == 0) {
      this.getList('/dish_remarks_list');
    };
    if (this.$route.params.id == 1 || this.$route.params.id == 2) {
      this.getList('/bill_set_list', this.$route.params.id);
    };
  },
  methods : {
    // 获取列表
    getList: function(url, id){
      var self = this;
      self.isActive = self.$route.params.id;
      var params = {
        selectType: id
      };
       parent.Public.Ajax(url, params, 'GET', function(res){
         self.list = res.data;
         self.sRate = res.data.bill_reate;
         self.sNumber = res.data.bill_start_number;
         self.display_shop = eval(res.data.display_shop);
       });
    },
    // 更改modal名称
    saveEditTaste: function(type,name){
      this.notesTaste = name;
      this.notesId = '';
      this.markType = type;
      this.notesValue = '';
    },
    // 编辑时记录name和id
    saveEdit: function(id, name, title){
      this.notesId = id;
      this.notesValue = name;
      this.notesTaste = title;
    },
    // 保存备注
    saveNote: function(){
      var self = this;
      var params = {
        type: this.markType,
        name: this.notesValue,
        dish_remarks_id: this.notesId
      };
      if (!params.name) {
        parent.Public.tips.init({content: '请输入'+self.notesTaste});
        return;
      };
      $('.close').trigger('click');
      // console.log(params);
      // return;
      parent.Public.Ajax('/add_dish_remarks', params, 'POST', function(res){
	       self.getList('/dish_remarks_list');
  	  });
    },
    //删除
    remove: function(){
      var self = this;
      var params = {
        dish_remarks_id: this.notesId
      };
      parent.Public.Ajax('/del_dish_remarks', params, 'GET', function(res){
         self.getList('/dish_remarks_list');
      });
    },
    // 保存当前设置
    saveSet: function(){
      var self = this;
      var params = {};
      var parmType = this.$route.params.id;
      if (parmType == 1) {
        $.each(this.list.list, function(i, v) {
          params[v.id] = v.selected;
        });
        params['display_shop'] = this.display_shop ? 1 : 0;
      } else {
        $.each(this.list.listType, function(i, v) {
          params[v.id] = v.selected;
        });
        params['bill_reate'] = this.sRate;
        params['bill_start_number'] = this.sNumber;
      };

      parent.Public.Ajax('/add_bill_set', params, 'POST', function(res){
        parent.Public.tips.init({type: 3, content: res.msg});
      });
    }
  }
};
</script>

<style lang="css" scoped>
.register-sure{
	top: 20px;
}
.register-data{
  padding: 20px 0px;
  overflow-x: hidden;
  border-bottom: 0;
}
.register-footer{
  padding: 0px 20px;
}
.inputs{
  color: #999;
  font-size: 12px;
}
</style>