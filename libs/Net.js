/**
 * 
 */
var Net_bufferedData = new Array(10);
var Net_socketCount;
var id_counter = 0;

var NetTimer = new Timer();

function OpenTCPStream(url){
	if("WebSocket" in window){
	
	var Net_Socket = new WebSocket('ws://localhost:8080/','echo-protocol');
	
	
	Net_Socket.id = id_counter++;
	
	
	Net_socketCount++;
	Net_Socket.onopen = function(){
		Net_Socket.send('Hello Mr. Server!');
		console.log("hello sent");
		//Net_Socket.send("ping");
		setInterval(function(){
			if(Net_Socket.bufferedAmount==0){
				Net_Socket.send('ping');
				console.log("ping sent");
				NetTimer.start();
			}
		},5000);
	};
	
	Net_Socket.onmessage = function(evt){
		//NetTimer.stop();
		//console.log('Server: '+evt.data);
		//console.log('Time '+NetTimer.microseconds());
		if(evt.data=='ping'){
			NetTimer.stop();
			console.log('Ping Time: '+NetTimer.microseconds());
		}else{
			Net_bufferedData[this.id] += evt.data;
		}
	};
	Net_Socket.onerror = function(error){
		console.log("Error: "+error)
		//alert("error");
	};
	Net_Socket.onclose = function(){
		console.log("closed");
		Net_socketCount--;
	};
	
	return Net_Socket;
	}else{
		alert("Websocket not available");
		return null;
	}
};

function CloseTCPStream(stream){
	stream.close();
};


function WriteString(stream, string){
	stream.send(string);
};

function ReadString(stream){
	var tmp = Net_bufferedData[stream.id];
	Net_bufferedData[stream.id] = '';
	return tmp;
};