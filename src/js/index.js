
// to demonstrate that you can load modules
//var _ = require('lodash');
//var Foo = require('./my-module');
//Foo(document.getElementById('content'), 'good, world!');

var React = require("react");
var Recorder = React.createFactory(require("./recorder"));

var Landingpage = require("./design/landingpage.jsx");
var Finalists = require("./design/finalists.jsx");

// iPad nigga
React.initializeTouchEvents(true);

React.render(
    //Recorder({key: "recorder"}),
    //Landingpage(),
    Finalists(),
    document.getElementById("content")
);