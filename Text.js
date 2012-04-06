/**
 * Lib for Text drawing over the native GDI or canvas2D functions
 * 
 */

function DrawText(TextToWrite)
{
	var text_canvas = document.getElementById("TextCanvas");
	var text_ctx = text_canvas.getContext('2d');
	text_ctx.fillStyle = "#FFFFFF"; 	// This determines the text colour, it can take a hex value or rgba value (e.g. rgba(255,0,0,0.5))
	text_ctx.textAlign = "center";	// This determines the alignment of text, e.g. left, center, right
	text_ctx.textBaseline = "middle";	// This determines the baseline of the text, e.g. top, middle, bottom
	text_ctx.font = "12px monospace";
	text_canvas.width = 512;
	text_canvas.height = 512;
	
	//var scaleFactorX = text_canvas.width/Vwidth;
	//var scaleFactorY = text_canvas.height/Vheight;

	var scaleFactorX = 0.2;
	var scaleFactorY = 0.2;
	
	
	text_ctx.fillText("HTML5 Rocks!", 0, 0);
	
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
}