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

			$("#addCategoryElementForm").on('submit', function(e){
				return false;
			})

			$("#categoryInputBackButton").on('click', function(){
				nav.gotoPage("categoryElements", initObject);
			});	

			$("#categoryInputMatrixName").text("Matriz: " + initObject.matrix.name)
			$("#categoryInputNeedName").text("Necesidad: " + initObject.need.name)			
			$("#categoryInputCategoryName").text("Categoria: " + initObject.category.name)				

			$("#addElementSubmitButton").on('click', this.postCategoryElement.bind(this));				
		},

		postCategoryElement:function(){

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}	

			var form = $("#addCategoryElementForm");
			var formValues = util.arrayToMap(form.serializeArray());

			if(!formValues.hasOwnProperty("name") || formValues.name == "") {
				alert("Por favor ingresa un valor en el campo");
				return;
			}

			formValues.project = {"ref":"project", "id":this.initObject.project.id};
			formValues.team = {"ref":"team", "id":this.initObject.team.id};
			formValues.matrix = {"ref":"matrix", "id":this.initObject.matrix.id};
			formValues.need = {"ref":"need", "id":this.initObject.need.id};
			formValues.category = {"ref":"category", "id":this.initObject.category.id};
			formValues.created_by = {"ref":"user", "id":currentUser.id};
			var owner = this;
			api.post("need_entry", formValues, null, function(response){
				nav.gotoPage("categoryElements", owner.initObject);
			});
		},

		deactivate:function(){
			$('#addCategoryElementForm').unbind('submit');
			$('#categoryInputBackButton').unbind('click');
			$('#addElementSubmitButton').unbind('click');			
		}

	};


})