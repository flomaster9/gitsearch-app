var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n.repo-items-container{\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n.list-container{\n\twidth: 50%;\n}\n\n.up{\n\tcolor: green;\n}\n\n.down{\n\tcolor: red;\n}\n\n.active{\n\tbackground-color: #dddddd;\n}\n\n.commits .filters{\n\tmargin: 10px 0;\n\tborder: 1px solid black;\n\tpadding: 5px;\n}\n\n.commits .filters p{\n\tmargin: 2px 0;\n}\n\n.commit-table{\n\tborder-collapse: collapse;\n}\n\nth, td{\n\twidth: 30%;\n\tpadding:2px;\n\tborder:1px solid black;\n}\n\n.author, .date{\n\ttext-align: center;\n}\n")





































































module.exports = {
	props: ['repos', 'currentView'],
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

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t<ul class=\"repos-list\">\n\t\t<li class=\"repo-item\" v-for=\"(repo, repo_index) in repos\" @click.self=\"findRepoItems(event, repo_index)\">\n\t\t\t{{repo.name}} \n\t\t\t<span v-if=\"currentView.trim() != &quot;users&quot;\">-- ({{repo.owner.login}})</span>\n\t\t\t<div class=\"repo-items-container active\" v-if=\"cur_repo &amp;&amp; (cur_repo.index == repo_index)\">\n<!-- if -->\n\t\t\t\t<div class=\"commits list-container\" v-if=\"commits &amp;&amp; commits.length > 0\">\n\t\t\t\t\t<h3>commits: <span>(last 30 or less)</span></h3>\n\t\t\t\t\t<div class=\"filters\">\n\t\t\t\t\t\t<span> Sort by date</span> \n\t\t\t\t\t\t<span class=\"up\" @click.self=\"sortCommitsByDate()\">UP</span> \n\t\t\t\t\t\t<span class=\"down\" @click.self=\"sortCommitsByDate(event, &quot;reverse&quot;)\">DOWN</span> \n\t\t\t\t\t\t<span> | Sort by msg:</span> \n\t\t\t\t\t\t<span class=\"up\" @click.self=\"sortCommitsByMsg()\">UP</span> \n\t\t\t\t\t\t<span class=\"down\" @click.self=\"sortCommitsByMsg(event, &quot;reverse&quot;)\">DOWN</span> \n\t\t\t\t\t\t<slot name=\"autocomplete\"></slot>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<table class=\"commit-table\">\n\t\t\t\t\t\t<tbody><tr>\n\t\t\t\t\t\t\t<th>Committer</th>\n\t\t\t\t\t\t\t<th>Message</th>\n\t\t\t\t\t\t\t<th>date</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr v-for=\"item in commits\">\n\t\t\t\t\t\t\t<td class=\"author\">\n\t\t\t\t\t\t\t\t<span v-if=\"item.committer\">\n\t\t\t\t\t\t\t\t\t{{item.committer.login}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span v-if=\"!item.committer\">\n\t\t\t\t\t\t\t\t\t{{item.commit.author.name}}\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"msg\">\n\t\t\t\t\t\t\t\t<span>{{item.commit.message}}</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td class=\"date\">\n\t\t\t\t\t\t\t\t<span>{{item.commit.author.date}}</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody></table>\n\t\t\t\t</div>\n<!-- else -->\n\t\t\t\t<div class=\"commits list-container\" v-if=\"!commits || commits.length == 0\">\n\t\t\t\t\t<h3>there are no commits in repository</h3>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"branches list-container\" v-if=\"branches &amp;&amp; branches.length > 0\">\n\t\t\t\t\t<h3>branches:</h3>\n\t\t\t\t\t<ul class=\"branches-list\">\n\t\t\t\t\t\t<li class=\"branch-item\" v-for=\"branch in branches\">\n\t\t\t\t\t\t\t{{branch.name}}\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t</ul>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n.repo-items-container{\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n.list-container{\n\twidth: 50%;\n}\n\n.up{\n\tcolor: green;\n}\n\n.down{\n\tcolor: red;\n}\n\n.active{\n\tbackground-color: #dddddd;\n}\n\n.commits .filters{\n\tmargin: 10px 0;\n\tborder: 1px solid black;\n\tpadding: 5px;\n}\n\n.commits .filters p{\n\tmargin: 2px 0;\n}\n\n.commit-table{\n\tborder-collapse: collapse;\n}\n\nth, td{\n\twidth: 30%;\n\tpadding:2px;\n\tborder:1px solid black;\n}\n\n.author, .date{\n\ttext-align: center;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-498e1930", module.exports)
  } else {
    hotAPI.update("_v-498e1930", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}