/**
 * JavaScript file for Time functions like imestamps
 * for performance analysis
 */

var $time = Date.now || function() {
  return +new Date;
};