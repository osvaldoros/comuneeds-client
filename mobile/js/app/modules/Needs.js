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

			$("#needsMatrixName").text(initObject.matrix.name)

			$("#matrixBackButton").on('click', function(){
				nav.gotoPage("team", initObject);
			});	

			$("#SUBSISTENCE").on('click', this.chooseNeed.bind(this))
			$("#PROTECTION").on('click', this.chooseNeed.bind(this))
			$("#AFFECTION").on('click', this.chooseNeed.bind(this))
			$("#UNDERSTANDING").on('click', this.chooseNeed.bind(this))
			$("#PARTICIPATION").on('click', this.chooseNeed.bind(this))
			$("#LEISURE").on('click', this.chooseNeed.bind(this))
			$("#CREATION").on('click', this.chooseNeed.bind(this))
			$("#IDENTITY").on('click', this.chooseNeed.bind(this))
			$("#LIBERTY").on('click', this.chooseNeed.bind(this))

		},

		chooseNeed:function(){
			nav.gotoPage("categories", this.initObject);
		},

		deactivate:function(){
			$('#matrixBackButton').unbind('click');

			$("#SUBSISTENCE").unbind('click');
			$("#PROTECTION").unbind('click');
			$("#AFFECTION").unbind('click');
			$("#UNDERSTANDING").unbind('click');
			$("#PARTICIPATION").unbind('click');
			$("#LEISURE").unbind('click');
			$("#CREATION").unbind('click');
			$("#IDENTITY").unbind('click');
			$("#LIBERTY").unbind('click');
		}

	};


})