var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.textfield{\n\tposition: relative;\n}\n.textfield ul{\n\tpadding: 0px;\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0px;\n}\n.textfield li{\n\tpadding: 0px;\n}\n")




















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

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"autocomplete\">\n\t<p>U can find commits by committer(autocomplete):</p>\n\t<div class=\"textfiel\">\n\t\t<input type=\"text\" @focus=\"showCommitters\" @blur=\"hideCommitters\" @input=\"changeCommittersVisible\" v-model=\"autocomplete\">\n\t\t<ul v-if=\"showAutocomplete\">\n\t\t\t<li v-for=\"item in committerObj\" v-if=\"item.can_render\">\n\t\t\t\t{{item.author}}\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.textfield{\n\tposition: relative;\n}\n.textfield ul{\n\tpadding: 0px;\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0px;\n}\n.textfield li{\n\tpadding: 0px;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-72702b6f", module.exports)
  } else {
    hotAPI.update("_v-72702b6f", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}