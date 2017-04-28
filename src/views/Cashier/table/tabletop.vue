<template>
    <div class="ball-tit">
        <ul>
            <li>
                <a href="#" v-link="{path: '/cashier/table/all'}" @click="changeArea('all')" :class="{'active_color': isActive == 'all'}">
                    全部<span>（{{table_count_all}}）</span>
                </a>
            </li>
            <li v-for="item in list">
                <a href="#" v-link="{path: '/cashier/table/' + item.area_id}" @click="changeArea(item.area_id)" :class="{'active_color': isActive == item.area_id}">
                    {{item.name}}<span>（{{item.table_count}}）</span>
                </a>
            </li>
        </ul>
        <button class="btn btn-danger region-but" href="#add-edit-area" role="button" data-toggle="modal" data-target=".kinds">区域管理</button>
    </div>

    <!-- Modal -->
    <div class="modal fade kinds" id="add-edit-area" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop='static'>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header change-header">
                    <h4 class="change-tit" id="myModalLabel">区域管理</h4>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table tables-name">
                            <thead>
                            <tr>
                                <th width="25%">名称</th>
                                <th width="25%">状态</th>
                                <th width="25%">排序</th>
                                <th width="25%">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(index, item) in list" class="area-tr">
                                <td>
                                    <!-- <div class="tables-area">{{item.area_id}}--{{item.name}}</div> -->
                                    <input type="hidden" value="{{item.area_id}}" />
                                    <input type="text" class="tables-area" name="" value="{{item.name}}" placeholder="">
                                </td>
                                <td>
                                    <div class="admin-change">
                                        <div class="checkbtn dialog" @click="changeEnable($event)">
                                            <span v-if="item.enabled==1" class="admin-open">启用</span>
                                            <span v-else>停用</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="sort">
                                    <!--<span class="operation-sort"></span>-->
                                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up icon-top" @click="sort(item.area_id,index+1,1)"></a>
                                    <a href="javascript:;" class="glyphicon glyphicon-arrow-up" @click="sort(item.area_id,index+1,2)"></a>
                                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down" @click="sort(item.area_id,index+1,3)"></a>
                                    <a href="javascript:;" class="glyphicon glyphicon-arrow-down icon-bottom" @click="sort(item.area_id,index+1,4)"></a>
                                </td>
                                <td>
                                    <div class="area-butt">
                                        <span v-if="index!=list.length-1" class="list-edit" data-toggle="modal" href="#delete-area" @click="setDeleteId(item.area_id,$index)"></span>
                                        <span v-if="index==list.length-1" class="area-add" @click="addList"></span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_submit" class="btn btn-default kind-sure" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary kind-sure" @click="addArea">确定</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 删除模板 start -->
    <div class="modal fade tips" id="delete-area" data-backdrop='static'>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" href="#delete-table" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">{{text.remove}}</h4>
                </div>
                <div class="modal-body">
                    是否删除当前记录!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-danger" @click="remove">{{text.remove}}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 删除模板 end -->
</template>

<script>
export default {

  name: 'tabletop',

  data () {
    return {
        list: '',
        table_count_all: 0,
        text: {
            title: '',
            btn: '',
            remove: '删除'
        },
        deleteId: '',
        deleteIndex: '',
        isActive: 'all'
    };
  },
  created: function() {
    this.getList();
    var isChecked = this.$route.params.area_id;
    this.isActive = isChecked;
  },
  events: {
    refresh_area: function() {
        this.getList();
    },
  },
  methods: {
    changeArea: function(id) {
        if (this.isActive == id) {
            return;
        };
        this.$dispatch("area_id", id);
        this.isActive = id;
    },
    getList: function() {
        var self = this;
        var params = {
        };
        parent.Public.Ajax('/area_list', params, 'GET', function(res) {
            if (res.data.list.length>0) {
                self.list = res.data.list;
            } else {
                self.list = [{'area_id':'','name':'','enabled':0}];
            }
            self.table_count_all = res.data.count;
            //self.list = [{area_id: '1',name:"haha"},{area_id: '2',name:"haha"},{area_id: '3',name:"haha"},{area_id: '4',name:"haha"}];
            store('area_list', res.data.list);
        });
    },
    // 获取删除id
    setDeleteId: function(id, index) {
      this.deleteId = id;
      this.deleteIndex = index;
    },
    // 删除
    remove: function() {
        var self = this;
        if (self.deleteId) {
            var params = {
              area_id: self.deleteId
            };
            parent.Public.Ajax('/del_area', params, 'GET', function(res) {
                $('.close').trigger('click');
                self.list = res.data;
                if (!res.data.length) {
                    self.list = [{'area_id':'','name':'','enabled':0}];
                };
            });
        } else {
            self.removeArea(self.deleteIndex);
        }
    },
    removeArea: function(index){
      if (this.list.length == 1) {
        return false;
      };
      this.list.splice(index,1);
    },
    changeEnable: function(e) {
        $(e.target).find('span').hasClass('admin-open') ? $(e.target).find('span').removeClass('admin-open').text('停用') : $(e.target).find('span').addClass('admin-open').text('启用')
    },
    // 保存区域
    addArea: function() {
        var self = this;
        var areas = [];
        $.each($('.area-tr'), function(i, v) {
            var area = {
                'area_id': $(v).children().eq(0).find("input").eq(0).val(),
                'name': $(v).children().eq(0).find("input").eq(1).val(),
                'weight': i+1,
                'enabled': $(v).children().eq(1).find("span").hasClass("admin-open")?1:0,
            };
            areas.push(area);
        });

        if (areas.length>0) {
            var params = {
                areaList: areas
            };
            parent.Public.Ajax('/add_area', params, 'POST', function(res){
                self.list = res.data;
                $('#btn_submit').trigger('click');
                store('area_list', res.data);
            });
        }
    },
    // 添加区域
    addList: function(){
        this.list.push({"enabled":1});
    },
    sort: function(id, index, type) {
        // area_id
        var self = this;
        var idx = index - 1;
        var sortList = this.list;
        if ((index == 1 && type == 1) || (index == 1 && type == 2)) {
            parent.Public.tips.init({content: '已经是最顶部'});
            return;
        };
        if ((index == sortList.length && type == 3) || (index == sortList.length && type == 4)) {
            parent.Public.tips.init({content: '已经是最底部'});
            return;
        };
        var lsData = sortList[idx];
        sortList.splice(idx, 1);
        // 顶
        if (type == 1) {
            sortList.unshift(lsData);
        };
        // 底
        if (type == 4) {
            sortList.push(lsData);
        };
        // 上
        if (type == 2) {
            sortList.splice(index - 2, 0, lsData);
        };
        // 下
        if (type == 3) {
            sortList.splice(index, 0, lsData);
        };
        // self = this;
        // var weight = 0;
        // switch (type) {
        //     case 1:
        //         weight = 1;
        //         break;
        //     case 2:
        //         weight = index-1;
        //         break;
        //     case 3:
        //         weight = index+1;
        //         break;
        //     case 4:
        //         weight = self.list.length+1;
        //         break;
        // }
        // var self = this;
        // var params = {
        //     shop_id: 1,
        //     area_id: id,
        //     weight: weight
        // };
        // parent.Public.Ajax('/sort_area', params, 'GET', function(res){
        //     self.list = res.data;
        // });
    }
  }
};
</script>

<style lang="css" scoped>
.list-edit{
    float: none;
    margin-right: 0px;
}
.sort{
    text-align: center;
}
.region-but{
    margin-top: 10px;
}
.ball-tit a.active_color{
    color: #1d9ee5;
    cursor: no-drop;
}
</style>