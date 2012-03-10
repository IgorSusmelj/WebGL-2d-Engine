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
var Vwidth;
var Vheight;
var programmObject;
var vertexAttribLoc;
var sprite;
var vVertices;
var vertexPosBufferObject;




function initWebGL(){
	performanceConsole = document.getElementById("performance_analyzer");
	canvas = document.getElementById("GL-Canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	gl.viewportWidth = canvas.width;
	gl.viewportHeight= canvas.height;
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	sprite = new Sprite();
	
	programmObject = simpleSetup(gl, "vertexShader", "fragmentShader", "vPosition", null, null);
	//vertexAttribLoc = gl.getAttribLocation(programmObject, "vPosition");
	//initializes variables for performace_analyzer
	lastTime = $time;
	fps = 60;
	
	render();//main function for drawing
	
}

function render(){
	renderTime = $time();
	window.requestAnimFrame(render, canvas);//call drawback function for smooth animation. (60fps limit << screen refresh rate)
	
	gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	vertexAttribLoc = gl.getAttribLocation(programmObject, "vPosition");
	
	draw(sprite);

	
	analyze_performance();//function for performance information
}








