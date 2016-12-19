<template>
物料初始化
<file-upload button-text="上传" class='' name='' id='upload' action='' method='' accept=""></file-upload>

<button type="button" class="btn btn-danger" @click="showtips">button</button>

</template>

<script>
export default {

  name: 'materialinit',

  data () {
    return {

    };
  },

  methods: {
  	showtips: function(){
  		parent.Public.tips.init({content: '请输入23432捡垃圾的福利水电费'});
  	},
  },

  components: {
	fileUpload: require('../../../tpls/upload.vue'),
  },
};
</script>