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




function DrawImage(_sprite,x,y){
	gl.drawImage(_sprite.img,x,y);
	
}

/*
 * Additional funcitions
 */





