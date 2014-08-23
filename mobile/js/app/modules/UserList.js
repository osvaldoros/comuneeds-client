define([
	'jquery',
	'api',
	'util'
	],
	function($, api, util){
	return {

		activate:function(){

			var owner = this;
			api.get("user", null, function(response){
				owner.usersLoaded(response);
			})
		},

		usersLoaded:function(users){

			$("#userListUL").innerHTML = "";
			for (var i = users.length - 1; i >= 0; i--) {
				$("#userListUL").append( $("<li data-theme='c'></li>").clone().text( users[i].name) );
			};

			$("#userListUL").listview("refresh");

		},

		deactivate:function(){
		}

	};


})