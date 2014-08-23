define([
	'jquery',
	'api',
	'util',
	'nav'
	],
	function($, api, util, nav){
	return {

		activate:function(){

			console.log("LoginForm > activate")

			$("#loginForm").on('submit', function(e){
				return false;
			})

			$("#logoutButton").on('click', function(){
				api.logout();
			})

			$("#loginSignupButton").on('click', function(){
				nav.gotoPage("signupPage");
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
				api.login(formValues.username, formValues.password, function(user){
					nav.gotoPage("userPage");
				});
			})

		},

		deactivate:function(){
			console.log("LoginForm > deactivate")

			$('#loginForm').unbind('submit');
			$('#logoutButton').unbind('click');
			$('#loginButton').unbind('click');
			$('#loginSignupButton').unbind('click');
		}

	};


})