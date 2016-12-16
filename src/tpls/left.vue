<template>
	<div>
		<ul>
			<li v-for="item in left" :class="{'active': item.active}" @click="isActive($index)">
				<a href="#" v-link="{path: item.url}">{{ item.name }}</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'left',

  replace: false,

  props: {
    url: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
    	left: ''
    };
  },
  created: function(){
    this.$http.get(this.url).then(function(res){
      this.left = res.data;
    });
  },
  methods: {
    isActive: function(i){
      $.each(this.left, function(i, val) {
        val.active = false;
      });
      this.left[i].active = true;
    }
  },
};
</script>