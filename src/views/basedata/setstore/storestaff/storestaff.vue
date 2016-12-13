<template>
	<div class="store-staff">
		<vu-search></vu-search>
		<vu-formlist></vu-formlist>
	</div>
</template>

<script>
export default {

  name: 'storestaff',

  replace: false,

  data () {
    return {
    	list: ''
    };
  },
  components: {
    "vuSearch": require('./staffsearch.vue'),
    "vuFormlist": require('./staffform.vue')
  },
};
</script>