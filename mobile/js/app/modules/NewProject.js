define([
	'jquery',
	'api',
	'nav',
	'util'
	],
	function($, api, nav, util){
	return {

		activate:function(){

			$("#newProjectForm").on('submit', function(e){
				return false;
			})

			$("#newProjectBackButton").on('click', function(){
				nav.back();
			});	

			$("#createProjectButton").on('click', this.postProject.bind(this));				
		},

		postProject:function(){

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}	

			var form = $("#newProjectForm");
			var formValues = util.arrayToMap(form.serializeArray());

			if(!formValues.hasOwnProperty("name") || formValues.name == "") {
				alert("Por favor ingresa un nombre para el proyecto");
				return;
			}

			formValues.administrator = {"ref":"user", "id":currentUser.id};
							
			api.post("project", formValues, null, function(response){
				nav.gotoPage("myProjects");
			});
		},

		deactivate:function(){
			$('#newProjectForm').unbind('submit');
			$('#newProjectBackButton').unbind('click');
			$('#createProjectButton').unbind('click');			
		}

	};


})