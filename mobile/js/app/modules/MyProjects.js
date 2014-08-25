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
					if(response && response.length){
						listManager.populateUL($("#projectList"), response, owner.projectClicked.bind(owner))
					}else{
						listManager.populateUL($("#projectList"), [{name:"No has creado ningun proyecto todavia"}])
					}
				})
				api.get("shared_projects", {"user_id":currentUser.id}, function(response){
					

					if(response && response.length){
						listManager.populateUL($("#sharedProjectList"), response, owner.projectClicked.bind(owner))
					}else{
						listManager.populateUL($("#sharedProjectList"), [{name:"No tienes proyectos compartidos todavia"}])
					}

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
			listManager.unbind($("#sharedProjectList"));
		}

	};


})