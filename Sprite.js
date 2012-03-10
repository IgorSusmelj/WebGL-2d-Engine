/**
 * 
 */

function Sprite(){
	this.quad_buffer = gl.createBuffer();
	this.vertices;
	this.itemSize = 3;
	this.numItems = 4;
	
	gl.bindBuffer(gl.ARRAY_BUFFER,this.quad_buffer);
	this.vertices = [
	                 0.1,   0.1,	0.0,
	                 -0.1,  0.1,	0.0,
	                 0.1,  -0.1,	0.0,
	                 -0.1, -0.1, 0.0
	                 ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices),gl.STATIC_DRAW);
	return this.quad_buffer;
}

function draw(_sprite){
	gl.bindBuffer(gl.ARRAY_BUFFER,_sprite);
	
	gl.vertexAttribPointer(vertexAttribLoc,3,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vertexAttribLoc);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}