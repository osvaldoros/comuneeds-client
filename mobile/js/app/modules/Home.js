define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){
			$("#homeNewProjectButton").on('click', function(){
				nav.gotoPage("signup")
			});	
			$("#guideButton").on('click', function(){
				nav.gotoPage("guide")
			});			
			$("#signinButton").on('click', function(){
				nav.gotoPage("login")
			});			
		},

		deactivate:function(){
			$('#homeNewProjectButton').unbind('click');
			$('#guideButton').unbind('click');
			$('#signinButton').unbind('click');			
		}

	};


})