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

			$("#categoriesMatrixName").text("Matriz: " + initObject.matrix.name)
			$("#categoriesNeedName").text("Necesidad: " + initObject.need.name)

			$("#categoriesBackButton").on('click', function(){
				nav.gotoPage("needs", initObject);
			});	

			var owner = this;
			$("#BEING").on('click', function(){
				owner.chooseCategory(owner, this);
			});	
			$("#HAVING").on('click', function(){
				owner.chooseCategory(owner, this);
			});	
			$("#DOING").on('click', function(){
				owner.chooseCategory(owner, this);
			});	
			$("#INTERACTING").on('click', function(){
				owner.chooseCategory(owner, this);
			});			

		},

		chooseCategory:function(self, element){
			if(app.utils.ObjectUtils.isObject(element) && element.hasOwnProperty("id")){
				var initObj = {
					project: self.initObject.project,
					matrix: self.initObject.matrix,
					team: self.initObject.team,
					need: self.initObject.need,
					category:{id:element.id, name:$(element).text().trim()}
				}
				nav.gotoPage("categoryElements", initObj);
			}else{
				alert("Error: No es posible seleccionar la necesidad");
			}
		},

		deactivate:function(){
			$('#categoriesBackButton').unbind('click');
			
			$("#BEING").unbind('click');
			$("#HAVING").unbind('click');
			$("#DOING").unbind('click');
			$("#INTERACTING").unbind('click');
		}

	};


})