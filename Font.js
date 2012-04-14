/**
 * Lib for Text drawing over the native GDI or canvas2D functions
 * 
 */

var ACTIVE_FONT = null;

function LoadFont(font_url){
	return new Font(font_url);
	
}

function FONT_MAP(){
	this.vertices;
	
	this.VertexPositionBuffer;
	this.VertexPositionBuffer_itemSize;
	this.VertexPositionBuffer_numItems;
	
	this.TextureCoordBuffer;
	this.TextureCoordBuffer_itemSize;
	this.TextureCoordBuffer_numItems;
	
	this.textureCoords;
	
	this.VertexIndexBuffer;
	this.VertexIndexBuffer_itemSize;
	this.VertexIndexBuffer_numItems;
	
	this.cubeVertexIndices;
}

function Font(fontUrl){
	this.FontUrl = fontUrl;
	this.texture = loadTexture(this.FontUrl);
	this.FontMap = new Array(64);
	
	this.size = 32;

	if(RESOLUTION_INDEPENDENT_SCALING)
	{
		var scaleFactorX = width/256;
		if(STRETCHING_ENABLED){
			var scaleFactorY = height/256;
		}else{
			var scaleFactorY = height/256*(Vwidth/Vheight);
		}
			
	}else{
		var scaleFactorX = this.size/Vwidth;
		if(STRETCHING_ENABLED){
			var scaleFactorY = scaleFactorX;
		}else{
			var scaleFactorY = this.size/Vheight;	
		}
			
	}
	this.width = scaleFactorX;
	
	//scaleFactorX = 0.1;
	//scaleFactorY = 0.1;

	for(var t=0;t<8;t++){
		
		for(var u=0;u<8;u++){

			var i=(u+(8*t));
			
			this.FontMap[i]=new FONT_MAP();
		    this.FontMap[i].VertexPositionBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ARRAY_BUFFER, this.FontMap[i].VertexPositionBuffer);
		    this.FontMap[i].vertices = [
		         0, 0,  0.0,
		         scaleFactorX, 0,  0.0,
		         scaleFactorX,  scaleFactorY,  0.0,
		         0,  scaleFactorY,  0.0
		    ];
		    
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.FontMap[i].vertices), gl.STATIC_DRAW);
		    this.FontMap[i].VertexPositionBuffer_itemSize = 3;
		    this.FontMap[i].VertexPositionBuffer_numItems = 4;
	
		    this.FontMap[i].TextureCoordBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ARRAY_BUFFER, this.FontMap[i].TextureCoordBuffer);
		    this.FontMap[i].textureCoords = [
		      0.0+(u*0.125), 0.875-(t*0.125),
		      0.125+(u*0.125), 0.875-(t*0.125),
		      0.125+(u*0.125), 1.0-(t*0.125),
		      0.0+(u*0.125), 1.0-(t*0.125)
		    ];
    
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.FontMap[i].textureCoords), gl.STATIC_DRAW);
		    this.FontMap[i].TextureCoordBuffer_itemSize = 2;
		    this.FontMap[i].TextureCoordBuffer_numItems = 4;
	
		    this.FontMap[i].VertexIndexBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.FontMap[i].VertexIndexBuffer);
		    this.FontMap[i].cubeVertexIndices = [
		        0, 1, 2,      0, 2, 3,
		    ];
		    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.FontMap[i].cubeVertexIndices), gl.STATIC_DRAW);
		    this.FontMap[i].VertexIndexBuffer_itemSize = 1;
		    this.FontMap[i].VertexIndexBuffer_numItems = 6;
		}
	}
}

function SetFont(font_tmp){
	ACTIVE_FONT = font_tmp;
}

function Text(x,y,text){
	
	mat4.translate(mvMatrix,[x,y,0.0]);
	

	for(var i=0;i<text.length;i++){
		var u = text.charCodeAt(i);
		if(u>47 &&u<58){
			u-=48;
		}else if(u>64&&u<91){
			u-=55;
		}else if(u>96&&u<123){
			u-=61;
		}
		//alert("i: "+text.charCodeAt(i)+"  u: "+u);
		mat4.translate(mvMatrix,[ACTIVE_FONT.width,0,0.0]);
		
	    gl.bindBuffer(gl.ARRAY_BUFFER, ACTIVE_FONT.FontMap[u].VertexPositionBuffer);
	    gl.vertexAttribPointer(activeShader.vertexPositionAttribute, ACTIVE_FONT.FontMap[u].VertexPositionBuffer_itemSize, gl.FLOAT, false, 0, 0);
	
	    gl.bindBuffer(gl.ARRAY_BUFFER, ACTIVE_FONT.FontMap[u].TextureCoordBuffer);
	    gl.vertexAttribPointer(activeShader.textureCoordAttribute, ACTIVE_FONT.FontMap[u].TextureCoordBuffer_itemSize, gl.FLOAT, false, 0, 0);
	
	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_2D, ACTIVE_FONT.texture);
	    gl.uniform1i(activeShader.samplerUniform, 0);
	
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ACTIVE_FONT.FontMap[u].VertexIndexBuffer);
	    
	    setMatrixUniforms();
	
	    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	    	
	}
	mat4.identity(mvMatrix);	
}

/*
function DrawText(TextToWrite)
{
	var text_canvas = document.getElementById("TextCanvas");
	var text_ctx = text_canvas.getContext('2d');
	
	
	text_ctx.font = "40pt Calibri";
	text_ctx.fillStyle = "black";
    // align text horizontally center
	text_ctx.textAlign = "center";
    // align text vertically center
    text_ctx.textBaseline = "middle";
   
    
    
    
	text_canvas.width = 512;
	text_canvas.height = 512;

	
    text_ctx.fillText("Hello World!", text_canvas.width/2, text_canvas.height/2);
	
	
	
	//var scaleFactorX = text_canvas.width/Vwidth;
	//var scaleFactorY = text_canvas.height/Vheight;

	var scaleFactorX = 0.2;
	var scaleFactorY = 0.2;
	
	
	//text_ctx.fillText("HTML5 Rocks!", 0, 0);
	
    this.VertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    var vertices = [

         0, 0,  0.0,
         0, 0,  0.0,
         scaleFactorX,  scaleFactorY,  0.0,
         0,  scaleFactorY,  0.0

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.VertexPositionBuffer.itemSize = 3;
    this.VertexPositionBuffer.numItems = 4;

    this.TextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
    var textureCoords = [

      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    this.TextureCoordBuffer.itemSize = 2;
    this.TextureCoordBuffer.numItems = 4;

    this.VertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    this.VertexIndexBuffer.itemSize = 1;
    this.VertexIndexBuffer.numItems = 6;	
	
	
	
	var Text_Texture = gl.createTexture();
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
	
	gl.bindTexture(gl.TEXTURE_2D, Text_Texture);
	gl.texImage2D(gl.TEXURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,text_canvas);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.bindTexture(gl.TEXTURE_2D,null);
    
    
    
    
	mat4.translate(mvMatrix,[0.0,0.0,0.0]);
	
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    gl.vertexAttribPointer(activeShader.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
    gl.vertexAttribPointer(activeShader.textureCoordAttribute, this.TextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, Text_Texture);
    gl.uniform1i(activeShader.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
    
    setMatrixUniforms();

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    mat4.identity(mvMatrix);
}


function getPowerOfTwo(value, pow) {
	var pow = pow || 1;
	while(pow<value) {
		pow *= 2;
	}
	return pow;
}*/