define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){
			$("#signupLoginButton").on('click', function(){
				nav.gotoPage("loginPage")
			});		
			$("#createAccountButton").on('click', function(){
				nav.gotoPage("guidePage")
			});			
		},

		deactivate:function(){
			$('#signupLoginButton').unbind('click');
			$('#createAccountButton').unbind('click');
		}

	};


})