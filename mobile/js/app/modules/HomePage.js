define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){
			$("#newProjectButton").on('click', function(){
				nav.gotoPage("signupPage")
			});	
			$("#guideButton").on('click', function(){
				nav.gotoPage("guidePage")
			});			
			$("#signinButton").on('click', function(){
				nav.gotoPage("loginPage")
			});			
		},

		deactivate:function(){
			$('#newProjectButton').unbind('click');
			$('#guideButton').unbind('click');
			$('#signinButton').unbind('click');			
		}

	};


})