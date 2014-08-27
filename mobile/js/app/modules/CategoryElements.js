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

			$("#categoryElementsMatrixName").text("Matriz: " + initObject.matrix.name)
			$("#categoryElementsNeedName").text("Necesidad: " + initObject.need.name)			
			$("#categoryElementsCategoryName").text("Categoria: " + initObject.category.name)			

			$("#categoryElementsBackButton").on('click', function(){
				nav.gotoPage("categories", initObject);
			});	

			$("#addElementButton").on('click', function(){
				nav.gotoPage("categoryInput", initObject);
			});	

			var owner = this;
			api.get("need_entry", 
				{
					"team>id":initObject.team.id,
					"matrix>id":initObject.matrix.id,
					"need>id":initObject.need.id,
					"category>id":initObject.category.id
				}, 
				function(response){
					if(response && response.length){
						listManager.populateUL($("#categoryElementList"), response)
					}else{
						listManager.populateUL($("#categoryElementList"), [{name:"No hay elementos en esta categoria todavia"}])
					}
				}
			)	
		},

		matrixClicked:function(matrix){
			nav.gotoPage("needs", {project: this.initObject.project, matrix:matrix, team:this.initObject.team});
		},

		deactivate:function(){
			$('#categoryElementsBackButton').unbind('click');
			$('#addElementButton').unbind('click');
			listManager.unbind($("#categoryElementList"));
		}

	};
})