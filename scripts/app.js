var Vue = require('../node_modules/vue/dist/vue.min.js');
var search = require('./modules/search.js');
var searcherComponent = require('./components/searcher.js');
var repositories = require('./components/repositories.js');
var users = require('./components/users.js');

var app = new Vue({
	el: '.app',

	components: {
		searcherComponent: searcherComponent,
		repositories: repositories,
		users: users,
	},

	data: {
		search_params: {},
		items: null,
		currentView: null,
	},

	methods: {
		setSearchParams: function(param) {
			this.search_params = param; //value, input, language, fields, sorts
			search();
		},
	},
	created: function() {
		search = search(this);
	}
})
