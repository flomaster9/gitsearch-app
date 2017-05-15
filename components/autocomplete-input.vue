<template>
	<div class="autocomplete">
		<p>U can find commits by committer(autocomplete):</p>
		<input type="text" @input='i' v-model='autocomplete'>
	</div>
</template>

<script>
	module.exports = {
		props: [''],
		data: function() {
			return {
				autocomplete: '',
			}
		},
		methods: {
			i: function() {
				console.log(this.autocomplete)
			}
		},
	}
</script>


<style>

	
</style>