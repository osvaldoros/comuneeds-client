define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		initObject:null,

		activate:function(initObject){
			if(!initObject || !initObject.project){
				alert("No se encontro el proyecto");
				nav.gotoPage("myProjects");
				return;
			}

			$("#newMatrixForm").on('submit', function(e){
				return false;
			})			

			$("#newMatrixBackButton").on('click', function(){
				nav.gotoPage("matrices", initObject);
			});	

			this.initObject = initObject;				
			
			$("#createMatrixButton").on('click', this.postMatrix.bind(this));				
		},

		postMatrix:function(){

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}	

			if(!this.initObject || !this.initObject.project){
				alert("No se encontro el proyecto para agregar esta matriz");
				nav.gotoPage("myProjects");
				return;
			}			

			var form = $("#newMatrixForm");
			var formValues = util.arrayToMap(form.serializeArray());

			if(!formValues.hasOwnProperty("name") || formValues.name == "") {
				alert("Por favor ingresa un nombre para la matriz");
				return;
			}

			formValues.project = {"ref":"project", "id":this.initObject.project.id};
			var owner = this;
			api.post("matrix", formValues, null, function(response){
				nav.gotoPage("matrices", owner.initObject);
			});
		},

		deactivate:function(){
			$('#newMatrixBackButton').unbind('click');
			$('#createMatrixButton').unbind('click');
		}

	};


})