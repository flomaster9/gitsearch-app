<template>
		<div class="search">
			<h2>Search: </h2>
			<div class="search-params">
				<input @change='setDefaultParams' type="radio" name="search-params" value="users" v-model='search_params.value'>
				<label>Username</label>

				<input @change='setDefaultParams' type="radio" name="search-params" value="repositories" v-model='search_params.value'>
				<label for="">Repository</label>
			</div>
			<span>Sort filters:</span>
			<div class="filters" v-if='search_params.value == "users"'>
				<input type="checkbox" v-model='search_params.fields' value="login">
				<label for="">login</label>
				<input type="checkbox" v-model='search_params.fields' value="fullname">
				<label for="">fullname</label>
				<br>
				<label for="">language</label>
				<input v-model='search_params.language' type="text" placeholder="language">
			</div>
			<div class="filters" v-if='search_params.value == "repositories"'>
				<input type="checkbox" v-model='search_params.fields' value="name">
				<label for="">name</label>
				<input type="checkbox" v-model='search_params.fields' value="description">
				<label for="">description</label>
				<input type="checkbox" v-model='search_params.sorts' value="stars">
				<label for="">stars (order desc)</label>
				<br>
				<label for="">language</label>
				<input type="text" v-model='search_params.language' placeholder="language">
			</div>	
			<br>
			<span>input:</span> <input v-model='search_params.input' type="text">
			<input type="submit" @click.prevent='search'>
		</div>
</template>

<script>
	module.exports = {
		data: function() {
			return{
				search_params: {
					value: 'users',
					input: '',
					language: '',
					fields: ['login', 'fullname'],
					sorts: [],
				},
			}
		},
		methods: {
			search: function() {
				this.$emit('get_search_params', this.search_params);
			},
			setDefaultParams: function() {
				this.search_params.input = '';
				this.search_params.language = '';
				if (this.search_params.value == 'users')
					this.search_params.fields = ['login', 'fullname']
				else if (this.search_params.value == 'repositories')
					this.search_params.fields = ['name', 'description']
			}
		}
	}
</script>

<style>
	span{
		margin:10px 0px 5px 0;
		display: inline-block;
	}
</style>