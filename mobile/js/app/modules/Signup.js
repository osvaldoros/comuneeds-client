define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){

			$("#signupForm").on('submit', function(e){
				return false;
			})

			$("#signupLoginButton").on('click', function(){
				nav.gotoPage("login")
			});		

			$("#createAccountButton").on('click', this.signup.bind(this));			
		},

		signup:function(){

			var form = $("#signupForm");
			var formValues = util.arrayToMap(form.serializeArray());

			if(!formValues.hasOwnProperty("name") || formValues.name == "") {
				alert("Por favor ingresa tu nombre");
				return;
			}
			if(!formValues.hasOwnProperty("project_name") || formValues.project_name == "") {
				alert("Por favor ingresa un nombre para tu primer proyecto");
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
							
			api.post("signup", formValues, null, function(response){
				nav.gotoPage("myProjects");
			});
		},

		deactivate:function(){
			$('#signupForm').unbind('submit');
			$('#signupLoginButton').unbind('click');
			$('#createAccountButton').unbind('click');
		}

	};


})