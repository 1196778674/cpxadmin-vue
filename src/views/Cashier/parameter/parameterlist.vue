<template>
<button v-if="isActive == 1 || isActive == 2" type="button" class="btn btn-default dishes-but register-but register-sure" data-toggle="dropdown" @click="saveSet">
      保存
</button>
<div class="mian-foot">
  <!-- 数据字典 start -->
  <div v-if="isActive == 0">
    <div class="parm-Remarks parameter" v-for="(key, value) in list">
      <h4>
        {{value.name}}
        <span v-if="value.id == 4" :class="{'glyphicon glyphicon-pencil' : !isEdit, 'glyphicon glyphicon-ok' : isEdit}" @click="dragList()"></span>
        <small v-if="!isEdit && value.id == 4">点击编辑可进行拖拽排序修改</small>
        <small v-if="isEdit && value.id == 4">点击保存即可保存修改后排序</small>
      </h4>
      <div v-if="isEdit && value.id == 4" v-dnd-list :dnd-list="value.list">
        <li class="parm-single" v-for="(k, v) in value.list" v-dnd-draggable :dnd-draggable="v" :dnd-type="v.type" :dnd-data="value.list" :dnd-index="$index" :dnd-disable-if="value.id != 4" dnd-effect-allowed="move">
          <p>{{v.name}}</p>
          <div class="parm-butt">
              <span class="parm-add" v-if="v.status!=1" data-toggle="modal" href='#dish_remarks_modal' @click='saveEdit(v.dish_remarks_id, v.name, value.name, value.id)'></span>
              <span class="parm-del" v-if="v.status!=1" data-toggle="modal" href='#delete-notes' @click='saveEdit(v.dish_remarks_id)'></span>
          </div>
        </li>
      </div>
      <div v-else>
        <li class="parm-single" v-for="(k, v) in value.list">
          <p>{{v.name}}</p>
          <div class="parm-butt">
              <span class="parm-add" v-if="v.status!=1" data-toggle="modal" href='#dish_remarks_modal' @click='saveEdit(v.dish_remarks_id, v.name, value.name, value.id)'></span>
              <span class="parm-del" v-if="v.status!=1" data-toggle="modal" href='#delete-notes' @click='saveEdit(v.dish_remarks_id)'></span>
          </div>
        </li>
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
        <div class="form-group gower-group">
            <label class="col-sm-2 control-label gower inputs"><span>*</span>订餐电话:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="phone" value="{{list.phone}}" placeholder="">
            </div>
        </div>
        <div class="form-group gower-group">
            <label class="col-sm-2 control-label gower inputs"><span>*</span>就餐地址:</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="address" value="{{list.address}}" placeholder="">
            </div>
        </div>
      <!--<ul>-->
        <!--<li>订餐电话：{{list.phone}}</li>-->
        <!--<li>就餐地址：{{list.address}}</li>-->
      <!--</ul>-->
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
            <input type="text" class="form-control" v-model="sRate" value="" placeholder="">
            <span class="form-control-feedback" style="top:1px;right:10px;">%</span>
          </div>
        </div>
      </div>
      <div class="form-group col-sm-4" v-for="(k,v) in list.listType">
        <label for="" class="sel-kind col-sm-3 gower inputs">{{v.name}} :</label>
        <!-- <select id="more-select" class="form-control sel-add col-sm-12" style="color:#555;min-width: 235px;" v-model="v.selected" multiple="multiple"> -->
        <select id="more-select" class="form-control sel-add col-sm-12" style="color:#555;" v-model="v.selected">
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
  <!-- 菜品设置 start -->
  <div v-if="isActive == 3">
    <div class="register-data">
      <div class="form-group col-sm-12">
        <div class="form-group gower-group">
          <label for="inputEmail3" class="col-sm-2 control-label gower inputs">是否启用临时菜品:</label>
          <div class="col-sm-6 btn-open-close">
            <input type="hidden" v-model="temp_dish" placeholder="">
            <div class="admin-change" @click="openOrClose(temp_dish)">
                <div class="checkbtn">
                    <span class="admin-open" v-if="temp_dish == 1">启用</span>
                    <span v-else>关闭</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 菜品设置 end -->

  <!-- 数据字典添加编辑 modal start -->
  <div class="modal fade" id="dish_remarks_modal" data-backdrop='static'>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">{{text.title}}{{notesTaste}}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group gower-group">
            <label for="inputEmail3" class="col-sm-4 control-label gower inputs">{{text.title}}{{notesTaste}}</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="notesValue" value="" placeholder="">
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
  <div class="modal fade tips" id="delete-notes" data-backdrop='static'>
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
          <button type="button" class="btn btn-danger" @click="remove">删除</button>
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
      text: {
        title: '',
        btn: '',
        remove: '删除'
      },
      isActive: '0',
      notesTaste: '',
      notesId: '',
      notesValue: '',
      markType : '',
      sRate: '',
      sNumber: '',
      display_shop:'',
      phone:'',
      address:'',
      temp_dish: '',
      isEdit: false
    };
  },
  events: {
    activeEq: function(i){
      if (i == 0) {
        this.getList('/dish_remarks_list');
      };
      if (i == 1 || i == 2 || i == 3) {
        this.getList('/bill_set_list', i);
      };
      this.isActive = i;
    }
  },
  created: function(){
    if (this.$route.params.id == 0) {
      this.getList('/dish_remarks_list');
    };
    if (this.$route.params.id == 1 || this.$route.params.id == 2 || this.$route.params.id == 3) {
      this.getList('/bill_set_list', this.$route.params.id);
    };
  },
  methods : {
    // 初始化多选
    initSelect: function(){
      var self = this;
      $(function(){
        $('#more-select').select2({
          tags: true,
          minimumResultsForSearch: -1,
          placeholder: '',
          maximumInputLength: 10,
          // maximumSelectionLength: 3,
          templateResult: self.setDefaultSelect
        });
      })
    },
    // 设置默认选项
    setDefaultSelect: function(state){
      if (!state.id) { return state.text; }
      var $state = $(
        '<span>' + state.text + '</span>'
      );
      return $state;
    },
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
         self.phone = res.data.phone;
         self.address = res.data.address;
         self.temp_dish = res.data.temp_dish;
         // if (id == 2) {
         //    self.initSelect();
         // };
       });
    },
    // 更改modal名称
    saveEditTaste: function(type,name){
      this.notesTaste = name;
      this.notesId = '';
      this.markType = type;
      this.notesValue = '';
      this.text.title = '添加';
    },
    // 编辑时记录name和id
    saveEdit: function(id, name, title, type){
      this.notesId = id;
      this.markType = type;
      this.notesValue = name;
      this.notesTaste = title;
      this.text.title = '编辑';
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
      if (self.notesTaste == '退菜原因') {
        if (params.name.length > 15) {
          parent.Public.tips.init({content: self.notesTaste + '不超过15个字'});
          return;
        };
      } else {
        if (params.name.length > 10) {
          parent.Public.tips.init({content: self.notesTaste + '不超过10个字'});
          return;
        };
      };
      // console.log(params);
      // return;
      parent.Public.Ajax('/add_dish_remarks', params, 'POST', function(res){
        $('.close').trigger('click');
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
        $('.close').trigger('click');
         self.getList('/dish_remarks_list');
      });
    },
    // 渠道可进行拖拽排序
    dragList: function(){
      var self = this;
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        var remarks_list = [];
        $.each(this.list[3].list, function(i, v) {
          remarks_list.push({id: v.dish_remarks_id, weight: i+1});
        });
        var params = {
          remarks_list: remarks_list
        };
        parent.Public.Ajax('/sort_dish_remarks', params, 'POST', function(res){
          parent.Public.tips.init({type: 3, content: '保存成功'});
        })
      };
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
       //  if (this.display_shop && (!$.trim(this.phone) || !/^1[3,5,7,8][0-9]{9}$/.test(this.phone))) {
  	    //   parent.Public.tips.init({content: '请输入正确的订餐电话'});
  	    //   return;
  	    // }
        if (this.display_shop && !$.trim(this.phone)) {
          parent.Public.tips.init({content: '请输入正确的订餐电话'});
          return;
        }
  	    if (this.display_shop && !$.trim(this.address)) {
  	      parent.Public.tips.init({content: '请输入就餐地址'});
  	      return;
  	    }
  	    params['phone'] = this.phone;
        params['address'] = this.address;
      } else {
        // var ids = [];
        $.each(this.list.listType, function(i, v) {
          params[v.id] = v.selected;
          // if (parmType == 2) {
          //   $('.select2-selection__choice').each(function(k,t){
          //     var text = $(t).text().substr(1,$(t).text().length);
          //     $.each(v.list, function(j,l){
          //       if (text == l.name) {
          //         ids.push(l.id);
          //       };
          //     })
          //   })
          // };
        });
        // params['minus_change_way'] = ids;
        params['bill_reate'] = this.sRate;
        params['bill_start_number'] = this.sNumber;
      };
      // console.log(params);
      // return;
      parent.Public.Ajax('/add_bill_set', params, 'POST', function(res){
        parent.Public.tips.init({type: 3, content: res.msg});
      });
    },
    // 开启或关闭临时菜品
    openOrClose: function(temp_dish){
      var self = this;
      var params = {
          temp_dish: temp_dish ? 0 : 1
      };
      parent.Public.Ajax('add_bill_set', params, 'POST', function(res){
        self.temp_dish = temp_dish ? 0 : 1;
        parent.Public.tips.init({type: 3, content: res.msg});
      });
    },
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
.glyphicon-pencil:before,.glyphicon-ok:before{
  color: #70C8F0;
  cursor: pointer;
}
.dndDraggingSource {
  border: 1px dashed #ccc;
  display: none;
}
.btn-open-close{
  padding-top: 7px;
}
.btn-open-close .admin-change{
  float: left;
}
.checkbtn{
  width: 78px;
}
.select2-container--default .select2-selection--multiple .select2-selection__choice{
  background-color: #fafafa;
  border: 1px solid #ccc;
}
</style>