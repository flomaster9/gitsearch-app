var Vue = require('../node_modules/vue/dist/vue.min.js');
var search = require('./modules/search.js');
var searcherComponent = require('./components/searcher.js');

var app = new Vue({
	el: '.app',

	components: {
		searcherComponent: searcherComponent,
	},

	data: {
		search_params: {},
		users: null,
		repositories: null,
	},

	methods: {
		setSearchParams: function(param) {
			this.search_params = param; //value, input, language, fields, sorts
			search();
		},
	},
	computed:{
		currentView: function() {
			return this.users ? 'users' : 
				this.repositories ? 'repositories' : null; 
		}
	},
	created: function() {
		search = search(this);
	}
})
