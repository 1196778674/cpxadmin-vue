<template>
  <div class="cpx-materialinit" :style='{height: bodyheight}'>
    <div class="storein-header material-top">
        <a class="btn btn-primary" data-toggle="modal" href='#uploadDown'>上传表格</a>
        <a class="btn btn-primary" href='{{errorExportUrl}}' target="_blank">错误信息导出</a>
    </div>
    <div v-if=""></div>
    <div v-else class="initImg"></div>
  </div>
  <!-- 上传表格or下载模板 start -->
  <div class="modal fade" id="uploadDown">
    <div class="modal-dialog little">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">物料信息初始化</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="downloadTpl">下载模板</button>
          <label type="button" class="btn btn-primary" for="upload">上传表格</label>
          <file-upload button-text="上传" class='uploadClass' name='' id='upload' action='excel/importInit' method='post' accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" exceltype="2"></file-upload>
        </div>
      </div>
    </div>
  </div>
  <!-- 上传表格or下载模板 end -->
</template>

<script>
export default {

  name: 'initializationDepartmentEarly',

  data () {
    return {
    	list: '',
      selectList: '',
      errorExportUrl: 'javascript:;'
    };
  },
  created: function(){
    this.bodyheight = ($(window).height() - 140) + 'px';
  },
  events: {
    // 上传表格后操作
    onFileAfter: function(res){
      if (res.code != '0') {
        parent.Public.tips.init({content: res.msg});
        this.errorExportUrl = parent.Public.domain() + 'excel/exportError?excelType=2&shopId=' + $cookie('shopId') + '&token=' + $cookie('token');
      } else {
        parent.Public.tips.init({type: 3, content: res.msg});
        this.errorExportUrl = 'javascript:;';
      };
      $('.close').trigger('click');
    }
  },
  methods: {
    // 下载模板
    downloadTpl: function(){
      parent.open('../../../src/download/初始化部门信息表.xlsx');
    },
    // 入库
    storein: function(){

    },
    // 添加行
    addRow: function(){
      this.list.push({});
    },
    // 删除行
    delRow: function(i){
      if (this.list.length == 1) {
        parent.Public.tips.init({content: '至少保留一条数据'});
        return;
      };
      this.list.splice(i, 1)
    }
  },
  components: {
   fileUpload: require('../../../tpls/upload.vue'),
  },
};
</script>

<style lang="css" scoped>
.modal-footer{
  text-align: center;
}
.uploadClass{
  display: none;
}
.storein{
  border-top: 1px solid #dedede;
  padding: 10px 20px;
}
.storein-header{
  overflow: hidden;
}
.storein-header .col-sm-2{
  width: 60px;
  padding-right: 0px;
  text-align: left;
  padding-left: 0px;
}
.storein-header .storein-select{
  width: 140px;
}
.storein .storein-body{
  border-top: 1px solid #dedede;
  margin-top: 10px;
  max-height: 660px;
}
.glyphicon{
  margin-right: 5px;
}
.form-group{
  float: left;
}
</style>