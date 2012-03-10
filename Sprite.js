/**
 * 
 */

function Sprite(){
	this.quad_buffer = gl.createBuffer();
	this.vertices;
	this.itemSize = 3;
	this.numItems = 4;
	
	gl.bindBuffer(gl.ARRAY_BUFFER,quad_buffer);
	vertices = [
	            1.0,   1.0,	0.0,
	            -1.0,  1.0,	0.0,
	            1.0,  -1.0,	0.0,
	            -1.0, -1.0, 0.0
	            
	            ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	
}

Sprite.prototype.get = function(){
	return false;
};

