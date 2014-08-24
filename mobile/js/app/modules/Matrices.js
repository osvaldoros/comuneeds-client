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
				alert("No se encontro la lista de equipos");
				nav.gotoPage("myProjects");
				return;
			}

			$("#matricesBackButton").on('click', function(){
				nav.back(initObject);
			});		

			this.initObject = initObject;
			$("#newMatrixButton").on('click', function(){
				nav.gotoPage("newMatrix", initObject);
			});			

			var owner = this;
			api.get("matrix", {"project>id":initObject.project.id}, function(response){
				if(response && response.length){
					listManager.populate($("#matrixList"), response, owner.matrixClicked.bind(this))
				}else{
					listManager.populate($("#matrixList"), [{name:"No hay matrices en este proyecto todavia"}])
				}
			})	

		},

		matrixClicked:function(matrix){

		},

		deactivate:function(){
			$('#matricesBackButton').unbind('click');
		}

	};


})