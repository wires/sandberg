
// to demonstrate that you can load modules
//var _ = require('lodash');
//var Foo = require('./my-module');
//Foo(document.getElementById('content'), 'good, world!');

var React = require("react");
var Recorder = React.createFactory(require("./recorder"));

// iPad nigga
React.initializeTouchEvents(true);

React.render(
    Recorder({key: "recorder"}),
    document.getElementById("content")
);