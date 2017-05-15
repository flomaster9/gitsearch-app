<template>
	<ul class="repos-list">
		<li class="repo-item" 
		v-for='(repo, repo_index) in repos'
		@click.self='findRepoItems(event, repo_index)'>
		{{repo.name}}
			<div class="repo-items-container active"
				v-if='cur_repo && (cur_repo.index == repo_index)'>
				<div class="commits list-container">
					<h3>commits:</h3>
					<p>
						<span> Sort by date</span> 
						<span class="up" @click.self='sortCommitsByDate()'>UP</span> 
						<span class="down" @click.self='sortCommitsByDate(event, "reverse")'>DOWN</span> 
						<span> | Sort by msg:</span> 
						<span class="up" @click.self='sortCommitsByMsg()'>UP</span> 
						<span class="down" @click.self='sortCommitsByMsg(event, "reverse")'>DOWN</span> 
					</p>
					<ul class="commit-list">
						<li class="commit-item" 
							v-for='item in commits'>
							{{item.author.login}}  {{item.commit.message}}  {{item.commit.author.date}}
						</li>
					</ul>
				</div>

				<div class="branches list-container">
					<h3>branches:</h3>
					<ul class="branches-list">
						<li class="branch-item" 
							v-for='branch in branches'>
							{{branch.name}}
						</li>
					</ul>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
	module.exports = {
		props: ['repos'],
		data: function() {
			return {
				commits: [],
				branches: [],
				cur_repo: null,
			}
		},
		methods: {
			findCurRepo: function(index) {
				this.cur_repo = this.repos[index];
				this.cur_repo.index = index; 
			},

			getRepoCommits: function(self) {
				$.ajax({
				  	url: self.cur_repo.commits_url	//удаляю {/sha}
						.substr(0, self.cur_repo.commits_url.length-6)
				})
			  	.done(function( msg ) {
			    	self.commits = msg;
				});
			},

			getRepoBranches: function(self) {
				$.ajax({
				  	url: self.cur_repo.branches_url	//удаляю {/branch}}
						.substr(0, self.cur_repo.branches_url.length-9)
				})
			  	.done(function( msg ) {
			    	self.branches = msg;
				});
			},

			findRepoItems: function(event, index) {
				this.branches = this.commits = null;
				this.findCurRepo(index);
				this.getRepoCommits(this);
				this.getRepoBranches(this);
			},
			sortCommitsByDate: function(event, reverse) {
				this.commits.sort((a, b) => {
					if (!!reverse)
						return a.commit.author.date < b.commit.author.date ? 1 : -1;
					else
						return a.commit.author.date > b.commit.author.date ? 1 : -1;
				})
			},
			sortCommitsByMsg: function(event, reverse) {
				if (!!reverse) 
					this.commits.sort((a, b) => {
						return a.commit.message.toLowerCase() > b.commit.message.toLowerCase() ? 1 : -1;
					})	
				else
					this.commits.sort((a, b) => {
						return a.commit.message.toLowerCase() < b.commit.message.toLowerCase() ? 1 : -1;
					})
			},
		},
	}
</script>