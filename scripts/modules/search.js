module.exports = function(app) {

	var fields = '';
	var sorts = '';
	var language = ''; 

	var paramsConstructor = function() {

		app.currentView = null;

		fields = '+in:' + (app.searchParams.fields.length > 0 ? app.searchParams.fields.join('|') : 1);
		language = '+language:' + (app.searchParams.language != '' ? app.searchParams.language : 1);

		if (app.searchParams.value != 'users') 
			sorts = '+sort:' + (app.searchParams.sorts.length > 0 ? app.searchParams.sorts.join('|') : 1);
	}

	//search params : value, input, language, fields, sorts

	var findInfo = function() {

		var url = 'https://api.github.com/search/' 
		  			+ app.searchParams.value + '?q=' 
		  								+ app.searchParams.input 
		  									+ fields  + sorts  + language;

		app.$http.get(url).then(function(responce) {
			app.items = responce.body.items;
	   		app.currentView = app.searchParams.value == 'users' ? 
	  			 'users' : 'repositories'; 

		}, function(error) {
			console.log('error');
		})
	}

	return function() {
		paramsConstructor();
		findInfo();
	}
}