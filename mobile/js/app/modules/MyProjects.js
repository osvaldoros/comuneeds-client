define([
	'jquery',
	'api',
	'nav',
	'util',
	'listManager'
	],
	function($, api, nav, util, listManager){
	return {

		activate:function(initObject){
			var owner = this;
			var currentUser = api.getCurrentUser();

			if(currentUser){
				api.get("project", {"administrator>id":currentUser.id}, function(response){
					if(response && response.length){
						listManager.populateUL($("#projectList"), response, owner.projectClicked.bind(owner))
					}else{
						listManager.populateUL($("#projectList"), [{name:"No has creado ningun proyecto todavia"}])
						if(currentUser.teams && currentUser.teams.length == 1 &&
						  (!app.utils.ObjectUtils.isObject(initObject) || !initObject.back)
						){
							var singleTeam = currentUser.teams[0];
							nav.gotoPage("team", {project:singleTeam.project, team:singleTeam});
							return;
						}
					}

					api.get("shared_projects", {"user_id":currentUser.id}, function(response){

						if(response && response.length){
							listManager.populateUL($("#sharedProjectList"), response, owner.projectClicked.bind(owner))
						}else{
							listManager.populateUL($("#sharedProjectList"), [{name:"No tienes proyectos compartidos todavia"}])
						}

					})
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