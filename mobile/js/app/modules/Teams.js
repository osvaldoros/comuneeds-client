define([
	'jquery',
	'api',
	'nav',
	'listManager',
	'util'
	],
	function($, api, nav, listManager, util){
	return {
		
		initObject:null,

		activate:function(initObject){

			if(!initObject || !initObject.project){
				alert("No se encontro la lista de equipos");
				nav.gotoPage("myProjects");
				return;
			}

			this.initObject = initObject;

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}	

			$("#teamsBackButton").on('click', function(){
				nav.gotoPage("project", initObject);
			});	

			// If am the admin of the project
			if(app.utils.ObjectUtils.isObject(initObject) && app.utils.ObjectUtils.isObject(initObject.project) && app.utils.ObjectUtils.isObject(initObject.project.administrator) && initObject.project.administrator.id == currentUser.id){
				$("#newTeamButton").show();
				$("#newTeamButton").on('click', function(){
					nav.gotoPage("newTeam", initObject);
				});			

				var owner = this;
				api.get("team", {"project>id":initObject.project.id}, function(response){
					if(response && response.length){
						listManager.populateUL($("#teamList"), response, owner.teamClicked.bind(owner))
					}else{
						listManager.populateUL($("#teamList"), [{name:"No hay equipos en este proyecto todavia"}])
					}
				})	
			}else{
				$("#newTeamButton").hide();
				var teamsMatching = [];
				if(currentUser.teams && currentUser.teams.length > 0){
					for (var i = currentUser.teams.length - 1; i >= 0; i--) {
						var team = currentUser.teams[i];
						if(team && team.project && team.project.id){
							if(initObject.project.id == team.project.id){
								teamsMatching.push(team);
							}
						}
					};
				}

				if(teamsMatching && teamsMatching.length > 0){
					listManager.populateUL($("#teamList"), teamsMatching, this.teamClicked.bind(this))
				}else{
					listManager.populateUL($("#teamList"), [{name:"Ocurrio un error, no eres parte de ningun equipo todavia. Contacta al administrador del proyecto."}])
				}
			}

		},

		teamClicked:function(team){
			nav.gotoPage("team", {project:this.initObject.project, team:team});
		},

		deactivate:function(){
			$('#teamsBackButton').unbind('click');
			listManager.unbind($("#teamList"));
		}

	};


})