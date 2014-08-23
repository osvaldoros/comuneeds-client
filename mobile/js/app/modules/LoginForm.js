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
				if(!formValues.hasOwnProperty("email") || formValues.email == "") {
					alert("please enter your email address");
					return;
				}
				if(!formValues.hasOwnProperty("password") || formValues.password == "") {
					alert("please enter your password");
					return;
				}
				api.login(formValues.email, formValues.password);
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