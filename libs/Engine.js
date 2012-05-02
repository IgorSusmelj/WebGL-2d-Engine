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
var fps=0.0;
var performanceText;
var activeShader;
var vertexAttribLoc;
var vVertices;
var vertexPosBufferObject;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

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





function InitEngine(req_width,req_height,_EnableFullScreen,_EnableDebug){
	
	if(req_width)
		SCREEN_WIDTH=req_width;
	if(req_height)
		SCREEN_HEIGHT=req_height;
	//if(!_ResolutionIndependent)
		RESOLUTION_INDEPENDENT_SCALING = false;
	//if(!_EnableStretching)
		STRETCHING_ENABLED = false;
	if(!_EnableFullScreen)
		FULLSCREEN_ENABLED = false;
	if(!_EnableDebug)
		DEBUG_ENABLED = false;
	
	SCREEN_RATIO=SCREEN_WIDTH/SCREEN_HEIGHT;
	
	//RESOLUTION_INDEPENDENT_SCALING = _ResolutionIndependent;
	//STRETCHING_ENABLED =_EnableStretching;
	FULLSCREEN_ENABLED=_EnableFullScreen;
	DEBUG_ENABLED = _EnableDebug;
	
	performanceConsole = document.getElementById("performance_analyzer");
	canvas = document.getElementById("GL-Canvas");
	

	gl = WebGLUtils.setupWebGL(canvas);
	
	
	
	//Check for fullscreen support and enable it if _EnableFullScreen is true and Enter key has been clicked
	/*document.addEventListener("keydown", function(e) {
		  if (e.keyCode == 13) {
		    toggleFullScreen();
		  }
		}, false);*/
	
	document.addEventListener("keydown", 
			EngineKeyDown
		, false);
	document.addEventListener("keyup", 
			EngineKeyUp
		, false);
	
	canvas.width=SCREEN_WIDTH;
	canvas.height=SCREEN_HEIGHT;
	
	//gl.viewportWidth = canvas.width;
	//gl.viewportHeight= canvas.height;
	
	gl.clearColor(0.9,0.9,0.9,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


	lastTime = $time;
	fps = 60.0;


	//Init Mouse and MouseEvent listeners
	Mouse = new EngineInitMouse();

	canvas.onmousedown = EngineMouseDown;
	document.onmouseup = EngineMouseUp;
	document.onmousemove=EngineMouseMove;
	
	
	initShaders();
	
	GAME_INIT();
	
	//mat4.perspective(45, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 100.0, pMatrix);
	UpdateViewport();
	

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



function UpdateViewport(){
	mat4.ortho(0, SCREEN_RATIO, 1, 0, 0.0, 100.0, pMatrix);
	gl.viewport(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
	
	mat4.identity(mvMatrix);

	

}

function render(){
	if(DEBUG_ENABLED)
		{
			postTime = $time();
			renderTimer.start();		
		}
	window.requestAnimFrame(render, canvas);//call drawback function for smooth animation. (60fps limit << screen refresh rate)
	
	
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	
	
	mat4.identity(mvMatrix);
	//mat4.rotate(mvMatrix,Math.PI/32,[0,0,1]);
	
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



function setMatrixUniforms() {
    gl.uniformMatrix4fv(activeShader.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(activeShader.mvMatrixUniform, false, mvMatrix);
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}



function initShaders() {
    var fragmentShader = getShader(gl, "fragmentShader");
    var vertexShader = getShader(gl, "vertexShader");

    activeShader = gl.createProgram();
    gl.attachShader(activeShader, vertexShader);
    gl.attachShader(activeShader, fragmentShader);
    gl.linkProgram(activeShader);

    if (!gl.getProgramParameter(activeShader, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(activeShader);

    activeShader.vertexPositionAttribute = gl.getAttribLocation(activeShader, "aVertexPosition");
    gl.enableVertexAttribArray(activeShader.vertexPositionAttribute);

    activeShader.textureCoordAttribute = gl.getAttribLocation(activeShader, "aTextureCoord");
    gl.enableVertexAttribArray(activeShader.textureCoordAttribute);

    activeShader.pMatrixUniform = gl.getUniformLocation(activeShader, "uPMatrix");
    activeShader.mvMatrixUniform = gl.getUniformLocation(activeShader, "uMVMatrix");
    activeShader.samplerUniform = gl.getUniformLocation(activeShader, "uSampler");
}


