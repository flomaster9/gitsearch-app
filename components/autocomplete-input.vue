<template>
	<div class="autocomplete">
		<p>U can find commits by committer(autocomplete):</p>
		<div class="textfiel">
			<input type="text" 
				@focus='showCommitters'
				@blur='hideCommitters'
				@input='changeCommittersVisible'
			 	v-model='autocomplete'>
			<ul v-if='show_autocomplete'>
				<li v-for='item in committers_obj' 
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
				show_autocomplete: false,
				committers_obj: [],
				authors: [],
			}
		},
		methods: {
			showCommitters: function() {
				this.show_autocomplete = true;
			},
			hideCommitters: function() {
				this.show_autocomplete = false;
			},
			changeCommittersVisible: function() {
				this.authors = [];
				var self = this;
				this.committers_obj.forEach(function(committer) {
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
			this.committers_obj = this.committers.map(function(item) {
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