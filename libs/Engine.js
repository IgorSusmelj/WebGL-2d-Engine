/**
 * Engine Made By Igor Susmelj
 */

/**
 * Variable declarations
 */

var gl; //
var canvas;

var debugConsole, performanceConsole;
var postTime;
var lastTime;
var fps =0.0;
var performanceText;


var renderTimer = new Timer();


var FULLSCREEN_TIMER;

var RESOLUTION_INDEPENDENT_SCALING=false;
var STRETCHING_ENABLED=false;
var FULLSCREEN_ENABLED=false;
var DEBUG_ENABLED=false;

//Screen dimension variables
var SCREEN_WIDTH=640;
var SCREEN_HEIGHT=480;
var SCREEN_RATIO=0.0;





function InitEngine(_ResolutionIndependent,_EnableStretching,_EnableFullScreen,_EnableDebug){
	
	
	if(!_ResolutionIndependent)
		RESOLUTION_INDEPENDENT_SCALING = false;
	if(!_EnableStretching)
		STRETCHING_ENABLED = false;
	if(!_EnableDebug)
		DEBUG_ENABLED = false;
	
	
	
	DEBUG_ENABLED = _EnableDebug;
	RESOLUTION_INDEPENDENT_SCALING = _ResolutionIndependent;
	STRETCHING_ENABLED =_EnableStretching;
	FULLSCREEN_ENABLED=_EnableFullScreen;
	
	performanceConsole = document.getElementById("performance_analyzer");
	canvas = document.getElementById("GL-Canvas");
	

	gl = canvas.getContext("2d");
	
	
	
	//Check for fullscreen support and enable it if _EnableFullScreen is true and Enter key has been clicked
	document.addEventListener("keydown", function(e) {
		  if (e.keyCode == 13) {
		    toggleFullScreen();
		  }
		}, false);
	
	document.addEventListener("keydown", 
			EngineKeyDown
		, false);
	document.addEventListener("keyup", 
			EngineKeyUp
		, false);
	
	
	SCREEN_RATIO=SCREEN_WIDTH/SCREEN_HEIGHT;
	
	SCREEN_WIDTH = canvas.width;
	SCREEN_HEIGHT= canvas.height;

	lastTime = $time;
	fps = 60.0;


	//Init Mouse and MouseEvent listeners
	Mouse = new EngineInitMouse();
	
	
	canvas.onmousedown = EngineMouseDown;
	document.onmouseup = EngineMouseUp;
	document.onmousemove=EngineMouseMove;
	
	
	
	GAME_INIT();
	
	

	render();//main function for drawing
	shutdown();
}


/*
function on_fullscreen_change() {
    if(document.mozFullScreen || document.webkitIsFullScreen) {

    }
    else {
    }
}

document.addEventListener('mozfullscreenchange', on_fullscreen_change);
document.addEventListener('webkitfullscreenchange', on_fullscreen_change);
*/


function toggleFullScreen() {


	if(FULLSCREEN_ENABLED){

		if(!document.mozFullScreen && !document.webkitIsFullScreen){
			if(canvas.requestFullScreen){
				canvas.requestFullScreen();
			}else if(canvas.mozRequestFullScreen){
				canvas.mozRequestFullScreen();
			}else if(canvas.webkitRequestFullScreen){
				canvas.webkitRequestFullScreen();
			}			
		}else{
			if(canvas.cancelFullScreen){
				canvas.cancelFullScreen();
			}else if(canvas.mozCancelFullScreen){
				canvas.mozCancelFullScreen();
			}else if(canvas.webkitCancelFullScreen){
				canvas.webkitCancelFullScreen();
			}			
		}


	}

}


function render(){
	if(DEBUG_ENABLED)
		{
			postTime = $time();
			renderTimer.start();		
		}
	window.requestAnimFrame(render, canvas);//call drawback function for smooth animation. (60fps limit << screen refresh rate)
	gl.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	
	GAME_RENDER();
	

	
	

	if(DEBUG_ENABLED)
	{
		analyze_performance();//function for performance information	
	}

}

function shutdown(){
	GAME_END();
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////