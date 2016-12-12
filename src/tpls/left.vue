<template>
	<div>
		<ul>
			<li v-for="left in lefts">{{ left.name }}</li >
		</ul>
	</div>
</template>

<script>
export default {

  name: 'left',

  replace: false,

  data () {
    return {
    	lefts: [{"id": "1", "name": "部门设置"},{"id": "2", "name": "门店员工"},{"id": "3", "name": "供应商"}];
    };
  }
};
</script>