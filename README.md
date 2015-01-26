# Setup

Install dependencies

	npm install

Then

	gulp

This will start a webserver with `./dist/` as it's document root and
with livereload script injection.

	https://localhost:4009

Every time you modify a file in `./src/` the page will live reload.
*HHAHA* not anymore,.. it is served over HTTPS, but not livereload.

## HTTPS

to *Allow Always* teh camera, one needs HTTPS.

script autogenerates PEM files:

	var https = require('https');
	var pem = require('pem');
	var express = require('express');

	pem.createCertificate({days: 1, selfSigned: true}, function(err, keys) {

		var app = express();
		app.use(require('connect-livereload')());
		app.use(express.static(__dirname + '/dist'));
		https
			.createServer({key: keys.serviceKey, cert: keys.certificate}, app)
			.listen(4009);
	});

## SVG processing

Split SVG file using JS.

	node svgproc.js

Takes out the root group nodes matching a `id=...` regex.
Here is how that works, first some ceremony.

	var libxmljs = require("libxmljs");
	var ns = {x: "http://www.w3.org/2000/svg"};
	var xml = fs.readFileSync("src/svg/design.svg");
	var xmlDoc = libxmljs.parseXmlString(xml);

Now, find *namespaced* SVG nodes

	var gchilds = xmlDoc.find('//x:svg/x:g', ns);

For each node, check id attribute value

	gchilds.forEach(function(gchild){
		var fn = gchild.attr("id").value();
		if (fn.match(/^[a-zA-Z0-9]+$/))
			// here do magic


