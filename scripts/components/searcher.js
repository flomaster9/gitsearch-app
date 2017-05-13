var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\nspan{\n\tmargin:10px 0px 5px 0;\n\tdisplay: inline-block;\n}\n")






































module.exports = {
	data: function() {
		return{
			search_params: {
				value: 'users',
				input: '',
				language: '',
				fields: [],
				sorts: [],
			},
		}
	},
	methods: {
		search: function() {
			this.$emit('get_search_params', this.search_params);
		},
		setDefaultParams: function() {
			this.search_params.input = '';
			this.search_params.language = '';
			this.search_params.fields = [];
			this.search_params.sorts = [];
		}
	}
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"search\">\n\t<h2>Search: </h2>\n\t<div class=\"search-params\">\n\t\t<input @change=\"setDefaultParams\" type=\"radio\" name=\"search-params\" value=\"users\" v-model=\"search_params.value\">\n\t\t<label>Username</label>\n\n\t\t<input @change=\"setDefaultParams\" type=\"radio\" name=\"search-params\" value=\"repositories\" v-model=\"search_params.value\">\n\t\t<label for=\"\">Repository</label>\n\t</div>\n\t<span>Sort filters:</span>\n\t<div class=\"filters\" v-if=\"search_params.value == &quot;users&quot;\">\n\t\t<input type=\"checkbox\" v-model=\"search_params.fields\" value=\"login\">\n\t\t<label for=\"\">login</label>\n\t\t<input type=\"checkbox\" v-model=\"search_params.fields\" value=\"fullname\">\n\t\t<label for=\"\">fullname</label>\n\t\t<br>\n\t\t<label for=\"\">language</label>\n\t\t<input v-model=\"search_params.language\" type=\"text\" placeholder=\"language\">\n\t</div>\n\t<div class=\"filters\" v-if=\"search_params.value == &quot;repositories&quot;\">\n\t\t<input type=\"checkbox\" v-model=\"search_params.fields\" value=\"name\">\n\t\t<label for=\"\">name</label>\n\t\t<input type=\"checkbox\" v-model=\"search_params.fields\" value=\"description\">\n\t\t<label for=\"\">description</label>\n\t\t<input type=\"checkbox\" v-model=\"search_params.sorts\" value=\"stars\">\n\t\t<label for=\"\">stars (order desc)</label>\n\t\t<br>\n\t\t<label for=\"\">language</label>\n\t\t<input type=\"text\" v-model=\"search_params.language\" placeholder=\"language\">\n\t</div>\t\n\t<br>\n\t<span>input:</span> <input v-model=\"search_params.input\" type=\"text\">\n\t<input type=\"submit\" @click.prevent=\"search\">\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\nspan{\n\tmargin:10px 0px 5px 0;\n\tdisplay: inline-block;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0e99449f", module.exports)
  } else {
    hotAPI.update("_v-0e99449f", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}