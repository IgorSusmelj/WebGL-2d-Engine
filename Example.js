/**
 * 
 */

var sprite;
var example;
var font;
var x=0.5;
var y=0.5;
var audioTest;

function DOM_LOADED(){
	//function InitEngine(_ResolutionIndependent,_EnableStretching,_EnableFullScreen,_EnableDebug)
	InitEngine(false,false,true,true);
	
}

function GAME_INIT(){
	
	sprite = LoadImage("Resources/nehe.gif",256,256);
	example= LoadImage("Resources/example_texture.jpg",64,64);
	//font = LoadFont("Resources/BitmapFont_Calibri.png");
	//audioTest = LoadSound("Resources/GetReadyForThis.mp3");
	
}

function GAME_RENDER(){
	DrawImage(sprite,x,y);
	if(MouseDown(1))
		x+=0.05;
	if(MouseDown(2))
		x-=0.05;
	//SetFont(font);
	//Text(0.6,0.6,"0512");
	//DrawText("test");
	
}

function GAME_END(){
	
}

