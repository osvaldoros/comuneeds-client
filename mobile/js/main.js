// configure requireJs
requirejs.config({
	baseUrl: "../",
    paths: {
        jquery: 'third_party_lib/js/jquery-1.9.1.min',
        jquerymobile: 'third_party_lib/js/jquery.mobile-1.3.1',
        codiqa: 'third_party_lib/js/codiqa.ext',
        orbiter: 'third_party_lib/js/Orbiter_2.0.1.817_Release_min',

        api:"base_lib/api",
        listManager:"base_lib/mobile/listManager",
        util:"base_lib/util",
        topic:"base_lib/topic",
        ObiterManager:"base_lib/ObiterManager",        
        nav:"base_lib/mobile/nav"        
    }
});

//load dependencies and execute main 

requirejs([
	'jquery',
	'orbiter',

	'mobile/js/app/config', 
	'api', 
	'util',
	'nav',
	'ObiterManager'

],

function ($, orbiter, config, api, util, nav, ObiterManager) {

	//===================================================
	//          JQuery event handlers
	//===================================================
	/*
	*
	* pagebeforeshow
	*
	* This handler is executed for every page (question) right before it is displayed. It gives us a chance to do some setup.
	*
	* For every question we clean it first and then if there is an existing answer we load it so the user has a chance to change it
	*
	*/
	$(document).on('pagebeforeshow', function(event){
		//console.log(event);
	});

	/*
	*
	* pageinit
	*
	* This handler is the mobile equivalent of document ready. it happens when the "page" is initialized. When the first page is ready we can proceed to hook up
	* all the events we want, so we only need to do this once, this event would happen for every page, so after we've listened to this once we unbind...
	*
	*/
	$(document).on('pageinit', function(){
		// don't listen to any more pageInits
		$(document).unbind('pageinit');

		nav.setConfig(config);

		var orbManager = ObiterManager.getInstance();


		// if a hash is passes when loading try to load that as a page, otherwise use the 'firstPage' in the config
		var firstPage = config.firstPage;
		if(window.location.hash != ""){
			firstPage = window.location.hash.split("#")[1];
		}

		orbManager.connect(config, function(){
			nav.gotoPage(firstPage);
		})


	});

	// now that we have JQuery and we bound the method handlers, require the codiqa features and jquerymobile
	requirejs(['jquerymobile'], function(jquerymobile){
		requirejs(['codiqa']);
	});


});
