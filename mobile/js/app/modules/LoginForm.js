define([
	'jquery',
	'api',
	'util'
	],
	function($, api, util){
	return {

		activate:function(){

			console.log("LoginForm > activate")

			$("#loginForm").on('submit', function(e){
				return false;
			})

			$("#logoutButton").on('click', function(){
				api.logout();
			})

			$("#loginButton").on('click', function(){
				var form = $("#loginForm");
				var formValues = util.arrayToMap(form.serializeArray());
				if(!formValues.hasOwnProperty("username") || formValues.username == "") {
					alert("please enter your username");
					return;
				}
				if(!formValues.hasOwnProperty("password") || formValues.password == "") {
					alert("please enter your password");
					return;
				}
				api.login(formValues.username, formValues.password);
			})

		},

		deactivate:function(){
			console.log("LoginForm > deactivate")

			$('#loginForm').unbind('submit');
			$('#logoutButton').unbind('click');
			$('#loginButton').unbind('click');
		}

	};


})