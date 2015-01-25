
// to demonstrate that you can load modules
//var _ = require('lodash');
//var Foo = require('./my-module');
//Foo(document.getElementById('content'), 'good, world!');

var React = require("react");
var Recorder = require("./recorder");

// iPad nigga
React.initializeTouchEvents(true);

React.renderComponent(
    Recorder(),
    document.getElementById("content")
);