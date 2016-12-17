<template>
物料初始化
<file-upload button-text="上传" class='' name='' id='upload' action='' method='' accept=""></file-upload>
</template>

<script>
export default {

  name: 'materialinit',

  data () {
    return {

    };
  },
  components: {
	fileUpload: require('../../../tpls/upload.vue'),
  },
};
</script>