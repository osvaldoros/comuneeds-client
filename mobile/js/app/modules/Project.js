define([
	'jquery',
	'api',
	'nav',
	'listManager',
	'util'
	],
	function($, api, nav, listManager, util){
	return {
		matrices:null,
		teams:null,
		initObject:null,

		activate:function(initObject){

			if(!initObject || !initObject.project){
				alert("No se encontro el proyecto");
				nav.gotoPage("myProjects");
				return;
			}

			var currentUser = api.getCurrentUser();
			if(!currentUser){
				alert("Por entra al sistema con tu usuario y contraseña");
				nav.gotoPage("login");
				return;
			}				

			$("#projectBackButton").on('click', function(){
				nav.gotoPage("myProjects", {back:true});
			});				

			this.initObject = initObject;
			var owner = this;

			$("#projectName").text(initObject.project.name);
			$("#projectCreationDate").text(new Date(initObject.project.created));
			if(app.utils.ObjectUtils.isObject(initObject) && app.utils.ObjectUtils.isObject(initObject.project) && app.utils.ObjectUtils.isObject(initObject.project.administrator)){
				$("#projectAdminName").text(initObject.project.administrator.name);

			}else{
				api.get("project", {"id":initObject.project.id}, function(response){
					initObject.project = response;
					$("#projectAdminName").text(initObject.project.administrator.name);
				});
			}

			api.get("matrix", {"project>id":initObject.project.id}, function(response){
				owner.matrices = response;
				api.get("team", {"project>id":initObject.project.id}, function(response){
					owner.teams = response;
					owner.fillList();
				});
			});
		},

		fillList:function(){

			var matricesLength = this.matrices && this.matrices.hasOwnProperty("length") ? this.matrices.length : 0;
			var teamsLength = this.teams && this.teams.hasOwnProperty("length") ? this.teams.length : 0;

			var projectCollections = [
				{name:"Equipos", count:teamsLength, page:"teams"}
			];
			var currentUser = api.getCurrentUser();
			if(this.initObject.project.administrator.id == currentUser.id){
				projectCollections.push({name:"Matrices", count:matricesLength, page:"matrices"})
			}

			listManager.populateUL($("#projectCollectionList"), projectCollections, this.collectionClicked.bind(this));
		},

		collectionClicked:function(collection){
			if(collection){
				nav.gotoPage(collection.page, this.initObject);
			}
		},

		deactivate:function(){
			listManager.unbind($("#projectCollectionList"));
		}

	};


})