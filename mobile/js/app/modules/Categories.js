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

			$("#categoriesMatrixName").text(initObject.matrix.name)
			$("#categoriesNeedName").text(initObject.need.name)

			$("#matrixBackButton").on('click', function(){
				nav.back();
			});	

			$("#BEING").on('click', this.chooseCategory.bind(this))
			$("#HAVING").on('click', this.chooseCategory.bind(this))
			$("#DOING").on('click', this.chooseCategory.bind(this))
			$("#INTERACTING").on('click', this.chooseCategory.bind(this))

		},

		chooseCategory:function(){

		},

		deactivate:function(){
			$('#matrixBackButton').unbind('click');
			
			$("#BEING").unbind('click');
			$("#HAVING").unbind('click');
			$("#DOING").unbind('click');
			$("#INTERACTING").unbind('click');
		}

	};


})