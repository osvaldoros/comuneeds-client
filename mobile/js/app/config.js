define({
	firstPage:"homePage",

	pages:{
		// main pages
		homePage: {url:"html/HomePage.html", controller:"mobile/js/app/modules/HomePage", label:"Inicio", showOnMenu:true},
		guidePage: {url:"html/GuidePage.html", controller:"mobile/js/app/modules/GuidePage", label:"Guia", showOnMenu:true},
		userPage: {url:"html/UserList.html", controller:"mobile/js/app/modules/UserList", label:"Users", showOnMenu:false},
		signupPage: {url:"html/SignupPage.html", controller:"mobile/js/app/modules/SignupPage", label:"Crear una cuenta", showOnMenu:true},
		loginPage: {url:"html/LoginForm.html", controller:"mobile/js/app/modules/LoginForm", label:"Ya tengo cuenta", showOnMenu:true}
	},

	union:{
		enabled:true,
		host:"174.129.221.136",
		port:"9110"
	}
	
})