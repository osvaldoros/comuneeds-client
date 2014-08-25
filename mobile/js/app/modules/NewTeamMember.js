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

			$("#newTeamMemberForm").on('submit', function(e){
				return false;
			})				

			$("#newTeamMemberBackButton").on('click', function(){
				nav.gotoPage("team", initObject);
			});	

			this.initObject = initObject;	

			$("#teamMemberMenu").on('change', this.teamMemberSelected.bind(this));	
			$("#createTeamMemberButton").on('click', this.postTeamMember.bind(this));

			api.get("user", null /*TODO: Limit the user query somehow i.e. geographically?*/, function(response){
				if(response && response.hasOwnProperty("length")){
					response.unshift({id:"NEW", name:"Crear Nuevo"});
				}
				listManager.populateSelect($("#teamMemberMenu"), response)
			})
		},

		teamMemberSelected:function(){
			var teamMemberId = $("#teamMemberMenu").val();
			if(teamMemberId == "NEW"){
				this.teamMemberId = null;
				this.adjustFormVisible(true);
			}else{
				this.teamMemberId = teamMemberId;
				this.adjustFormVisible(false);
			}
		},

		postTeamMember:function(){

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

			var form = $("#newTeamMemberForm");
			var formValues;

			if(this.teamMemberId){
				formValues = {"user": {"ref":"user", "id": this.teamMemberId} }
			}else{
				formValues = util.arrayToMap(form.serializeArray());
				if(!formValues.hasOwnProperty("name") || formValues.name == "") {
					alert("Por favor ingresa el nombre del miembro");
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

			formValues.team = {"ref":"team", "id":this.initObject.team.id};
			var owner = this;
			api.post("add_team_member", formValues, null, function(response){
				nav.gotoPage("team", owner.initObject);
			});
		},		

		adjustFormVisible:function(showNewTeamMember){
			if(showNewTeamMember){
				$("#teamMemberNameFieldContainer").show();
				$("#teamMemberUsernameFieldContainer").show();
				$("#teamMemberPasswordFieldContainer").show();
				$("#teamMemberConfirmPasswordFieldContainer").show();
			}else{
				$("#teamMemberNameFieldContainer").hide();
				$("#teamMemberUsernameFieldContainer").hide();
				$("#teamMemberPasswordFieldContainer").hide();
				$("#teamMemberConfirmPasswordFieldContainer").hide();
			}
		},		

		deactivate:function(){
			$('#newTeamMemberBackButton').unbind('click');
		}

	};


})