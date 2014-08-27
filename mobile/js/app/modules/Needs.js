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

			$("#needsMatrixName").text("Matriz: " + initObject.matrix.name);

			var owner = this;
			$("#needsBackButton").on('click', function(){
				nav.gotoPage("team", initObject);
			});	

			$("#SUBSISTENCE").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#PROTECTION").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#AFFECTION").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#UNDERSTANDING").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#PARTICIPATION").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#LEISURE").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#CREATION").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#IDENTITY").on('click', function(){
				owner.chooseNeed(owner, this);
			});

			$("#LIBERTY").on('click', function(){
				owner.chooseNeed(owner, this);
			});


		},



		chooseNeed:function(self, element){
			if(app.utils.ObjectUtils.isObject(element) && element.hasOwnProperty("id")){
				var initObj = {
					project: self.initObject.project,
					matrix: self.initObject.matrix,
					team: self.initObject.team,
					need:{id:element.id, name:$(element).text().trim()}
				}
				nav.gotoPage("categories", initObj);
			}else{
				alert("Error: No es posible seleccionar la necesidad");
			}
		},

		deactivate:function(){
			$('#needsBackButton').unbind('click');

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