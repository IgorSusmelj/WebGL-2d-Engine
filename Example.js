/**
 * 
 */

var sprite;
var example;

function DOM_LOADED(){
	InitEngine(false,false,true,false);
	
}

function GAME_START(){
	
	sprite = LoadImage("nehe.gif",256,256);
	example= LoadImage("example_texture.jpg",64,64);
	
}

function GAME_RENDER(){
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		DrawImage(example,0.5,0.0);
	//DrawText("test");
	
}

function GAME_END(){
	
}

