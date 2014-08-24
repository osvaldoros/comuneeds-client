define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){
			$("#guideBackButton").on('click', function(){
				nav.back();
			});				
		},

		deactivate:function(){
			$('#guideBackButton').unbind('click');
		}

	};


})