<template>

</template>

<script>
export default {

  name: 'list',

  data () {
    return {
    	list: ''
    };
  },
  created: function(){
  	var self = this;
  	window.Ajax('../../../../../../json/storelistleft.json', null ,'GET', function(res){
  		self.list = res;
  	});
  },
  events: {
  	addstorelist: function(addstorelist) {
  		console.log(this.addstorelist);
      if(!addstorelist) return false;
      this.list.unshift({
        title: addstorelist
      });
    }
  },
  methods: {
  	delete: function(i){
  		this.list.splice(i,1);
  	}
  },
};
</script>