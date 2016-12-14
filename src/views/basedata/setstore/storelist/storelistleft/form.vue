<template>

</template>

<script>
export default {

  name: 'form',

  props: {
  	type: String,
  	default: 'storename'
  },

  methods: {
    add: function() {
    	console.log(this.storename);
    	// this.$dispatch("addstorelist", this.addStoreName); // 向上传递数据
    	// this.addStoreName = '';
    }
  },

  data () {
    return {
    	storename: 'test'
    };
  },
};
</script>