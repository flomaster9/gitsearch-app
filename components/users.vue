<template>
	<div class="users">
		<h2>user:</h2>
		<ul class="users-list">
			<li v-for='(user, user_index) in items'
			 	class="user-item"
			 	@click.self='findUserRepos(event, user_index)'>
				{{user.login}}
				<div class="repos-list-container active" 
					v-if='curUser && (curUser.index == user_index)'>
					<h3>repos:</h3>
					
					<slot name='repos'></slot>

				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	module.exports = {
		props: ['items'],
		data: function() {
			return {
				repos: [],
				curUser: null,
			}
		},
		methods: {
			findCurUser: function(index) {
				this.$emit('remove_repos', this.repos);
				this.curUser = this.items[index];
				this.curUser.index = index; 
			},

			getUserRepos: function() {
				this.$http.get(this.curUser.repos_url).then(function(responce) {

					this.repos = responce.body;
			    	this.$emit('get_repos', this.repos);

				}, function(error) {
					console.log(error)
				})
			},

			findUserRepos: function(event, index) {
				this.findCurUser(index);
				this.getUserRepos();
			},
		},
	}
</script>

<style>

	
	
</style>