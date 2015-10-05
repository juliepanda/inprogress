function successCallback(stream) {
    // RecordRTC usage goes here
   var video = document.querySelector('video');
   video.src = window.URL.createObjectURL(stream);
   video.onloadedmetadata = function(e) {
      // Do something with the video here.
    video.play();
   };
}

function errorCallback(errror) {
    // maybe another application is using the device
}

var mediaConstraints = { video: true, audio: false };

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

if (navigator.getUserMedia)
navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
