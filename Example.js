/**
 * 
 */

var sprite;
var example;

function GAME_START(){
	sprite = new Sprite("nehe.gif",256,256);
	example= new Sprite("example_texture.jpg",64,64);
	
}

function GAME_RENDER(){
	DrawSprite(sprite,0.0,0.0);
	DrawSprite(example,0.5,0.0);
	//DrawText("test");
}

function GAME_END(){
	
}

