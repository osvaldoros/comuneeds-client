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
				nav.gotoPage("newProjectPage")
			});		
			$("#guideButton").on('click', function(){
				nav.gotoPage("guidePage")
			});			
			$("#signinButton").on('click', function(){
				nav.gotoPage("loginPage")
			});			
		},

		deactivate:function(){
		}

	};


})