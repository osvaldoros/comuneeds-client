define([
	"jquery",
	"orbiter",
	"topic"
	],
	function($, orbiter, topic){


		var allowInstantiation = false;
		var singleInstance = null;

		// constructor
		function ObiterManager(){
			if(!allowInstantiation == true){
				console.error("Cannot instantiate directly, please use getInstance static method");
				return;
			}

			this.orbiter = new net.user1.orbiter.Orbiter();

   			this.orbiter.getLog().setLevel(net.user1.logger.Logger.ERROR);
   			//this.orbiter.getLog().setLevel(net.user1.logger.Logger.DEBUG);

   			this.orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, this.orbiterReady, this);
			this.orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, this.orbiterDisconnected, this);
		}


		// I am a static method
		ObiterManager.getInstance = function(){
			
			if(singleInstance != null){
				return singleInstance;
			}

			allowInstantiation = true;
			singleInstance = new ObiterManager();
			allowInstantiation = false;

			return singleInstance;
		};


		// Define the instance members.
		ObiterManager.prototype = {

			orbiter:null,
			_connected:false,
			_readyCallBack:null,
			systemRoomName:"systemRoom",
			systemRoom:null,

			_config:null,

			connect:function(config, readyCallBack){
				this._config = config;
				this._readyCallBack = readyCallBack;
				if(this._config.union.enabled == true && this.orbiter.getSystem().isJavaScriptCompatible()){
					this.orbiter.connect(this._config.union.host, this._config.union.port);
				}else{
					if(typeof(this._readyCallBack) == "function"){
						this._readyCallBack();
					}
				}
			},
			
			disconnect:function(){
				//this.systemRoom.removeEventListener(net.user1.orbiter.RoomEvent.JOIN, this.joinRoomListener, this);
				//this.systemRoom.removeEventListener(net.user1.orbiter.RoomEvent.ADD_OCCUPANT, this.addOccupantListener, this);
				//this.systemRoom.removeEventListener(net.user1.orbiter.RoomEvent.REMOVE_OCCUPANT, this.removeOccupantListener, this);
				//this.systemRoom.removeEventListener(net.user1.orbiter.RoomEvent.UPDATE_CLIENT_ATTRIBUTE, this.clientAttributeUpdateListener, this);

				this.systemRoom.removeEventListener("MESSAGE", this.messageListener, this);
				this.systemRoom.removeEventListener("NOTIFICATION", this.notificationListener, this);

				this.orbiter.disconnect();
			},

			sendMessage:function(msg){
				if(this._connected){
					this.systemRoom.sendMessage("MESSAGE",	true, null, msg);
				}
			},

			orbiterReady:function(event){
				this._connected = true;
				this._selfClient = this.orbiter.self();

				if(typeof(this._readyCallBack) == "function"){
					this._readyCallBack();
				}


				this.systemRoom = this.orbiter.getRoomManager().createRoom(this.systemRoomName);


				//this.systemRoom.addEventListener(net.user1.orbiter.RoomEvent.JOIN, this.joinRoomListener, this);
				//this.systemRoom.addEventListener(net.user1.orbiter.RoomEvent.ADD_OCCUPANT, this.addOccupantListener, this);
				//this.systemRoom.addEventListener(net.user1.orbiter.RoomEvent.REMOVE_OCCUPANT, this.removeOccupantListener, this);
				//this.systemRoom.addEventListener(net.user1.orbiter.RoomEvent.UPDATE_CLIENT_ATTRIBUTE, this.clientAttributeUpdateListener, this);
				
				this.systemRoom.addMessageListener("MESSAGE", this.messageListener, this);
				this.systemRoom.addMessageListener("NOTIFICATION", this.notificationListener, this);

				this.systemRoom.join();

			},

			notificationListener:function(fromClient, message){
				console.log("notification received >");
				var data = undefined
				try{
					data = json.fromJson(message);
				}catch(err){
					console.log("Couldn't parse json in notification, err = [" + err + "] assuming simple string");
				}
				console.log(message)			

				if(typeof(data) == "object" && data != null){
					topic.publish("push-" + data.ref, data);
				}else{
					topic.publish("push-NOTIFICATION", message);
				}
			},

			messageListener:function(fromClient, message){
				console.log("message received >");
				var data = undefined
				try{
					data = JSON.parse(message);
				}catch(err){
					console.log("Couldn't parse json in notification, err = [" + err + "] assuming simple string");
				}
				console.log(message)			

				if(typeof(data) == "object" && data != null){
					if(typeof(data.ref) == "string"){
						topic.publish("push-" + data.ref.toUpperCase(), data);
					}else{
						topic.publish("push-MESSAGE", data);
					}

				}else{
					topic.publish("push-MESSAGE", message);
				}

			},


			orbiterDisconnected:function(event){
				this._connected = false;
				this._selfClient = null;
				console.log("Orbiter disconnected!")
			}


		};

		// Return the base Model constructor.
		return( ObiterManager );


	}
);