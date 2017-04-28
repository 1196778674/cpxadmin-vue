<template>
	<h6>一级类别列表<a data-toggle="modal" href='#addStore' @click="clearOption">添加</a></h6>
  	<ul>
    	<li v-for="item in list" :class="{'active': isActive == item.id}">
      		<a href="#" v-link="{path: '/home/materialtype/' + item.id}" @click="changeType(item.id, item.name)">
        		<span class="list-tit">{{item.name}} {{item.categorySn}}</span>
        		<a class="list-edit" data-toggle="modal" href='#delete-modal' @click="saveOptions(item.id)"></a>
        		<a class="list-del" data-toggle="modal" href='#addStore' @click="saveOptions(item.id, item.name)"></a>
      		</a>
    	</li >
  	</ul>
  	<!-- 添加/编辑部门 start -->
  	<div class="modal fade" id="addStore" data-backdrop='static'>
	    <div class="modal-dialog">
	      	<div class="modal-content">
	        	<div class="modal-header">
      	    		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	          		<h4 class="modal-title">添加一级类别</h4>
	        	</div>
	        	<div class="modal-body">
              <div class="form-group gower-group">
                <label for="inputEmail3" class="col-sm-2 control-label gower inputs">添加一级类别:</label>
                <div class="col-sm-10">
                  <input type="text" name="" class="form-control" value="{{firstCategory}}" v-model="firstCategory">
                </div>
              </div>
	        	</div>
	        	<div class="modal-footer">
	          		<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	          		<button type="button" class="btn btn-primary" @click='addStore'>保存</button>
	        	</div>
	      	</div>
	    </div>
  	</div>
  	<!-- 添加/编辑部门 end -->
    <!-- 删除部门 start -->
    <div class="modal fade tips" id="delete-modal" data-backdrop='static'>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">删除部门</h4>
          </div>
          <div class="modal-body">
            确认删除该一级类别列表!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-danger" @click="deleteFirst()">删除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除部门 end -->
</template>

<script>
export default {

  name: 'materialleft',

  data () {
    return {
    	list: '',
      firstCategory: '',
      optionId: '',
      isActive: ''
    };
  },
  created: function(){
    var self = this;
    var params = {
      type: true
    };
    parent.Public.Ajax('/material_category_list', params, 'GET', function(res){
      self.list = res.data;
      console.log(self.$route);
      var id = self.$route.params.type == '0' ? res.data[0].id : self.$route.params.type;
      var name = '';
      $.each(res.data, function(i, v) {
         if (v.id == id) {
          name = v.name;
         };
      });
      self.$dispatch("type", res.data[0].id);
      self.$dispatch("title", name);
      self.isActive = id;
    });
  },
  methods: {
    // 清空categoryid
    clearOption: function(){
      this.optionId = '';
      this.firstCategory = '';
    },
    // 添加类别
    addStore: function(){
      var self = this;
      var params = {
        name: self.firstCategory,
        categoryId: self.optionId
      };
      parent.Public.Ajax('/material_first_category_set_up', params, 'GET', function(res){
        $('.close').trigger('click');
        self.list = res.data;
        self.firstCategory = '';
      });
    },
    // 切换类别
    changeType: function(id, title){
      this.$dispatch("type", id);
      this.$dispatch("title", title);
      this.isActive = id;
    },
    // 存储删除类别
    saveOptions: function(id, name){
      this.optionId = id;
      this.firstCategory = name;
    },
    // 删除类别
    deleteFirst: function(){
      var self = this;
      var newList = [];
      var params = {
        ids: [this.optionId]
      };
      parent.Public.Ajax('/material_category_delete', params, 'GET', function(res){
        $('.close').trigger('click');
        $.each(self.list, function(i, v) {
           if (params.ids != v.id) {
            newList.push(v);
           };
        });
        self.list = newList;
      });
    },
  }
};
</script>
<style lang="css" scoped>
.table-allot ul li .list-tit{
    width: auto;
    padding-left: 10px;
    display: inline-block;
    max-width: 140px;
    overflow: hidden;width:  auto;
    padding-left: 10px;
}
</style>