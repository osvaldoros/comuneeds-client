define([
	'jquery',
	'api',
	'nav',
	'util',
	'listManager'
	],
	function($, api, nav, util, listManager){
	return {

		activate:function(){
			var owner = this;
			var currentUser = api.getCurrentUser();

			if(currentUser){
				api.get("project", {"administrator>id":currentUser.id}, function(response){
					listManager.populateUL($("#projectList"), response, owner.projectClicked.bind(this))
				})
			}

			$("#newProjectButton").on('click', function(){
				nav.gotoPage("newProject");
			})

		},

		projectClicked:function(project){
			nav.gotoPage("project", {project:project});
		},

		deactivate:function(){
			$('#newProjectButton').unbind('click');
			listManager.unbind($("#projectList"));
		}

	};


})