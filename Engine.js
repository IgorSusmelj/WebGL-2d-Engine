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
var activeShader;
var vertexAttribLoc;
var sprite;
var vVertices;
var vertexPosBufferObject;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();


var texture_test;



function initWebGL(){
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

	
	
	
	initShaders();
	
	GAME_START();
	
	//mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
	mat4.ortho(0, 1, 0, 1, 0.0, 100.0, pMatrix);
	
	render();//main function for drawing
	shutdown();
}




function render(){
	renderTime = $time();
	window.requestAnimFrame(render, canvas);//call drawback function for smooth animation. (60fps limit << screen refresh rate)
	
	gl.viewport(0,0,gl.viewportWidth,gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
	
	
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix,[0.0,0.0,-5.0]);
	
	GAME_RENDER();

    
	analyze_performance();//function for performance information
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


