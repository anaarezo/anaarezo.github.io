// ScreenSaver
function yourselfieScreen() {
    var elem = document.querySelector('.ys-screensaver');
    elem.parentNode.removeChild(elem);
}
window.addEventListener('click', yourselfieScreen);

// Webcam Player
function yourselfieWebcam() {

    var yourselfieCam = document.getElementById('yourselfie');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            video: true,
            audio: false
        }, function (stream) {
            yourselfieCam.srcObject = stream;
            yourselfieCam.play();
            yourselfieCam2.srcObject = stream;
            yourselfieCam2.play();
            //console.log(stream);
        }, function (error) {
            console.warn(error);
        });
    }
}
window.addEventListener('load', yourselfieWebcam);

// Snapshot
/*function yourselfieSnapshot{
	
}
window.addEventListener('load', yourselfieSnapshot);*/

// LocalStorage
/*function yourselfieStorage{
	
}
window.addEventListener('load', yourselfieStorage);*/