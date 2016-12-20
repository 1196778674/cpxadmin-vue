<template>
<div class="store-list-right">
	<ul>
		<li v-for="item in list">
			<label>
	  <input type="checkbox" name="" value="{{item.id}}" v-model="item.checked">
			  {{item.name}}
	</label>
		</li >
	</ul>
</div>
</template>

<script>
export default {

  name: 'perbody',

  data () {
    return {
    	list: '',
    };
  },
  created: function(){
    this.$http.get('../../../../../json/storelistright.json', null).then(function(res){
      this.list = res.data;
    });
  },
  events: {
  	type: function(type){
  		console.log(this.$route.params);
  	},
  	typeChild: function(typeChild){
  		console.log(this.$route.params);
  	}
  },
};
</script>

<style lang="css" scoped>
.btn-event{
  position: absolute;
  right: 10px;
  top: 0px;
}
.store-list-right{
  padding: 20px;
}
.store-list-right ul{
  overflow: hidden;
}
.store-list-right ul li{
  float: left;
  margin-right: 15px;
}
</style>