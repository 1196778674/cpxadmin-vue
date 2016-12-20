<template>

<div class="cpx-materialinit" :style='{height: bodyheight}'>
  <div class="material-top">
    <a class="btn btn-primary" data-toggle="modal" href='#uploadDown'>上传表格</a>
    <a class="btn btn-primary" href='javascript:;'>错误信息导出</a>
  </div>
  <div v-if=""></div>
  <div v-else class="initImg"></div>

  <!-- 上传表格or下载模板 start -->
  <div class="modal fade" id="uploadDown">
    <div class="modal-dialog little">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">物料信息初始化</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">下载模板</button>
          <label type="button" class="btn btn-primary" for="upload">上传表格</label>
          <file-upload button-text="上传" class='uploadClass' name='' id='upload' action='' method='' accept=""></file-upload>
        </div>
      </div>
    </div>
  </div>
  <!-- 上传表格or下载模板 end -->
</div>

</template>

<script>
export default {

  name: 'materialinit',

  data () {
    return {

    };
  },
  created: function(){
    this.bodyheight = ($(window).height() - 140) + 'px';
  },
  methods: {

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
</style>