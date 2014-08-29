// starting the path with / and adding the .js extension bypasses the baseUrl system and loads the file directly from where instructed
var controllerPath = "/mobile/js/app/modules/";

define({
	firstPage:"home",

	pages:{
		
		//------------------------------------
		// main pages
		//------------------------------------
		home: {
			url:"html/Home.html", 
			controller:controllerPath + "Home.js", 
			label:"Inicio", 
			showOnMenu:true
		},
		guide: {
			url:"html/Guide.html",
			controller:controllerPath + "Guide.js",
			label:"Guia",
			showOnMenu:true
		},
		signup: {
			url:"html/Signup.html",
			controller:controllerPath + "Signup.js",
			label:"Crear una cuenta",
			showOnMenu:true,
			hideAfterAuthentication:true
		},
		myProjects: {
			url:"html/MyProjects.html",
			controller:controllerPath + "MyProjects.js",
			label:"Mis Proyectos",
			showOnMenu:true,
			requiresAuthentication:true
		},
		login: {
			url:"html/Login.html",
			controller:controllerPath + "Login.js",
			label:"Ya tengo cuenta",
			showOnMenu:true,
			hideAfterAuthentication:true
		},

		//------------------------------------
		// support pages
		//------------------------------------
		newProject: {
			url:"html/NewProject.html", 
			controller:controllerPath + "NewProject.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		project: {
			url:"html/Project.html", 
			controller:controllerPath + "Project.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		teams: {
			url:"html/Teams.html", 
			controller:controllerPath + "Teams.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newTeam: {
			url:"html/NewTeam.html", 
			controller:controllerPath + "NewTeam.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		matrices: {
			url:"html/Matrices.html", 
			controller:controllerPath + "Matrices.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		matrix: {
			url:"html/Matrix.html", 
			controller:controllerPath + "Matrix.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newMatrix: {
			url:"html/NewMatrix.html", 
			controller:controllerPath + "NewMatrix.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		team: {
			url:"html/Team.html", 
			controller:controllerPath + "Team.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		needs: {
			url:"html/Needs.html", 
			controller:controllerPath + "Needs.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		categories: {
			url:"html/Categories.html", 
			controller:controllerPath + "Categories.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		categoryElements: {
			url:"html/CategoryElements.html", 
			controller:controllerPath + "CategoryElements.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		categoryInput: {
			url:"html/CategoryInput.html", 
			controller:controllerPath + "CategoryInput.js", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newTeamMember: {
			url:"html/NewTeamMember.html", 
			controller:controllerPath + "NewTeamMember.js", 
			showOnMenu:false,
			requiresAuthentication:true
		}

	},

	union:{
		enabled:false,
		host:"174.129.221.136",
		port:"9110"
	}
	
})