<template>
  <div class="register-right">
    <div class="register-top">
      <h5>{{title}}</h5>
        <button type="button" class="btn btn-default dishes-but register-but" data-toggle="dropdown" @click="saveSet">
        保存
      </button>
    </div>
    <div class="register-main">
      <p>勾选部门需要打印的数据，选中后并设置单据对应的打印机</p>
      <div class="register-data" v-for="(k,v) in list">
        <!-- <div class="sel-group register-group Pass-menu">
          <label><input type="checkbox" name="" value="{{v.bill_id}}" v-model="v.status">{{v.bill_name}}</label>
        </div> -->
        <div class="sel-group register-group">
          <input type="hidden" name="id" value="{{v.id}}" v-model="v.id">
          <label for="" class="sel-kind">单据类型</label>
          <select class="form-control sel-add" v-model="v.bill_id.select">
            <option v-for="item in v.bill_id.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印机</label>
          <select class="form-control sel-add" v-model="v.printer_id.select">
            <option v-for="item in v.printer_id.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印内容</label>
          <select class="form-control sel-add" v-model="v.content.select" :disabled="v.bill_id==1||v.bill_id==3||v.bill_id==4||v.bill_id==7||v.bill_id==8">
            <option v-for="item in v.content.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印方式</label>
          <select class="form-control sel-add" v-model="v.type.select" :disabled="v.bill_id==1||v.bill_id==3||v.bill_id==4||v.bill_id==7||v.bill_id==8">
            <option v-for="item in v.type.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印份数</label>
          <select class="form-control sel-add" v-model="v.number.select">
            <option v-for="item in v.number.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <span class="glyphicon glyphicon-plus" v-if="k == 0" @click="addRows"></span>
          <span class="glyphicon glyphicon-minus" v-else @click="deleteRows($index)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'printright',

  replace: false,

  data () {
    return {
      list: '',
      id: '',
      enabled: '',
      title: '请选择部门',
      rows: {}
    };
  },
  events: {
    leftId: function(id){
      if (!id) {
        return;
      };
      this.id = id;
      this.getList(id);
    },
    leftName: function(name){
      this.title = name;
    },
    enabledStatus: function(enabled){
      this.enabled = enabled;
    }
  },
  methods: {
    // 获取列表数据
    getList: function(id){
      var self = this;
      var params = {
        department_id: id
      };
      parent.Public.Ajax('/get_print_set', params, 'GET', function(res){
        self.list = res.data;
        store('rows', self.list[0]);
      });
    },
    // 添加行
    addRows: function(){
      var self = this,
          row = {};
      $.each(store('rows'), function(name, val) {
        if (name == 'id') {
          row[name] = -self.list.length;
          return;
        };
         row[name] = val;
      });
      this.list.push(row);
    },
    // 删除行
    deleteRows: function(index){
      this.list.splice(index,1);
    },
    // 保存当前设置
    saveSet: function(){
      var self = this;
      var params = [],
          bill_name = '',
          flag = true;
      $.each(self.list, function(i, v) {
        for (var i = 0; i < v.bill_id.list.length; i++) {
          if (v.bill_id.list[i].id == v.bill_id.select) {
            bill_name = v.bill_id.list[i].name;
          };
        };
        params.push({id: v.id,'bill_id': v.bill_id.select, 'bill_name': bill_name, 'type': v.type.select, 'status': 1, 'content': v.content.select, 'number': v.number.select, 'printer_id': v.printer_id.select});
      });
      $.each(params, function(i, v) {
        var index = i + 1;
        if (!v.bill_id) {
          parent.Public.tips.init({type:1, content: '第'+index+'行单据类型不能为空'});
          flag = false;
          return false;
        };
        if (!v.printer_id) {
          parent.Public.tips.init({type:1, content: '第'+index+'行打印机不能为空'});
          flag = false;
          return false;
        };
      });
      if (!flag) {
        return;
      };
      parent.Public.Ajax('/add_print_set', {bills: params, department_id: self.id, enabled: self.enabled}, 'POST', function(res){
        parent.Public.tips.init({type:3, content: res.msg});
      });
    },
  },
  destroyed: function(){
    store.remove('rows');
  },
};
</script>

<style lang="css" scoped>
.register-data{
  padding-left: 15px;
}
.Pass-menu{
  width: 15%;
}
.sel-group{
  width: auto;
}
.register-right{
  width: 100%;
}
.btn-event{
  position: absolute;
  right: 10px;
  top: 0px;
}
.store-list-right{
  padding: 20px;
}
.store-list-right ul{
  overflow: hidden;
}
.store-list-right ul li{
  float: left;
  margin-right: 15px;
}
.glyphicon-plus:before,.glyphicon-minus:before{
  cursor: pointer;
}
</style>