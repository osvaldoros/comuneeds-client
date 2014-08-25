define({
	firstPage:"home",

	pages:{
		
		//------------------------------------
		// main pages
		//------------------------------------
		home: {
			url:"html/Home.html", 
			controller:"mobile/js/app/modules/Home", 
			label:"Inicio", 
			showOnMenu:true
		},
		guide: {
			url:"html/Guide.html",
			controller:"mobile/js/app/modules/Guide",
			label:"Guia",
			showOnMenu:true
		},
		signup: {
			url:"html/Signup.html",
			controller:"mobile/js/app/modules/Signup",
			label:"Crear una cuenta",
			showOnMenu:true,
			hideAfterAuthentication:true
		},
		myProjects: {
			url:"html/MyProjects.html",
			controller:"mobile/js/app/modules/MyProjects",
			label:"Mis Proyectos",
			showOnMenu:true,
			requiresAuthentication:true
		},
		login: {
			url:"html/Login.html",
			controller:"mobile/js/app/modules/Login",
			label:"Ya tengo cuenta",
			showOnMenu:true,
			hideAfterAuthentication:true
		},

		//------------------------------------
		// support pages
		//------------------------------------
		newProject: {
			url:"html/NewProject.html", 
			controller:"mobile/js/app/modules/NewProject", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		project: {
			url:"html/Project.html", 
			controller:"mobile/js/app/modules/Project", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		teams: {
			url:"html/Teams.html", 
			controller:"mobile/js/app/modules/Teams", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newTeam: {
			url:"html/NewTeam.html", 
			controller:"mobile/js/app/modules/NewTeam", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		matrices: {
			url:"html/Matrices.html", 
			controller:"mobile/js/app/modules/Matrices", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newMatrix: {
			url:"html/NewMatrix.html", 
			controller:"mobile/js/app/modules/NewMatrix", 
			showOnMenu:false,
			requiresAuthentication:true
		},
		newTeamMember: {
			url:"html/NewTeamMember.html", 
			controller:"mobile/js/app/modules/NewTeamMember", 
			showOnMenu:false,
			requiresAuthentication:true
		}

	},

	union:{
		enabled:true,
		host:"174.129.221.136",
		port:"9110"
	}
	
})