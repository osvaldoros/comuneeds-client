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

			$("#teamsBackButton").on('click', function(){
				nav.back(initObject);
			});	
			$("#newTeamButton").on('click', function(){
				nav.gotoPage("newTeam", initObject);
			});			

			var owner = this;
			api.get("team", {"project>id":initObject.project.id}, function(response){
				if(response && response.length){
					listManager.populate($("#teamList"), response, owner.teamClicked.bind(this))
				}else{
					listManager.populate($("#teamList"), [{name:"No hay equipos en este proyecto todavia"}])
				}
			})	

		},

		teamClicked:function(team){

		},

		deactivate:function(){
			$('#teamsBackButton').unbind('click');
		}

	};


})