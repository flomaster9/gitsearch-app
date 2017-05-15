var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n\n")








module.exports = {
	props: [''],
	data: function() {
		return {
			autocomplete: '',
		}
	},
	methods: {
		i: function() {
			console.log(this.autocomplete)
		}
	},
}

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"autocomplete\">\n\t<p>U can find commits by committer(autocomplete):</p>\n\t<input type=\"text\" @input=\"i\" v-model=\"autocomplete\">\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-72702b6f", module.exports)
  } else {
    hotAPI.update("_v-72702b6f", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}