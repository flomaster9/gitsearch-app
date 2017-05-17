<template>
	<div class="autocomplete">
		<p>U can find commits by committer(autocomplete):</p>
		<div class="textfiel">
			<input type="text" 
				@focus='showCommitters'
				@blur='hideCommitters'
				@input='changeCommittersVisible'
			 	v-model='autocomplete'>
			<ul v-if='showAutocomplete'>
				<li v-for='item in committerObj' 
					v-if='item.can_render'>
					{{item.author}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: ['committers'],
		data: function() {
			return {
				autocomplete: '',
				showAutocomplete: false,
				committerObj: [],
				authors: [],
			}
		},
		methods: {
			showCommitters: function() {
				this.showAutocomplete = true;
			},
			hideCommitters: function() {
				this.showAutocomplete = false;
			},
			changeCommittersVisible: function() {
				this.authors = [];
				var self = this;
				this.committerObj.forEach(function(committer) {
					if (committer.author.toLowerCase()
							.indexOf(self.autocomplete.toLowerCase()) < 0) {
						committer.can_render = false;
					}else{
						committer.can_render = true;
						self.authors.push(committer.author.toLowerCase());
					}
				})
				this.$emit('get_authors', this.authors);
			},
		},
		beforeMount: function() {
			this.committerObj = this.committers.map(function(item) {
				return {
					author: item,
					can_render: true,
				}
			});
			this.changeCommittersVisible();
		}
	}
</script>


<style>
	.textfield{
		position: relative;
	}
	.textfield ul{
		padding: 0px;
		position: absolute;
		top: 100%;
		left: 0px;
	}
	.textfield li{
		padding: 0px;
	}
</style>