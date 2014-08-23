define(function(){
	return {

		session:null,
		//host:"", // for local backends
		host:"http://comuneeds.org/",


		/*
		*
		* post
		*
		* attempts to add a new object to a collection
		*
		*/
		post:function(model, object, urlParams, doneHandler, failHandler){
			var paramsString = this.getParamsString(urlParams);

			var jqxhr = $.ajax({
				url: this.host + "/api/comuneeds/" + model,
				type: "POST",
				data: JSON.stringify(object)
			})

			// on complete
			.done(function(response){
				if(typeof(doneHandler) == 'function'){
					doneHandler(response);
				}
			})

			// on fail
			.fail(function(error) {
				if(typeof(failHandler) == 'function'){
					failHandler(error);
				}
			})
		},

		/*
		*
		* get
		*
		* returns a list or a single object from a particular model based on the query params
		*
		*/
		get:function(model, urlParams, doneHandler, failHandler){
			var paramsString = this.getParamsString(urlParams);

			var jqxhr = $.ajax({
				url: this.host + "/api/comuneeds/" + model  + paramsString ,
				type: "GET",
			})

			// on complete
			.done(function(response){
				if(typeof(doneHandler) == 'function'){
					doneHandler(response);
				}
			})

			// on fail
			.fail(function(error) {
				if(typeof(failHandler) == 'function'){
					failHandler(error);
				}
			})
		},


		/*
		*
		* getParamsString
		*
		* Unifies parameters as a string regardless of how they come in, accepted values include:
		*  - a key/value map {param:val, param2:val2} 
		*  - a query string param=val&param2=val2
		*  - undefined / null
		*/
		getParamsString:function(params){
			var paramsString;
			if(params == undefined || params == null || params == ""){
				paramsString = "";
			}else{
				if(typeof(params == "string")){
					paramsString = "?" + params;
				}else if(typeof(params) == "object"){
					paramsString = "?" + $.param(params);
				}
			}
			return paramsString;
		},


		//===============================================================================
		//        Auth Methods
		//===============================================================================

		/*
		*
		* login
		*
		* Invokes the API in order to login into the system
		* 
		*/
		login:function(username, password){

			// show a loader animation
			$.mobile.loading( 'show', {
				textVisible: false,
				theme: "c",
				textonly: false
			});

			// init the session information
			this.session = {};
			var owner = this;

			// perform the REST request to try to login
			var jqxhr = $.ajax({
				url: this.host + "/api/comuneeds/login", 
				headers:{
					Authorization: "Plain " + username + ":" + password
				}
			})

			// on complete
			.done(function(data){
				$.mobile.loading( 'hide' );
				if(data.hasOwnProperty("error")){
					alert(data.error);
				}else{
					// store the user in the session object so we can access the current user easily throught the application
					owner.session.user = data;

					// for now just send the user to the User list
					$.mobile.changePage("UserList");
				}
			})

			// on fail
			.fail(function(error) {
				console.warn(error);
			})
		},

		/*
		*
		* Logout
		*
		*
		*/
		logout:function(){

			// show a loader animation
			$.mobile.loading( 'show', {
				textVisible: false,
				theme: "c",
				textonly: false
			});

			var owner = this;

			// perform the REST request to try to login
			var jqxhr = $.ajax({
				url: this.host + "/api/comuneeds/logout", 
				headers:{
					"X-Auth-Token": owner.session.user.auth_token
				}
			})

			// on complete
			.done(function(data){
				$.mobile.loading( 'hide' );
				if(data.hasOwnProperty("error")){
					alert(data.error);
				}else{
					// re-init the session object
					owner.session.user = {};

					// for now just send the user to the User list
					$.mobile.changePage("loginPage");
				}
			})

			// on fail
			.fail(function(error) {
				console.warn(error);
			})
		}

	}

})