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
        <div class="sel-group register-group Pass-menu">
          <label><input type="checkbox" name="" value="{{v.bill_id}}" v-model="v.status">{{v.bill_name}}</label>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印机</label>
          <select class="form-control sel-add" v-model="v.printer_id.select">
            <option v-for="item in v.printer_id.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印内容</label>
          <select class="form-control sel-add" v-model="v.content.select">
            <option v-for="item in v.content.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印方式</label>
          <select class="form-control sel-add" v-model="v.type.select">
            <option v-for="item in v.type.list" value="{{item.id}}">{{item.name}}</option>
          </select>
        </div>
        <div class="sel-group register-group">
          <label for="" class="sel-kind">打印份数</label>
          <select class="form-control sel-add" v-model="v.number.select">
            <option v-for="item in v.number.list" value="{{item.id}}">{{item.name}}</option>
          </select>
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
      title: '请选择部门'
    };
  },
  events: {
    leftId: function(id){
      this.id = id;
      this.getList(id);
    },
    leftName: function(name){
      this.title = name;
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
      });
    },
    // 保存当前设置
    saveSet: function(){
      var self = this;
      var params = [];
      // bills: self.list,
      // department_id: self.id
      $.each(self.list, function(i, v) {
        // console.log(v);
        params.push({'bill_id': v.bill_id, 'bill_name': v.bill_name, 'type': v.type.select ? v.type.select : 0, 'status': v.status ? 1 : 0, 'content': v.content.select ? v.content.select : 0, 'number': v.number.select ? v.number.select : 0, 'printer_id': v.printer_id.select ? v.printer_id.select : 0});
      });
      parent.Public.Ajax('/add_print_set', {bills: params, department_id: self.id}, 'POST', function(res){
        parent.Public.tips.init({type:3, content: res.msg});
      });
    },
  }
};
</script>

<style lang="css" scoped>
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
</style>