window.onload = function() {
  //get webRTC video stream working
  var video = document.getElementById('video');

  navigator.getUserMedia = ( navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

  var constraints = window.constraints = { audio: false, video: true };

  function processImage() {
    if (video.paused || video.ended) return false;
    drawBox();
    requestAnimationFrame(processImage);
  }

  function drawBox() {
    /* fill drawing stuff in here */
    var underlay = document.getElementById('underlay_canvas');
    var overlay = document.getElementById('overlay_canvas');
    var under_ctx = underlay.getContext('2d');
    var over_ctx = overlay.getContext('2d');
    /* fill process code */
    under_ctx.drawImage(video, 0, 0, underlay.width, underlay.height);
    over_ctx.fillStyle = "#FF0000";
    over_ctx.fillRect(0,0,150,75);
  }

  function successCallback(stream) {
    video.src = URL.createObjectURL(stream);
    video.play();
    requestAnimationFrame(processImage);
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);
};
