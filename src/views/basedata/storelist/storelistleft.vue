<template>
  <h6>部门列表<a data-toggle="modal" href='#addStore'>添加部门</a></h6>
  <ul>
    <li v-for="item in list">
      <a href="#" v-link="{path: '/home/storelist/' + item.id}" @click="changeType(item.id)">
        <span class="list-tit">{{item.name}}</span>
        <a class="list-edit"></a>
        <a class="list-del"></a>
      </a>
    </li >
  </ul>

  <!-- 添加部门 start -->
  <div class="modal fade" id="addStore">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">添加部门</h4>
        </div>
        <div class="modal-body">
          <label>
            添加部门
            <input type="text" name="" value="" v-model="storename">
          </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click='addStore'>保存</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 添加部门 end -->
</template>

<script>
export default {

  name: 'storelistleft',

  replace: false,

  data () {
    return {
    	list: '',
      storename: '添加门店',
    };
  },
  created: function(){
    this.$http.get('../../../../../json/storelistleft.json', null).then(function(res){
      this.list = res.data;
    });
  },
  methods: {
    // 添加部门
    addStore: function(){
      this.list.push({
          name: this.storename
      });
      this.storename = '';
    },
    // 切换部门
    changeType: function(id){
      // 传递id到父级组件
      this.$dispatch("type", id);
    }
  }
};
</script>