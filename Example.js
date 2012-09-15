/**
 * 
 */

var sprite;
var example;
var font;
var map;

var audioTest;

var rotStep=0.0;


var z = 0;

var stream;
 
 
function DOM_LOADED(){
	InitEngine(640,480,true,true);

}

function GAME_INIT(){

	sprite = LoadImage("Resources/nehe.gif",256,256);
	example= LoadImage("Resources/example_texture.jpg",64,64);
	font = LoadFont("Resources/BitmapFont_Calibri.png");
	audioTest = LoadSound("Resources/GetReadyForThis.mp3");
	stream = OpenTCPStream("ws://localhost:9999/");
	SetFont(font);
}

function GAME_RENDER(){
	RotateImage(sprite,rotStep);
	DrawImage(sprite,0.0,0.0);
	if(MouseDown(1))
		rotStep+=0.05;
	if(MouseDown(2))
		rotStep-=0.05;
	
	if(KeyHit(38))
		WriteString(stream,"test");

	Text(0.6,0.6+z,"0512");
	
	var streamdata = ReadString(stream);
	if(streamdata!='')
		console.log("ReadString: "+streamdata);

}

function GAME_END(){

}
