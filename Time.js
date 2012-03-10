/**
 * JavaScript file for Time functions like imestamps
 * for performance analysis
 */

var $time = Date.now || function() {
  return +new Date;
};
function analyze_performance(){
	postTime = $time();
	performanceText = postTime-renderTime+" ms <br>";
	performanceText +=((((19*fps)+(1000/(postTime-lastTime)))/20) | 0)+" fps";
	performanceConsole.innerHTML=performanceText;
	lastTime = $time();
}