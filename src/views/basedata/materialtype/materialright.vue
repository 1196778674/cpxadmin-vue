<template>
	<div class="register-top">
    	<h5>{{title}}</h5>
    	<div class="btn-group btn-event">
      		<a class="btn btn-danger dishes-but register-but" data-toggle="modal" href='#remove-list'>移除</a>
      		<a class="btn btn-default dishes-but register-but" data-toggle="modal" href='#add-list-staff'>添加</a>
		  </div>
	</div>
	<div class="store-list-right">
		<ul>
			<li v-for="item in list">
				<label>
          	<input type="checkbox" name="" value="{{item.id}}" v-model="item.checked">
				  	{{item.name}}
        		</label>
			</li >
		</ul>
	</div>
	<!-- 删除 strat -->
    <div class="modal fade tips" id="remove-list">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">移除</h4>
          </div>
          <div class="modal-body">
            确认删除此条数据
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="removeStaff">确认</button>
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
            <h4 class="modal-title">添加二级分类</h4>
          </div>
          <div class="modal-body">
            <div class="form-group gower-group">
                <label for="inputEmail3" class="col-sm-2 control-label gower inputs">添加二级类别:</label>
                <div class="col-sm-10">
                  <input type="text" name="" class="form-control" value="{{secondCategory}}" v-model="secondCategory">
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addSecondCategory">添加</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除 end -->
</template>

<script>
export default {

  name: 'materialright',

  replace: false,

  data () {
    return {
      title: '所有类别',
      type: '',
      checkedall: false,
    	list: '',
      secondCategory: ''
    };
  },
  created: function(){
    this.getList();
  },
  events: {
    type: function(type){
      this.getList({type: type});
    },
    title: function(title){
      this.title = title;
    }
  },
  methods: {
    // 获取当前列表
    getList: function(obj){
      var self = this;
      var params = {
        type: self.type
      };
      params = $.extend(true, params, obj);
      parent.Public.Ajax('/material_category_list', params, 'GET', function(res){
        self.list = res.data;
      });
    },
    // 删除员工
    removeStaff: function(){
      var datas = [],
          newList = [];
      var self = this;
      $.each(self.list, function(i, v) {
        if (v.checked) {
          datas.push(v.id);
        }
      });
      var params = {
        ids: datas
      };
      parent.Public.Ajax('/material_category_delete', params, 'GET', function(res){
        $.each(self.list, function(i, v) {
          if (!v.checked) {
           newList.push(v);
          };
        });
        self.list = newList;
        self.secondCategory = '';
      });
    },
    // 添加二级类别
    addSecondCategory: function(){
      var self = this;
      var params = {
        name: self.secondCategory,
        parentId: self.$route.params.type,
      };
      parent.Public.Ajax('/material_second_category_set_up', params, 'GET', function(res){
        self.list = res.data;
        self.secondCategory = '';
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