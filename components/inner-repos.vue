<template>
	<ul class="repos-list">
		<li class="repo-item" 
		v-for='(repo, repo_index) in repos'
		@click.self='findRepoItems(event, repo_index)'>
			{{repo.name}} 
			<span v-if='currentView.trim() != "users"'>-- ({{repo.owner.login}})</span> -- STARS:{{repo.stargazers_count}}
			<div class="repo-items-container active"
				v-if='curRepo && (curRepo.index == repo_index)'>
<!-- if -->
				<div class="commits list-container"
					v-if='commits && commits.length > 0'>
					<h3>commits: <span>(last 30 or less)</span></h3>
					<div class="filters">
						<span> Sort by date</span> 
						<span class="up" @click.self='sortCommitsByDate()'>UP</span> 
						<span class="down" @click.self='sortCommitsByDate(event, "reverse")'>DOWN</span> 
						<span> | Sort by msg:</span> 
						<span class="up" @click.self='sortCommitsByMsg()'>UP</span> 
						<span class="down" @click.self='sortCommitsByMsg(event, "reverse")'>DOWN</span> 
						<slot name='autocomplete'></slot>
					</div>

					<table class="commit-table" @click='filterCommitsByAuthors'>
						<tr>
							<th>Committer</th>
							<th>Message</th>
							<th>date</th>
						</tr>
						<tr v-for='item in commits' 
							v-if='filterCommitsByAuthors(event, item)'>
							<td class="author">
								<span v-if='item.committer'>
									{{item.committer.login}}
								</span>
								<span v-if='!item.committer'>
									{{item.commit.author.name}}
								</span>
							</td>
							<td class="msg">
								<span>{{item.commit.message}}</span>
							</td>
							<td class="date">
								<span>{{item.commit.author.date}}</span>
							</td>
						</tr>
					</table>
				</div>
<!-- else -->
				<div class="commits list-container"
					v-if='!commits || commits.length == 0'>
					<h3>there are no commits in repository</h3>
				</div>

				<div class="branches list-container"
					v-if='branches && branches.length > 0'>
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
		props: ['repos', 'currentView', 'commitAuthors'],
		data: function() {
			return {
				commits: [],
				branches: [],
				curRepo: null,
				committers: [],
			}
		},
		methods: {

			findCommitters: function(self) { //for autocomplete
				this.committers = [];

				var temp = !!this.commits[0].committer ?
					this.commits[0].committer.login : this.commits[0].commit.author.name;

				var can_save = true;

				self.committers.push(temp);

				this.commits.forEach(function(commit) {					//этот монстр проверяет
					can_save = true;									//есть ли в массиве this.committers
																		//текущий автор
					self.committers.forEach(function(committer) {		//если автор уже есть то ничего не делает,
																		//если его нету то проверяет существует ли вообще 
						temp = !!commit.committer ? 					// <=== обьект committer в комите
							commit.committer.login : commit.commit.author.name; //полюбому что - то сохраняем

						if (committer.trim() == temp.trim()) {			//если автора в массиве еще нету, то можем сохранить
							can_save = false;							//либо логин, либо имя)
						}
					})

					if (can_save) 
						self.committers.push(temp); 

				})

				this.$emit('get_committers', this.committers);			
			}, 

			findCurRepo: function(index) {
				this.curRepo = this.repos[index];
				this.curRepo.index = index; 
			},

			getRepoCommits: function() {
				var url = this.curRepo.commits_url	//удаляю {/sha}
								.substr(0, this.curRepo.commits_url.length-6)

				this.$http.get(url).then(function(responce) {
					this.commits = responce.body;
			    	this.findCommitters(this);
				}, function(error) {
					console.log(error);
				})
			},

			getRepoBranches: function() {
				var url = this.curRepo.branches_url	//удаляю {/branch}}
						.substr(0, this.curRepo.branches_url.length-9)
						
				this.$http.get(url).then(function(responce) {
					this.branches = responce.body;
				}, function(error) {
					console.log(error);
				})
			},

			findRepoItems: function(event, index) {
				this.committers = this.branches = this.commits = null;
				this.findCurRepo(index);
				this.getRepoCommits();
				this.getRepoBranches();
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
			filterCommitsByAuthors: function(event, item) {
				var can_render = false;
				var author = !!item.committer ? 
						item.committer.login : item.commit.author.name;


				if (!this.commitAuthors){
					return true;
				}

				this.commitAuthors.forEach(function(item) {
					if (item.toLowerCase() == author.toLowerCase()) 
						can_render = true;
				})

				return can_render;
			}
		},
	}
</script>


<style>

	.repo-items-container{
		display: flex;
	}
	.list-container{
		width: 50%;
	}

	.up{
		color: green;
	}

	.down{
		color: red;
	}

	.active{
		background-color: #dddddd;
	}

	.commits .filters{
		margin: 10px 0;
		border: 1px solid black;
		padding: 5px;
	}

	.commits .filters p{
		margin: 2px 0;
	}

	.commit-table{
		border-collapse: collapse;
	}

	th, td{
		width: 30%;
		padding:2px;
		border:1px solid black;
	}

	.author, .date{
		text-align: center;
	}
</style>