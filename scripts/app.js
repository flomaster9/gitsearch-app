var Vue = require('../node_modules/vue/dist/vue.min.js');
var search = require('./modules/search.js');
var searcherComponent = require('./components/searcher.js');
var repositories = require('./components/repositories.js');
var users = require('./components/users.js');
var innerRepos = require('./components/inner-repos.js');
var autocompleteInput = require('./components/autocomplete-input.js');

var vueResource = require('vue-resource');

Vue.use(vueResource);

var app = new Vue({
	el: '.app',

	components: {
		searcherComponent: searcherComponent,
		repositories: repositories,
		users: users,
		innerRepos: innerRepos,
		autocompleteInput: autocompleteInput,
	},

	data: {
		searchParams: {},
		items: null,
		currentView: null,
		repos: null,
		committers: null,
		commitAuthors: null,
	},

	methods: {
		setSearchParams: function(param) {
			this.searchParams = param; //value, input, language, fields, sorts
			search();
		},
		setRepos: function(repos) {
			this.repos = repos;	
		},
		setCommitters: function(committers) {
			this.committers = committers;
		},
		setAuthors: function(commit_authors) {
			this.commitAuthors = commit_authors;
		},
		removeRepos: function() {
			this.repos = null;
		}
	},
	created: function() {
		search = search(this);
	}
})
