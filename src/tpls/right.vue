<template>
<div v-if="type == 'department'">
<router-view></router-view>
</div>
<div v-if="type == '2'">
{{type}}
</div>
</template>

<script>
export default {

  name: 'right',

  replace: false,

  data () {
    return {
    	type: ''
    };
  },
  created: function(){
    this.$http.get('../../json/righttype.json').then(function(res){
      this.type = res.data.type;
    });
  },
};
</script>