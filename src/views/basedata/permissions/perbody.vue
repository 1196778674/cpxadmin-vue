<template>
<button type="button" class="btn btn-primary save" @click="saveSet">保存</button>
<div class="store-list-right">
  <div class="mian-foot">
    <div class="parm-Remarks" v-for="item in list">
      <h4>
        <label @click="checkAll(item)">
          <input type="checkbox" name="" value="{{item.id}}" v-model="item.isChecked">
              {{item.name}}
        </label>
      </h4>
      <div class="parm-single">
        <ul>
          <li v-for="v in item.childList">
            <label @click="checkThis(v)">
              <input type="checkbox" name="" value="{{v.id}}" v-model="v.isChecked">
              {{v.name}}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  name: 'perbody',

  data () {
    return {
    	list: '',
      leftId: '',
      topType: ''
    };
  },
  events: {
  	leftItem: function(id){
      this.leftId = id;
      if (!id || !this.topType) {
        return;
      };
      this.getAuthList(id, this.topType);
    },
    topItem: function(type){
      this.topType = type;
      if (!type || !this.leftId) {
        return;
      };
      this.getAuthList(this.leftId, type);
    }
  },
  methods: {
    // 获取权限列表
    getAuthList: function(departmentId, type){
      var self = this;
      var params = {
        departmentId: departmentId,
        type: type
      };
      // console.log(params);
      // return;
      if (params.type == 'cashier') {
        parent.Public.Ajax('/auth_cashier_list', params, 'GET', function(res){
          self.list = res.data;
        });
      } else {
        parent.Public.Ajax('/auth_list', params, 'GET', function(res){
          self.list = res.data.navList;
        });
      };
    },
    // 全选当前项
    checkAll: function(e){
      $.each(e.childList, function(i, v) {
         v.isChecked = !e.isChecked;
      });
    },
    // 是否为全选
    checkThis: function(e){
      console.log(e);
    },
    // 保存当前设置
    saveSet: function(){
      var self = this;
      var params = {
        departmentId: this.$route.params.type,
        platfotm: this.$route.params.typeChild,
        auths: this.list
      };
      if (params.platfotm == 'cashier') {
        parent.Public.Ajax('/auth_cashier_edit', params, 'POST', function(res){
          parent.Public.tips.init({type: 3, content: res.data.msg});
        });
      } else{
        parent.Public.Ajax('/auth_edit', params, 'POST', function(res){
          parent.Public.tips.init({type: 3, content: res.data.msg});
        });
      };
    },
  },
};
</script>

<style lang="css" scoped>
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
.mian-foot{
  border: 0;
}
.parm-Remarks{
  width: 100%;
  margin-left: 0px;
  padding-bottom: 0px;
}
.parm-single{
  line-height: 25px;
  height: auto;
  width: 100%;
  border: 0;
  margin-bottom: 0;
}
.save{
  position: absolute;
  right: 30px;
  top: 23px;
}
</style>