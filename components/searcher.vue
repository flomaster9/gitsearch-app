<template>
		<div class="search">
			<h2>Search: </h2>
			<div class="search-params">
				<input @change='setDefaultParams' type="radio" name="search-params" value="users" v-model='searchParams.value'>
				<label>Username</label>

				<input @change='setDefaultParams' type="radio" name="search-params" value="repositories" v-model='searchParams.value'>
				<label for="">Repository</label>
			</div>
			<span>Sort filters:</span>
			<div class="filters" v-if='searchParams.value == "users"'>
				<input type="checkbox" v-model='searchParams.fields' value="login">
				<label for="">login</label>
				<input type="checkbox" v-model='searchParams.fields' value="fullname">
				<label for="">fullname</label>
				<br>
				<label for="">language</label>
				<input v-model='searchParams.language' type="text" placeholder="language">
			</div>
			<div class="filters" v-if='searchParams.value == "repositories"'>
				<input type="checkbox" v-model='searchParams.fields' value="name">
				<label for="">name</label>
				<input type="checkbox" v-model='searchParams.fields' value="description">
				<label for="">description</label>
				<input type="checkbox" v-model='searchParams.sorts' value="stars">
				<label for="">stars (order desc)</label>
				<br>
				<label for="">language</label>
				<input type="text" v-model='searchParams.language' placeholder="language">
			</div>	
			<br>
			<span>input:</span> <input v-model='searchParams.input' type="text">
			<input type="submit" @click.prevent='search'>
		</div>
</template>

<script>
	module.exports = {
		data: function() {
			return{
				searchParams: {
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
				this.$emit('get_search_params', this.searchParams);
			},
			setDefaultParams: function() {
				this.searchParams.input = '';
				this.searchParams.language = '';
				if (this.searchParams.value == 'users')
					this.searchParams.fields = ['login', 'fullname']
				else if (this.searchParams.value == 'repositories')
					this.searchParams.fields = ['name', 'description']
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