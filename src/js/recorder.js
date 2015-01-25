
var RecordRTC = require("./RecordRTC");
var postFiles = require("./postfiles");

var React = require("react");

module.exports = React.createClass({

    startRecording: function() {
        this.setState({state: "awaiting permission"});

        navigator.getUserMedia({
            audio: true,
            video: true
        }, function success(stream){

            // connect "UserMedia" stream to <video> element
            var videoElement = this.refs.video.getDOMNode();
            videoElement.src = window.URL.createObjectURL(stream);
            videoElement.play();
            videoElement.muted = true;
            videoElement.controls = false;
            this.setState({state: "created preview"});


            // using RecordRTC.. *sights* it's not pretty
            var audioConfig = {};
            audioConfig.onAudioProcessStarted = function() {
                // invoke video recorder in this callback
                // to get maximum sync
                videoRecorder.startRecording();
            };
            var audioRecorder = RecordRTC(stream, audioConfig);
            var videoRecorder = RecordRTC(stream, {type: 'video'});
            audioRecorder.startRecording();

            this.setState({
                audioRecorder: audioRecorder,
                videoRecorder: videoRecorder,
                state: "recording"
            });


        }.bind(this), function failed(error) {
            this.setState({state: "access denied", error: error});
        }.bind(this));
    },

    // when btnStopRecording is clicked
    stopRecording: function() {
        //startRecording.disabled = false;
        //stopRecording.disabled = true;

        //recordAudio.stopRecording(function() {
        //    if (isFirefox) onStopRecording();
        //});
        //
        //if (!isFirefox) {
        //    recordVideo.stopRecording();
        //    onStopRecording();
        //}
        //
        //function onStopRecording() {
        //    recordAudio.getDataURL(function(audioDataURL) {
        //        if (!isFirefox) {
        //            recordVideo.getDataURL(function(videoDataURL) {
        //                postFiles(audioDataURL, videoDataURL);
        //            });
        //        } else postFiles(audioDataURL);
        //    });
        //}
        this.state.audioRecorder.stopRecording(function callback(data){
            console.log(data);
            this.state.videoRecorder.stopRecording();
        }.bind(this));
        this.setState({state: 'stopped'});
    },

    haha: function() {
        this.setState({foo:'bar'});
    },
    getInitialState: function() {
        return {foo:'bazz0r'};
    },
    render: function() {
        return React.DOM.div({className: 'recorder'},[
            React.DOM.div({className: 'preview'},[
                    React.DOM.video({
                        ref: 'video',
                        width: "320px",
                        height: "240px"
                    })
                ]),
            React.DOM.div({className: 'controls'},[
                    React.DOM.a({
                        className: 'btn',
                        onClick: this.startRecording
                    }, 'Start'),
                    React.DOM.a({
                        className: 'btn',
                        onClick: this.stopRecording
                    }, 'Stop')
                ]),
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

