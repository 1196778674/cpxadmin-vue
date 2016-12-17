<template>
	<div class="store-list-right">
    <div class="header-add-remove">
      收银部
      <div class="btn-group btn-event">
        <a class="btn btn-default" data-toggle="modal" href='#remove-list'>移除</a>
        <a class="btn btn-primary" data-toggle="modal" href='#add-list-staff' @click="showStaffList">添加</a>
      </div>
    </div>
		<ul>
			<li v-for="item in list">
				<label>
          <input type="checkbox" name="" value="{{item.id}}" v-model="item.checked">
				  {{item.name}}
        </label>
			</li >
		</ul>
    <!-- 删除 strat -->
    <div class="modal fade" id="remove-list">
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
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="removeStaff">确认</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除 end -->
    <!-- 添加 start -->
    <div class="modal fade" id="add-list-staff">
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
                  <input type="checkbox" name="" value="{{staff.id}}" v-model="staff.checked">
                  {{staff.name}}
                </label>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addStaff">添加</button>
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
    	list: '',
      staffs: ''
    };
  },
  created: function(){
    this.$http.get('../../../../../json/storelistright.json', null).then(function(res){
      this.list = res.data;
    });
  },
  events: {
    type: function(type){
      this.subData = {type: type};
      console.log(this.subData);
    }
  },
  methods: {
    // 删除员工
    removeStaff: function(){
      var datas = [],
          newList = [];
      $.each(this.list, function(i, v) {
        if (v.checked) {
          datas.push(v.id);
        } else {
          newList.push(v);
        };
      });
      console.log(datas);
      this.list = newList;
    },
    // 请求员工列表
    showStaffList: function(){
      this.$http.get('../../../../../json/storelistright.json', null).then(function(res){
        this.staffs = res.data;
      });
    },
    // 添加员工
    addStaff: function(){
      var self = this;
      $.each(this.staffs, function(i, v) {
        if (v.checked) {
          self.list.push({id: v.id, name: v.name});
        };
      });
    }
  }
};
</script>