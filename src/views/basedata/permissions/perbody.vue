<template>
<button type="button" class="btn btn-primary save" @click="saveSet">保存</button>
<div class="store-list-right">
  <div class="mian-foot">
      <label @click="checkAlls()">
          <input type="checkbox" name="" value="" v-model="checkAll">全选
      </label>
    <div class="parm-Remarks" v-for="item in list">
      <h4>
        <label @click="checkParts(item, $event)">
          <input type="checkbox" id="part_{{item.id}}" name="part_{{item.id}}" value="{{item.id}}">
              {{item.name}}
        </label>
      </h4>
      <div class="parm-single">
        <ul>
          <li v-for="v in item.childList">
            <label @click="checkThis(item.childList,v,$event)">
              <input type="checkbox" name="auth_child_{{item.id}}" auth_type="{{v.auth_type}}" value="{{v.id}}" v-model="v.isChecked">
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
      topType: '',
      checkAll: false,
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
      self.checkAll = false;
      parent.Public.Ajax('/auth_list', params, 'GET', function(res){
          self.list = res.data.navList;
      });
    },
    // 全选当前项
    checkAlls: function() {
        var self = this;
        $.each(self.list, function(i, v) {
            $("#part_"+v.id).prop("checked",!self.checkAll);
            $.each(v.childList, function(j,value) {
                value.isChecked = !self.checkAll;
            });
        });
    },
    // 全选当前项
    checkParts: function(list, e){
      var thisChecked = $(e.target).prop('checked');
      $.each(list.childList, function(i, v) {
         v.isChecked = thisChecked;
      });
      // if (!thisChecked) {
      //   this.checkAll = thisChecked;
      // };
    },
    // 是否为全选
    checkThis: function(list, item, e) {
        if ($(e.target).attr('auth_type') == 1) {
            $("input[name="+$(e.target).attr('name')+"]").each(function() {
                if ($(this).attr('auth_type') == 0 && $(e.target).is(':checked')) {
                    $(this).prop("checked",true);
                }
                if ($(e.target).is(':checked')) {
                    for(var i=0;i<list.length;i++) {
                        if (list[i].auth_type==0) {
                            list[i].isChecked = true;
                        }
                    }
                }
            });
        } else if ($(e.target).attr('auth_type') == 0) {
            var checked = false;
            $("input[name="+$(e.target).attr('name')+"]").each(function() {
                if ($(this).attr('auth_type') == 1 && $(this).is(':checked')) {
                    checked = true;
                }
            });
            if (checked == true) {
                $(e.target).prop('checked',true);
            }
        } else {}
    },
    // 保存当前设置
    saveSet: function(){
      var self = this;
      var params = {
        departmentId: !this.$route.params.type ? this.$route.params.type : this.leftId,
        platfotm: !this.$route.params.typeChild ? this.$route.params.typeChild : this.topType,
        auths: this.list
      };
      // console.log(params);
      // return;
      if (params.platfotm == 'cashier') {
        parent.Public.Ajax('/auth_cashier_edit', params, 'POST', function(res){
          parent.Public.tips.init({type: 3, content: '设置成功'});
        });
      } else{
        parent.Public.Ajax('/auth_edit', params, 'POST', function(res){
          parent.Public.tips.init({type: 3, content: '设置成功'});
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