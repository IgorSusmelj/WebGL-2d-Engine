/**
 * 
 */

function Sprite(image_url,width,height){
	
	this.texture = loadTexture(image_url);
	this.width = width;
	this.height = height;
	this.rotation=0.0;
	
	if(RESOLUTION_INDEPENDENT_SCALING)
		{
			var scaleFactorX = this.width/512;
			if(STRETCHING_ENABLED){
				var scaleFactorY = this.height/512*(SCREEN_WIDTH/SCREEN_HEIGHT);
			}else{
				var scaleFactorY = this.height/512;
			}
				
		}else{
			var scaleFactorX = this.width/SCREEN_WIDTH;
			if(STRETCHING_ENABLED){
				var scaleFactorY = this.height/SCREEN_HEIGHT;
			}else{
				var scaleFactorY = scaleFactorX;	
			}
				
		}

	this.XScale = scaleFactorX;
	this.YScale = scaleFactorY;
	var tmpScalexHalf = scaleFactorX/2;
	var tmpScaleyHalf = scaleFactorY/2
	
    this.VertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    var vertices = [

         -tmpScalexHalf, -tmpScaleyHalf,  0.0,
         tmpScalexHalf, -tmpScaleyHalf,  0.0,
         tmpScalexHalf,  tmpScaleyHalf,  0.0,
         -tmpScalexHalf,  tmpScaleyHalf,  0.0

    ];
    
    
    0, 0,  0.0,
    scaleFactorX, 0,  0.0,
    scaleFactorX,  scaleFactorY,  0.0,
    0,  scaleFactorY,  0.0
    
    
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
}

function LoadImage(image_url,width,height){
	return new Sprite(image_url,width,height);
}

function RotateImage(_sprite,angle){
	_sprite.rotation = angle;
}


function DrawImage(_sprite,x,y,w,h){
	
	mat4.translate(mvMatrix,[x+_sprite.XScale/2,y+_sprite.YScale/2,0.0]);
	mat4.rotate(mvMatrix,_sprite.rotation,[0,0,1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, _sprite.VertexPositionBuffer);
    gl.vertexAttribPointer(activeShader.vertexPositionAttribute, _sprite.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, _sprite.TextureCoordBuffer);
    gl.vertexAttribPointer(activeShader.textureCoordAttribute, _sprite.TextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, _sprite.texture);
    gl.uniform1i(activeShader.samplerUniform, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _sprite.VertexIndexBuffer);
    
    setMatrixUniforms();

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    mat4.identity(mvMatrix);
	
}

/*
 * Additional funcitions
 */

function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}



function loadTexture(img) {
	var neheTexture;
    neheTexture = gl.createTexture();
    neheTexture.image = new Image();
    neheTexture.image.onload = function () {
        handleLoadedTexture(neheTexture);
    };

    neheTexture.image.src = img;
    return neheTexture;
}






