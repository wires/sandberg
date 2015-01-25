
// to demonstrate that you can load modules
//var _ = require('lodash');
//var Foo = require('./my-module');
//Foo(document.getElementById('content'), 'good, world!');

var React = require("react");
var Foo = require("./my-module");

// iPad nigga
React.initializeTouchEvents(true);

React.renderComponent(
    Foo(),
    document.getElementById("content")
);