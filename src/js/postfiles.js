
// TODO this seems insecure
var randomString = require("rndm");

module.exports = function postFiles(audioDataURL, videoDataURL) {
    fileName = randomString();
    var files = { };

    files.audio = {
        name: fileName + (isFirefox ? '.webm' : '.wav'),
        type: isFirefox ? 'video/webm' : 'audio/wav',
        contents: audioDataURL
    };

    if (!isFirefox) {
        files.video = {
            name: fileName + '.webm',
            type: 'video/webm',
            contents: videoDataURL
        };
    }

    files.isFirefox = isFirefox;

    cameraPreview.src = '';
    cameraPreview.poster = '/ajax-loader.gif';

    xhr('/upload', JSON.stringify(files), function(_fileName) {
        var href = location.href.substr(0, location.href.lastIndexOf('/') + 1);
        cameraPreview.src = href + 'uploads/' + _fileName;
        cameraPreview.play();

        var h2 = document.createElement('h2');
        h2.innerHTML = '<a href="' + cameraPreview.src + '">' + cameraPreview.src + '</a>';
        document.body.appendChild(h2);
    });
};

function xhr(url, data, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };
    request.open('POST', url);
    request.send(data);
}