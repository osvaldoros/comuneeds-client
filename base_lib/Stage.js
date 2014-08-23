define([
	'jquery',
	'api',
	'util',
	'tweenjs'
	],
	function($, api, util, tweenjs){

            var allowInstantiation = false;
            var singleInstance = null;


            function Stage(){
                  if(!allowInstantiation == true){
                        console.error("Cannot instantiate directly, please use getInstance static method");
                        return;
                  }
            };

            // I am a static method
            Stage.getInstance = function(){
                  
                  if(singleInstance != null){
                        return singleInstance;
                  }

                  allowInstantiation = true;
                  singleInstance = new Stage();
                  allowInstantiation = false;

                  return singleInstance;
            };

	     // Define the instance members.
            Stage.prototype = {
                  _canvas:null,
      		setCanvas:function(canvas){
                        this._canvas = canvas;
                        this._stage = new createjs.Stage(canvas);
                        this._stage.autoClear = true;
                        createjs.Ticker.addEventListener("tick", this._stage);
                  },

                  getStage:function(){
                        return this._stage;
                  },

                  getCanvas:function(){
                        return this._canvas;
                  },

                  fitScreen:function(){
                        // remove the canvas so it doesn't affect calculations
                        this._canvas.style.display = 'none';

                        var w = $("body").width();
                        var h = $("body").height();

                        // add the canvas again
                        this._canvas.style.display = '';

                        $(this._canvas).css("width", w + "px");
                        $(this._canvas).css("height", h + "px"); 
                  }

            };

            // Return the constructor.
            return( Stage );


	}
)