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
  		parent.Public.tips.init('公共方法');
  	},
  },

  components: {
	fileUpload: require('../../../tpls/upload.vue'),
  },
};
</script>