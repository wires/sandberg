
var recordRTC = require("./RecordRTC");
var postFiles = require("./postfiles");

var React = require("react");

//// not sure about this, react should solve this
//if(window && !window.onbeforeunload)
//    window.onbeforeunload = function() {
//        //startRecording.disabled = false;
//    };

module.exports = React.createClass({
    haha: function(){
        this.setState({foo:'bar'});
    },
    getInitialState: function() {
        return {foo:'baz'};
    },
    render: function() {
        return React.DOM.a({onClick: this.haha},[
            "State",
            React.DOM.span({className: 'state'}, JSON.stringify(this.state))
        ]);
    }
});

/*
var startRecording = document.getElementById('start-recording');
var stopRecording = document.getElementById('stop-recording');
var cameraPreview = document.getElementById('camera-preview');

var audio = document.querySelector('audio');

var isFirefox = !!navigator.mozGetUserMedia;

var recordAudio, recordVideo;
*/


startRecording= function() {
    //startRecording.disabled = true;
    navigator.getUserMedia({
        audio: true,
        video: true
    }, function(stream) {
        cameraPreview.src = window.URL.createObjectURL(stream);
        cameraPreview.play();

        recordAudio = RecordRTC(stream, {
            bufferSize: 16384
        });

        if (!isFirefox) {
            recordVideo = RecordRTC(stream, {
                type: 'video'
            });
        }

        recordAudio.startRecording();

        if (!isFirefox) {
            recordVideo.startRecording();
        }

        stopRecording.disabled = false;
    }, function(error) {
        alert(JSON.stringify(error));
    });
};


stopRecording = function() {
    //startRecording.disabled = false;
    //stopRecording.disabled = true;

    recordAudio.stopRecording(function() {
        if (isFirefox) onStopRecording();
    });

    if (!isFirefox) {
        recordVideo.stopRecording();
        onStopRecording();
    }

    function onStopRecording() {
        recordAudio.getDataURL(function(audioDataURL) {
            if (!isFirefox) {
                recordVideo.getDataURL(function(videoDataURL) {
                    postFiles(audioDataURL, videoDataURL);
                });
            } else postFiles(audioDataURL);
        });
    }
};
