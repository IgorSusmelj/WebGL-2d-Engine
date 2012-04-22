/**
 * 
 */


function CSprite(image_url,width,height){
	this.img = new Image();
	this.img.src=image_url;
}



function LoadImage(image_url,width,height){
	return new CSprite(image_url,width,height);
}


function RotateImage(_sprite,angle){
	
}

function DrawImage(_sprite,x,y){
	gl.drawImage(_sprite.img,SCREEN_WIDTH*x,SCREEN_HEIGHT*y);
	
}

/*
 * Additional funcitions
 */





