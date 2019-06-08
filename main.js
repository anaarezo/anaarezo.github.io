function yourselfie(){

    var yourselfieCam = document.getElementById('cam-yourselfie');
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
    
    if (navigator.getUserMedia){
        navigator.getUserMedia({
            video: true,
            audio: false
        }, function (stream){
            //console.log(stream);
            window.URL = window.URL || window.webkitURL;
            var streamURL = window.URL.createObjectURL(stream);
            yourselfieCam.src = streamURL;
        }, function (error){
            console.warn(error);
        });
    }
}

window.addEventListener('load', yourselfie);