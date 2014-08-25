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
				alert("No se encontro la lista de matrices");
				nav.gotoPage("myProjects");
				return;
			}

			$("#matricesBackButton").on('click', function(){
				nav.gotoPage("myProjects", initObject);
			});		

			this.initObject = initObject;
			$("#newMatrixButton").on('click', function(){
				nav.gotoPage("newMatrix", initObject);
			});			

			var owner = this;
			api.get("matrix", {"project>id":initObject.project.id}, function(response){
				if(response && response.length){
					listManager.populateUL($("#matrixList"), response, owner.matrixClicked.bind(owner))
				}else{
					listManager.populateUL($("#matrixList"), [{name:"No hay matrices en este proyecto todavia"}])
				}
			})	

		},

		matrixClicked:function(matrix){
			nav.gotoPage("matrix", {project: this.initObject.project, matrix:matrix});
		},

		deactivate:function(){
			$('#matricesBackButton').unbind('click');
			listManager.unbind($("#matrixList"));
		}

	};


})