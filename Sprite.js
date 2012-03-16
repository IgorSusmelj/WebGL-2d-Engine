/**
 * 
 */

function Sprite(image_url){
	
	this.texture = loadTexture("nehe.gif");
		
	
    this.VertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    var vertices = [

        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0,
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0

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
}





function DrawSprite(_sprite){
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
	
}

/*
 * Additional funcitions
 */

function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
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
        handleLoadedTexture(neheTexture)
    }

    neheTexture.image.src = img;
    return neheTexture;
}






