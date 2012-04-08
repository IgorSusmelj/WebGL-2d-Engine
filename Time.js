/**
 * JavaScript file for Time functions like time stamps
 * for performance analysis
 */

var $time = Date.now || function() {
  return +new Date;
};
function analyze_performance(){
	renderTimer.stop();
	var renderTime = renderTimer.microseconds();

	//postTime = $time();
	var difference = postTime-lastTime;
	
	var tmpText;
	
	if(renderTime==0){
		performanceText = "0000"+" microSeconds <br>";
	}else{
		performanceText = renderTime+" microSeconds<br>";
	}
	performanceText +=((((19*fps)+(1000/difference))/20) | 0)+" fps<br>";
	tmpText=performanceText+"<br>";
	tmpText+="MouseStartX: "+Mouse.Sx+"<br>";
	tmpText+="MouseStartY: "+Mouse.Sy+"<br>";
	tmpText+="MouseX: "+MouseX()+"<br>";
	tmpText+="MouseY: "+MouseY()+"<br>";
	tmpText+="MouseDown: "+Mouse.down+"<br>";
	tmpText+="MouseMove: "+Mouse.move+"<br>";
	tmpText+="pixels: "+pixels+"<br>";
	
	pixels
	
	performanceConsole.innerHTML = tmpText;
	lastTime = $time();
}