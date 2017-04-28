<template>
  <div class="register-top">
    <h5>{{title}}</h5>
    <div class="btn-group btn-event">
      <a class="btn btn-danger dishes-but register-but" data-toggle="modal" href='#remove-list'>移除</a>
      <a class="btn btn-default dishes-but register-but" data-toggle="modal" href="{{addmodel}}" @click="serachStaff">添加</a>
    </div>
  </div>
	<div class="store-list-right">
		<ul>
			<li v-for="item in list">
				<label>
          <input type="checkbox" name="" value="{{item.userId}}" v-model="item.checked">
				  {{item.nickname}}
        </label>
			</li >
		</ul>
    <!-- 删除 strat -->
    <div class="modal fade tips" id="remove-list" data-backdrop='static'>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">移除</h4>
          </div>
          <div class="modal-body">
            移除操作后，被移除的部门成员将无法操作此部门的业务!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-danger" @click="removeStaff">删除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除 end -->
    <!-- 添加 start -->
    <div class="modal fade" id="add-list-staff" data-backdrop='static'>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">添加员工</h4>
          </div>
          <div class="modal-body">
            <ul>
              <li v-for="staff in staffs">
                <label>
                  <input type="checkbox" name="" value="{{staff.userId}}" v-model="staff.statusType">
                  {{staff.nickname}}
                </label>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="addStaff">添加</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除 end -->
	</div>
</template>

<script>
export default {

  name: 'storelistright',

  replace: false,

  data () {
    return {
      checkedall: false,
    	list: '',
      staffs: '',
      title: '',
      // addmodel: '#add-list-staff'
      addmodel: 'javascript:void(0)'
    };
  },
  created: function(){
    this.showStaffList(this.$route.params.type);
    if (this.$route.params.type != '0') {
      this.addmodel = '#add-list-staff';
    };
  },
  events: {
    type: function(type){
      this.showStaffList(type);
    },
    title: function(title){
      this.title = title;
      this.addmodel = '#add-list-staff';
    }
  },
  methods: {
    // 删除员工
    removeStaff: function(){
      var datas = [];
      $.each(this.list, function(i, v) {
        if (v.checked) {
          datas.push(v.userId);
        }
      });
      var self = this;
      var params = {
        deptId: self.$route.params.type,
        userList: datas
      };
      parent.Public.Ajax('/del_department', params, 'GET', function(res){
        $('.close').trigger('click');
        self.showStaffList(self.$route.params.type);
      });
    },
    // 请求员工列表
    showStaffList: function(type){
      var self = this;
      var params = {
        deptId: type,
      };
      parent.Public.Ajax('/department_user', params, 'GET', function(res){
        self.list = res.data;
      });
    },
    // 添加员工
    serachStaff: function(){
      var self = this;
      var params = {
        deptId: self.$route.params.type,
      };
      if (params.deptId == '0') {
        parent.Public.tips.init({content: '请选择部门'});
        return;
      };
      parent.Public.Ajax('/dept_user_list', params, 'GET', function(res){
        self.staffs = res.data;
      });
    },
    // 添加员工
    addStaff: function(){
      var self = this,
          userList = [];
      $.each(this.staffs, function(i, v) {
        if (v.statusType) {
          userList.push(v.userId);
        };
      });
      // console.log(userList);
      // return;
      var params = {
        userList: userList,
        deptId: self.$route.params.type
      };
      parent.Public.Ajax('/add_department_user', params, 'GET', function(res){
        $('.close').trigger('click');
        self.showStaffList(self.$route.params.type);
      });
    }
  }
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
</style>