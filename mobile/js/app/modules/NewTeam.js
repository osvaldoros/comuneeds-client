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
				alert("No se encontro el proyecto");
				nav.gotoPage("myProjects");
				return;
			}

			$("#newTeamForm").on('submit', function(e){
				return false;
			})			

			$("#newTeamBackButton").on('click', function(){
				nav.gotoPage("teams", initObject);
			});	

			this.initObject = initObject;				
			
			$("#coordinatorMenu").on('change', this.coordinatorSelected.bind(this));
			$("#createTeamButton").on('click', this.postTeam.bind(this));

			api.get("user", null /*TODO: Limit the user query somehow i.e. geographically?*/, function(response){
				if(response && response.hasOwnProperty("length")){
					response.unshift({id:"NEW", name:"Crear Nuevo"});
				}
				listManager.populateSelect($("#coordinatorMenu"), response)
			})

		},

		coordinatorSelected:function(){
			var coordinatorId = $("#coordinatorMenu").val();
			if(coordinatorId == "NEW"){
				this.coordinatorId = null;
				this.adjustFormVisible(true);
			}else{
				this.coordinatorId = coordinatorId;
				this.adjustFormVisible(false);
			}
		},

		adjustFormVisible:function(showNewCoordinatorElements){
			if(showNewCoordinatorElements){
				$("#teamFieldContainer").show();
				$("#usernameFieldContainer").show();
				$("#passwordFieldContainer").show();
				$("#confirmPasswordFieldContainer").show();
			}else{
				$("#teamFieldContainer").hide();
				$("#usernameFieldContainer").hide();
				$("#passwordFieldContainer").hide();
				$("#confirmPasswordFieldContainer").hide();
			}
		},

		postTeam:function(){

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}	

			if(!this.initObject || !this.initObject.project){
				alert("No se encontro el proyecto para agregar esta equipo");
				nav.gotoPage("myProjects");
				return;
			}			

			var form = $("#newTeamForm");
			var formValues;

			if(this.coordinatorId){
				formValues = {"coordinator": {"ref":"user", "id": this.coordinatorId} }
			}else{
				formValues = util.arrayToMap(form.serializeArray());
				if(!formValues.hasOwnProperty("name") || formValues.name == "") {
					alert("Por favor ingresa el nombre del coordinador");
					return;
				}
				if(!formValues.hasOwnProperty("username") || formValues.username == "") {
					alert("Por favor ingresa un nombre de usuario");
					return;
				}
				if(!formValues.hasOwnProperty("password") || formValues.password == "") {
					alert("Por favor ingresa una contraseña");
					return;
				}	
				if(!formValues.hasOwnProperty("confirm_password") || formValues.confirm_password == "") {
					alert("Por favor confirma la contraseña");
					return;
				}
				if(formValues.password != formValues.confirm_password) {
					alert("La contraseña y la confirmación no son iguales");
					return;
				}		
			}

			formValues.project = {"ref":"project", "id":this.initObject.project.id};
			var owner = this;
			api.post("createTeam", formValues, null, function(response){
				nav.gotoPage("teams", owner.initObject);
			});
		},

		deactivate:function(){
			$('#newTeamBackButton').unbind('click');
			$('#createTeamButton').unbind('click');
		}

	};


})