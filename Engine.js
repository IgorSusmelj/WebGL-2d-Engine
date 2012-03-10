/**
 * Engine Made By Igor Susmelj
 */

/**
 * Variable declarations
 */

var gl; //
var canvas;
var renderTime;
var debugConsole, performanceConsole;
var postTime;
var lastTime;
var fps;
var performanceText;



function initWebGL(){
	performanceConsole = document.getElementById("performance_analyzer");
	canvas = document.getElementById("GL-Canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	gl.viewportWidth = canvas.width;
	gl.viewportHeight= canvas.height;
	
	//initializes variables for performace_analyzer
	lastTime = $time;
	fps = 60;
	
	render();//main function for drawing
	
}

function render(){
	renderTime = $time();
	window.requestAnimFrame(render, canvas);//call drawback function for smooth animation. (60fps limit << screen refresh rate)
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	analyze_performance();//function for performance information
}