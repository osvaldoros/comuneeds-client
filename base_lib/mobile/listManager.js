define([
	'jquery'
	],
	function($){

	return {

		/*
		*
		*
		* populateUL 
		* 
		* Replaces all the items in an unordered list with 'li' items from the 'data' array
		*
		*/
		populateUL:function(list, data, clickHandler){
			if(!list || !data || data.length == undefined){
				return;
			}

			this.unbind(list); // make sure we remove all the previous handlers (if any)
			$(list).empty();

			$.each(data, function(i, item) {
				if(item){
					if(typeof(clickHandler) == "function"){
						var listItem = $('<li data-theme=""><a data-transition="slide"></a></li>').clone();
						$(listItem).find("a").text( item.name);
						if(item.hasOwnProperty("count")){
							$(listItem).find("a").append($('<span class="ui-li-count">'+item.count+'</span>').clone());
						}
					}else{
						var listItem = $("<li data-theme='' data-transition='slide'></li>").clone();
						listItem.text( item.name);
						if(item.hasOwnProperty("count")){
							$(listItem).append($('<span class="ui-li-count">'+item.count+'</span>').clone());
						}						
					}


					if(listItem && typeof(clickHandler) == "function"){
						$(listItem).on('click', function(localItem){
							return function(){
								clickHandler(localItem);
							}
						}(item));
					}

					$(list).append(listItem);
				}

	        });

			$(list).listview('refresh');
		},

		/*
		*
		*
		* populateSelect 
		* 
		* Replaces all the items in a select with 'option' items from the 'data' array
		*
		*/
		populateSelect:function(list, data){
			if(!list || !data || data.length == undefined){
				return;
			}

			$(list).empty();
			$.each(data, function(i, item) {
				if(item){
					var listItem = $('<option value=""></option>').clone();
					listItem.val(item.id);
					listItem.text(item.name);
					$(list).append(listItem);
				}

	        });

		},

		/*
		*
		*
		* unbind 
		* 
		* Iterates over all the items in the list and it calls unbind("click") on each one
		*
		*/
		unbind:function(list){
			var allItems = $(list).find("li");
			for (var i = allItems.length - 1; i >= 0; i--) {
				var item = allItems[i];
				$(item).unbind("click");
			};
			
		}

	};


})