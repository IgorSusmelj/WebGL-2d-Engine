/**
 * 
 */

//Mouse
var Mouse;


//Keyboard events
var KeyEnum = {Arr_Up:38,Arr_Down:40,Arr_Right:39,Arr_Left:37,W:87,A:65,S:83,D:68,Space:32};
var KeyArray = new Array(false,false,false,false,false,false,false,false,false);
var KeyHitArray = new Array(false,false,false,false,false,false,false,false,false);




var EngineInitMouse = function(){
	this.Sx = 0;
	this.Sy = 0;
	this.x = 0;
	this.y = 0;
	this.down = false;
	this.move = false;
	this.button = 0;
};

function EngineMouseDown(event){
	Mouse.down = true;
	Mouse.Sx = event.clientX;
	Mouse.Sy = event.clientY;
	Mouse.x = event.clientX;
	Mouse.y = event.clientY;
	switch(event.button){
	case 0:
		Mouse.button = 1;
		break;
	case 1:
		Mouse.button = 3;
		break;
	case 2:
		Mouse.button = 2;
		break;
	}
	return false;
}

function EngineKeyDown(e){
	//alert("eys");
	switch(e.keyCode){
	
	//arrows
		case 38:
			KeyArray[KeyEnum.Arr_Up]=true;
			break;
		case 40:
			KeyArray[KeyEnum.Arr_Down]=true;
			break;
		case 39:
			KeyArray[KeyEnum.Arr_Right]=true;
			break;
		case 37:
			KeyArray[KeyEnum.Arr_Left]=true;
			break;
			
	//wasd
		case 87:
			KeyArray[KeyEnum.W]=true;
			break;
		case 65:
			KeyArray[KeyEnum.A]=true;
			break;
		case 83:
			KeyArray[KeyEnum.S]=true;
			break;
		case 68:
			KeyArray[KeyEnum.D]=true;
			break;
			
		//space
		case 32:
			KeyArray[KeyEnum.Space]=true;
			break;	
		
	}
}
function EngineKeyUp(e){
	switch(e.keyCode){
	
	//arrows
		case 38:
			KeyArray[KeyEnum.Arr_Up]=false;
			KeyHitArray[KeyEnum.Arr_Up]=false;
			break;
		case 40:
			KeyArray[KeyEnum.Arr_Down]=false;
			KeyHitArray[KeyEnum.Arr_Down]=false;
			break;
		case 39:
			KeyArray[KeyEnum.Arr_Right]=false;
			KeyHitArray[KeyEnum.Arr_Right]=false;
			break;
		case 37:
			KeyArray[KeyEnum.Arr_Left]=false;
			KeyHitArray[KeyEnum.Arr_Left]=false;
			break;
			
	//wasd
		case 87:
			KeyArray[KeyEnum.W]=false;
			KeyHitArray[KeyEnum.W]=false;
			break;
		case 65:
			KeyArray[KeyEnum.A]=false;
			KeyHitArray[KeyEnum.A]=false;
			break;
		case 83:
			KeyArray[KeyEnum.S]=false;
			KeyHitArray[KeyEnum.S]=false;
			break;
		case 68:
			KeyArray[KeyEnum.D]=false;
			KeyHitArray[KeyEnum.D]=false;
			break;
			
		//space
		case 32:
			KeyArray[KeyEnum.Space]=false;
			KeyHitArray[KeyEnum.Space]=false;
			break;	
		
	}

}

function KeyDown(key){
	if(KeyArray[key])
		return true;
	return false;
}

function KeyHit(key){
	if(KeyArray[key]==true&&KeyHitArray[key]==false)
	{
		KeyHitArray[key]=true;
		return true;
	}
	return false;	
}

function EngineMouseUp(event){
	Mouse.down = false;
	Mouse.move = false;
	return false;
}

function EngineMouseMove(event){
	if(Mouse.down){
		Mouse.move = true;
		Mouse.x = event.clientX;
		Mouse.y = event.clientY;
	}
	return false;
}

function MouseX(){
	return Mouse.x;
}
function MouseY(){
	return Mouse.y;
}
function MouseDown(key){
	if(Mouse.down){
		if(key==Mouse.button)
			return  true;
		return false;		
	}

}


