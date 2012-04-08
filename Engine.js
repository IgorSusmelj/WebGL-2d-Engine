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
var fps;
var performanceText;
var Vwidth;
var Vheight;
var activeShader;
var vertexAttribLoc;
var vVertices;
var vertexPosBufferObject;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var renderTimer = new Timer();
var texture_test;

var Mouse;
var DEBUG_ENABLED;
var RESOLUTION_INDEPENDENT_RENDERING;


var pixels;


function InitEngine(_ResolutionIndependent,_debug){
	
	DEBUG_ENABLED = _debug;
	RESOLUTION_INDEPENDENT_RENDERING = _ResolutionIndependent;
	
	performanceConsole = document.getElementById("performance_analyzer");
	canvas = document.getElementById("GL-Canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	Vwidth = canvas.width;
	Vheight= canvas.height;
	
	gl.viewportWidth = canvas.width;
	gl.viewportHeight= canvas.height;
	
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	//gl.depthFunc(gl.LEQUAL);

	lastTime = $time;
	fps = 60;

	//Init Mouse and MouseEvent listeners
	Mouse = new EngineInitMouse();
	
	
	canvas.onmousedown = EngineMouseDown;
	document.onmouseup = EngineMouseUp;
	document.onmousemove=EngineMouseMove;
	
	
	initShaders();
	
	GAME_START();
	
	//mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
	UpdateViewport();
	render();//main function for drawing
	shutdown();
}


function UpdateViewport(){
	mat4.ortho(0, 1, 0, 1, 0.0, 100.0, pMatrix);
	gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
	
	mat4.identity(mvMatrix);
	//mat4.translate(mvMatrix,[0.0,0.0,-5.0]);
	//mat4.transpose(mvMatrix, pMatrix);
	

}

var EngineInitMouse = function(){
	this.Sx = 0;
	this.Sy = 0;
	this.x = 0;
	this.y = 0;
	this.down = false;
	this.move = false;
	this.button = 0;
};

function EngineMouseDown(event){
	Mouse.down = true;
	Mouse.Sx = event.clientX;
	Mouse.Sy = event.clientX;
	Mouse.x = event.clientX;
	Mouse.y = event.clientX;
	switch(event.button){
	case 0:
		Mouse.button = 1;
		break;
	case 1:
		Mouse.button = 3;
		break;
	case 2:
		Mouse.button = 2;
		break;
	}
}

function EngineMouseUp(event){
	Mouse.down = false;
	Mouse.move = false;
}

function EngineMouseMove(event){
	if(Mouse.down){
		Mouse.move = true;
		Mouse.x = event.clientX;
		Mouse.y = event.clientX;
	}
}

function MouseX(){
	return Mouse.x;
}
function MouseY(){
	return Mouse.y;
}
function MouseDown(key){
	if(Mouse.down){
		if(key==Mouse.button)
			return  true;
		return false;		
	}

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


