window.onload = function() {
  var base = document.getElementById('base');
  var matcher = document.getElementById('matcher');
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');
  var width = 400;
  var height = 300;

  ctx.drawImage(matcher, 0, 0, width, height);
  var grayImg = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
  var code = jsfeat.COLOR_RGBA2GRAY;
  jsfeat.imgproc.grayscale(matcher.data, width, height, grayscale, code);







};
