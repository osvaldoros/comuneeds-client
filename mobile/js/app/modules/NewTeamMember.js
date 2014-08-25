define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(initObject){
			if(!initObject || !initObject.project){
				alert("No se encontro el proyecto");
				nav.gotoPage("myProjects");
				return;
			}

			$("#newTeamMemberBackButton").on('click', function(){
				nav.back(initObject);
			});					
		},

		deactivate:function(){
			$('#newTeamMemberBackButton').unbind('click');
		}

	};


})