define(function(){

		// hack in support for bind as soon as this loads
		if (!Function.prototype.bind) { // check if native implementation available
		  Function.prototype.bind = function(){ 
		    var fn = this, args = Array.prototype.slice.call(arguments),
		        object = args.shift(); 
		    return function(){ 
		      return fn.apply(object, 
		        args.concat(Array.prototype.slice.call(arguments))); 
		    }; 
		  };
		}

		return {
			
			/*
			*
			* getParameterByName
			*
			* returns the value of a parameter passed via the query string ( url param )
			*
			*/
			getParameterByName:function(name) {
			    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			        results = regex.exec(location.search);
			    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			},

			isObject:function(obj) {
				return (typeof(obj) == "object" && obj != null);
			},

			arrayToMap:function(array){
				var map = {};
				for (var i = array.length - 1; i >= 0; i--) {
					var item = array[i];
					if(item.hasOwnProperty("name") && item.hasOwnProperty("value")){
						map[item.name] = item.value;
					}
				};
				return map;
			},

			getRandomInRange:function (min, max) {
			    return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			roundTo50:function(num){
				if(num < 50) return 50;

				var mod = num % 50;
				if(mod === 0) return num;

				if(mod > 25){
					num += (50 - mod);
				}else{
					num -= mod;
				}

				return num;

			},

			runPrefixMethod:function(obj, method) {
				var pfx = ["webkit", "moz", "ms", "o", ""];
				var p = 0, m, t;
				while (p < pfx.length && !obj[m]) {
					m = method;
					if (pfx[p] == "") {
						m = m.substr(0,1).toLowerCase() + m.substr(1);
					}
					m = pfx[p] + m;
					t = typeof obj[m];
					if (t != "undefined") {
						pfx = [pfx[p]];
						return (t == "function" ? obj[m]() : obj[m]);
					}
					p++;
				}
			}
		}
})