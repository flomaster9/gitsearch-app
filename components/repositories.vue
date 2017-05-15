<template>
	<div class="repositories">
		<h2>repositories:</h2>
		<div class="repos-list-container">
			<h3>repos:</h3>

			<slot name='repos'></slot>
		
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['items'],
		
		data: function() {
			return {
				
			}
		},

		created: function() {
			this.$emit('get_repos', this.items);
		}
	}
</script>

<style>
	
</style>