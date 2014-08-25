define([
	'jquery',
	'api',
	'nav',
	'listManager',
	'util'
	],
	function($, api, nav, listManager, util){
	return {

		activate:function(initObject){

			if(!initObject || !initObject.project){
				alert("No se encontro el equipo");
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

			$("#teamBackButton").on('click', function(){
				nav.gotoPage("teams", initObject);
			});	

			$("#newTeamMemberButton").on('click', function(){
				nav.gotoPage("newTeamMember", initObject);
			});	

			var owner = this;
			api.get("user", {"teams>id":initObject.team.id}, function(response){
				if(response && response.length){
					listManager.populateUL($("#teamMemberList"), response)
				}else{
					listManager.populateUL($("#teamMemberList"), [{name:"No hay equipos en este proyecto todavia"}])
				}
			})	

			api.get("matrix", {"project>id":initObject.project.id}, function(response){
				if(response && response.length){
					listManager.populateUL($("#teamMatrixList"), response, owner.matrixClicked.bind(owner))
				}else{
					listManager.populateUL($("#teamMatrixList"), [{name:"No hay matrices en este proyecto todavia"}])
				}
			})	

		},

		matrixClicked:function(matrix){
			nav.gotoPage("needs", {project: this.initObject.project, matrix:matrix, team:this.initObject.team});
		},

		deactivate:function(){
			$('#teamBackButton').unbind('click');
			$('#newTeamMemberButton').unbind('click');
			listManager.unbind($("#teamMemberList"));
			listManager.unbind($("#teamMatrixList"));
		}

	};
})