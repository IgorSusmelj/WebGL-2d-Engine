/**
 * 
 */

var sprite;
var example;
var font;

var audioTest;

function DOM_LOADED(){
	InitEngine(false,false,true,true);
	
}

function GAME_INIT(){
	
	sprite = LoadImage("nehe.gif",256,256);
	example= LoadImage("example_texture.jpg",64,64);
	font = LoadFont("BitmapFont_Calibri.png");
	audioTest = LoadSound("GetReadyForThis.mp3");
	
}

function GAME_RENDER(){
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		PlaySound(audioTest);
	if(MouseDown(2))
		FreeSound(audioTest);
	SetFont(font);
	Text(0.6,0.6,"0512");
	//DrawText("test");
	
}

function GAME_END(){
	
}

