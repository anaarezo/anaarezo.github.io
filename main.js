function yourselfie(){

    var yourselfieCam = document.getElementById('cam-yourselfie');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia; 

    if (navigator.getUserMedia){
        navigator.getUserMedia({
            video: true,
            audio: false
        }, function (stream){
            video.srcObject = stream;
            video.play();
            //console.log(stream);
            /**window.URL = window.URL || window.webkitURL;
            var streamURL = window.srcObject(stream);
            yourselfieCam.src = streamURL;
            yourselfieCam.play();*/
        }, function (error){
            console.warn(error);
        });
    }
}

window.addEventListener('load', yourselfie);