var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n\n\n")





















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

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"users\">\n\t<h2>user:</h2>\n\t<ul class=\"users-list\">\n\t\t<li v-for=\"(user, user_index) in items\" class=\"user-item\" @click.self=\"findUserRepos(event, user_index)\">\n\t\t\t{{user.login}}\n\t\t\t<div class=\"repos-list-container active\" v-if=\"cur_user &amp;&amp; (cur_user.index == user_index)\">\n\t\t\t\t<h3>repos:</h3>\n\t\t\t\t\n\t\t\t\t<slot name=\"repos\"></slot>\n\n\t\t\t</div>\n\t\t</li>\n\t</ul>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-075c9dae", module.exports)
  } else {
    hotAPI.update("_v-075c9dae", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}