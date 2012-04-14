/**
 * 
 */

var sprite;
var example;
var font;

function DOM_LOADED(){
	InitEngine(false,false,true,true);
	
}

function GAME_START(){
	
	sprite = LoadImage("nehe.gif",256,256);
	example= LoadImage("example_texture.jpg",64,64);
	font = LoadFont("BitmapFont_Calibri.png");
}

function GAME_RENDER(){
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		DrawImage(example,0.5,0.0);
	SetFont(font);
	Text(0.6,0.6,"0512");
	//DrawText("test");
	
}

function GAME_END(){
	
}

