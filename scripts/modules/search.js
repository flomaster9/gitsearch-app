module.exports = function(app) {

	var fields = '';
	var sorts = '';
	var language = ''; 

	var paramsConstructor = function() {

		app.currentView = null;

		fields = '+in:' + (app.search_params.fields.length > 0 ? app.search_params.fields.join('|') : 1);
		language = '+language:' + (app.search_params.language != '' ? app.search_params.language : 1);

		if (app.search_params.value != 'users') 
			sorts = '+sort:' + (app.search_params.sorts.length > 0 ? app.search_params.sorts.join('|') : 1);
	}

	//search params : value, input, language, fields, sorts

	var findInfo = function() {
		$.ajax({
			//https://api.github.com/search/users?q=INPUT+in:login|fullname+language:0
		  	url: 'https://api.github.com/search/' 
		  			+ app.search_params.value + '?q=' 
		  								+ app.search_params.input 
		  									+ fields  + sorts  + language
		})
	  	.done(function(msg) {
	   		app.items = msg.items;
	   		app.currentView = app.search_params.value == 'users' ? 
	  			 'users' : 'repositories'; 
		});
	}

	return function() {
		paramsConstructor();
		findInfo();
	}
}