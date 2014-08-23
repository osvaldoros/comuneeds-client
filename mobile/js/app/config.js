define({
	firstPage:"loginPage",

	pages:{
		// main pages
		userPage: {url:"html/UserList.html", controller:"mobile/js/app/modules/UserList", label:"Users", showOnMenu:true},
		loginPage: {url:"html/LoginForm.html", controller:"mobile/js/app/modules/LoginForm", label:"Login", showOnMenu:true}
	},

	union:{
		enabled:true,
		host:"174.129.221.136",
		port:"9110"
	}
	
})