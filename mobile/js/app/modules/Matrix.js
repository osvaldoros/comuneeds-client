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

			var owner = this;

			if(!initObject || !initObject.project){
				alert("No se encontro el proyecto");
				nav.gotoPage("myProjects");
				return;
			}

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}				

			this.initObject = initObject;

			$("#matrixName").text(initObject.matrix.name);

			$('#downloadFullMatrixButton').attr('href',api.getApiPath() + '/matrix_pdf?matrix_id=' + initObject.matrix.id);
			
			$("#matrixBackButton").on('click', function(){
				nav.gotoPage("matrices", initObject);
			});	
			

			$("#unifyMatrixButton").on('click', function(){
				alert("Coming Soon");
			});
			
			$("#openUnifiedMatrixButton").on('click', function(){
				alert("Coming Soon");
			});			

			api.get("team", {"project>id":initObject.project.id}, function(response){
				if(response && response.length){
					listManager.populateUL($("#matrixTeamList"), response, owner.teamClicked.bind(owner))
				}else{
					if(app.utils.ObjectUtils.isObject(initObject) && app.utils.ObjectUtils.isObject(initObject.project) && app.utils.ObjectUtils.isObject(initObject.project.administrator) && initObject.project.administrator.id == currentUser.id){
						listManager.populateUL($("#matrixTeamList"), [{name:"Crear nuevo equipo"}], owner.createNewTeamClicked.bind(owner))
					}else{
						listManager.populateUL($("#matrixTeamList"), [{name:"No hay equipos en este proyecto todavia"}])
					}
				}
			})	

		},

		teamClicked:function(team){
			nav.gotoPage("needs", {project: this.initObject.project, matrix:this.initObject.matrix, team:team});
		},

		createNewTeamClicked:function(team){
			nav.gotoPage("newTeam", {project: this.initObject.project, matrix:this.initObject.matrix, pageOnComplete:"needs"});
		},				

		deactivate:function(){
			$('#matrixBackButton').unbind('click');
			$('#downloadFullMatrixButton').unbind('click');
			$('#unifyMatrixButton').unbind('click');
			$('#openUnifiedMatrixButton').unbind('click');
		}

	};


})