define(['jquery'], function($){


		if($("#topic_broadcaster_node").length == 0){
			$("body").append($("<div id='topic_broadcaster_node'/>"));
		}

		return {
			subscribe: function(topic,handle){
			    $("#topic_broadcaster_node").bind(topic,handle);
			},

			publish: function(topic,params){
				$("#topic_broadcaster_node").trigger(topic,params)
			},

			unsubscribe: function(topic,handle){
			    $("#topic_broadcaster_node").unbind(topic,handle);
			}			

		}
})