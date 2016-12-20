<template>
  <div class="admin-primary">
    <ul>
      <li v-for="item in headtop" :class="{'active': item.active}" @click="isActive($index)" type="button" class="btn btn-default admin-but" data-toggle="dropdown">
        <a href="#" :class="{'active': item.active}" v-link="{path: item.url}">{{ item.name }}</a>
      </li>
    </ul>
 </div>
</template>

<script>
export default {

  name: 'headtab',

  data () {
    return {
    	headtop: ''
    };
  },
  created: function(){
    console.log(this.$route.query);
    this.$http.get('../../json/headtop.json').then(function(res){
      this.headtop = res.data;
    });
  },
  methods: {
    isActive: function(i){
      $.each(this.headtop, function(i, val) {
        val.active = false;
      });
      this.headtop[i].active = true;
    }
  },
};
</script>