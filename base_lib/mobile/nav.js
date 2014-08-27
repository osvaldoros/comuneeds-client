define([
	'jquery',
	'api'
	],
	function($, api){

	return {

		// the controller for the page we're currently on
		currentModule:null,
		currentPageName:null,
		pageHistory:[],


		setConfig:function(config){
			this._config = config;
		},

		/*
		*
		*
		* gotoPage 
		* 
		* loads a page and its controller dynamically, then switches the page to the newly loaded page and activates its controller
		*
		*/
		gotoPage:function(pageName, initObject, recordHistory){
			var page = this._config.pages[pageName];
			var owner = this;
			if(recordHistory == undefined) recordHistory = true;

			if(typeof(page) != "undefined" && page != null){


				if(!this.authCheck(page)){
					if(this._config.pages.hasOwnProperty("login")){
						//page = this._config.pages["login"];
						this.gotoPage("login");
						return;
					}else{
						//page = this._config.pages[this._config.firstPage];
						this.gotoPage(this._config.firstPage);
						return;						
					}
				}

				// load the page html into the DOM
				// TODO: Add check to only load the page once
				$.mobile.loadPage(page.url, true)
				// when it completes do the following...
				.done(function(){
					// add the menu dynamically (work in progress)
					owner.addMenu(pageName);
					// change the page to the one we want
					$.mobile.changePage("#" + pageName);
					// if there is already a currentModule deactivate it ( the controller of the page we are leaving )
					if(owner.currentModule != null && typeof(owner.currentModule.deactivate) == "function"){
						if(recordHistory) owner.pageHistory.push(owner.currentPageName);
						owner.currentModule.deactivate();
					}
					// load the new controller via RequireJS
					require([page.controller], function(module){
						// when we have the new module, activate it
						if(typeof(module.activate) == "function"){
							owner.currentModule = module;
							owner.currentPageName = pageName;
							module.activate(initObject);
						}
					})
				})
			}else{
				console.warn("Page " + pageName + " doesn't exist");
			}
		},

		/*
		*
		*
		* back 
		* 
		* loads the previous page in the stack
		*
		*/
		back:function(initObject){		
			if(this.pageHistory && this.pageHistory.length > 0){
				var lastPage = this.pageHistory.pop();
				this.gotoPage(lastPage, initObject, false);
			}else{
				this.gotoPage(this._config.firstPage, initObject, false);
			}
		},

		/*
		*
		*
		* addMenu (Work in progress)
		*
		* adds a menu button to the header of the page, which opens the navigation menu (panel) populated from the pages array in the config. We add this dynamically so that we don't
		* need to maintain the links on each separate page
		* 
		*/
		addMenu:function(pageName){


			var pageNode = $("#" + pageName)[0];
			var pageHeader = $("div[data-role='header']", pageNode)[0];
			
			var menuButtonsInThisPage = $('a[data-role="button"]', pageHeader);
			if(menuButtonsInThisPage.length == 0){

				$(pageHeader).append('<a data-role="button" href="#' + pageName + '_menu" data-icon="bars" data-iconpos="left" class="ui-btn-left">Menu</a>');
				$(pageNode).append('<div data-role="panel" id="'+ pageName +'_menu" data-position="left" data-display="reveal" data-theme="a"></div>')

				var menuButton = $('a[data-role="button"]', pageNode);
				var menuPanel = $('#' + pageName + '_menu')[0];
				$(menuButton).button();

				$(menuPanel).append('<ul data-role="listview" data-divider-theme="h" data-inset="false">');
				var menuOptionsUL = $('ul', menuPanel )[0];

				var owner = this;
				// add an item for every page in the config
				for(var p in this._config.pages){
					//if(p != pageName){ // don't add a link to the page we're currently on
						var page = this._config.pages[p];

						if(page.showOnMenu == true && this.authCheck(page)){

							var liOption = $.parseHTML('<li data-theme="a"></li>');
							var aOption = $.parseHTML('<a data-transition="slide">' + page.label + '</a>');
							$(aOption).on("click", function(localPageName){
									return function(){
										owner.gotoPage(localPageName);
									}
								}(p)
							)

							$(liOption).append(aOption);
							$(menuOptionsUL).append(liOption);
						}

					//}
				}
				
				$(menuOptionsUL).listview();
				$(menuPanel).panel();
				$(menuPanel).trigger("updatelayout");
			}
		},

		authCheck:function(page){
			if(!page) return false;
			var currentUser = api.getCurrentUser();
			if(page.requiresAuthentication){
				if(currentUser){
					return true;
				}else{
					return false;
				}
			}else{
				if(page.hideAfterAuthentication){
					if(currentUser){
						return false;
					}else{
						return true;
					}
				}else{
					return true;
				}
			}
		}

	};


})