/**
 * 
 */

var sprite;
var example;
var font;
var map;

var audioTest;

var rotStep=0.0;

function DOM_LOADED(){
	InitEngine(640,480,true,true);
	
}

function GAME_INIT(){
	
	sprite = LoadImage("Resources/nehe.gif",256,256);
	example= LoadImage("Resources/example_texture.jpg",64,64);
	font = LoadFont("Resources/BitmapFont_Calibri.png");
	audioTest = LoadSound("Resources/GetReadyForThis.mp3");
	
}

function GAME_RENDER(){
	RotateImage(sprite,rotStep);
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		rotStep+=0.05;
	if(MouseDown(2))
		rotStep-=0.05;
	
	if(KeyDown(38))
		Text(0.6,0.6,"0512");
	SetFont(font);
	
}

function GAME_END(){
	
}

