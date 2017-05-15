<template>
	<div class="users">
		<h2>user:</h2>
		<ul class="users-list">
			<li v-for='(user, user_index) in items'
			 	class="user-item"
			 	@click.self='findUserRepos(event, user_index)'>
				{{user.login}}
				<div class="repos-list-container active" 
					v-if='cur_user && (cur_user.index == user_index)'>
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
				cur_user: null,
				cur_repo: null,
			}
		},
		methods: {
			findCurUser: function(index) {
				this.$emit('remove_repos', this.repos);
				this.cur_user = this.items[index];
				this.cur_user.index = index; 
			},

			getUserRepos: function(self) {
				$.ajax({
				  	url: self.cur_user.repos_url
				})
			  	.done(function( msg ) {
			    	self.repos = msg;
			    	self.$emit('get_repos', self.repos);
				});
			},

			findUserRepos: function(event, index) {
				this.findCurUser(index);
				this.getUserRepos(this);
			},
		},
	}
</script>

<style>

	
	
</style>