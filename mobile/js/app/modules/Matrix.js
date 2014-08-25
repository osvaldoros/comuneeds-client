define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(initObject){



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
			
			$("#matrixBackButton").on('click', function(){
				nav.gotoPage("matrices", initObject);
			});	
			
			$("#downloadFullMatrixButton").on('click', function(){
				alert("Coming Soon");
			});	

			$("#unifyMatrixButton").on('click', function(){
				alert("Coming Soon");
			});
			
			$("#openUnifiedMatrixButton").on('click', function(){
				alert("Coming Soon");
			});				
		},

		deactivate:function(){
			$('#matrixBackButton').unbind('click');
			$('#downloadFullMatrixButton').unbind('click');
			$('#unifyMatrixButton').unbind('click');
			$('#openUnifiedMatrixButton').unbind('click');
		}

	};


})