var fs = require("fs");
var libxmljs = require("libxmljs");
var ns = {x: "http://www.w3.org/2000/svg"};

var xml = fs.readFileSync("src/svg/design.svg");
var xmlDoc = libxmljs.parseXmlString(xml);

var gchilds = xmlDoc.find('//x:svg/x:g', ns);

gchilds.forEach(function(gchild){
	var fn = gchild.attr("id").value();
	if (fn.match(/[a-zA-Z0-9]/))
	{
		var s = svgDoc(gchild)
		var target = 'dist/' + fn + '.svg'
		fs.writeFileSync(target, s);
		console.log("wrote " + target);
	}
	else
	{
		console.log("skipping " + fn);
	}
});

function svgDoc(node, defs){

    var doc = new libxmljs.Document();
    doc.node('svg').attr({
        width: '100%',
        height: '100%',
        viewBox: '0 0 1920 1200',
        style: 'enabled-background: new 0 0 19200 1200; background-color: black;'
    });

    doc.root().defineNamespace(ns.x);
    doc.root().addChild(node.clone());

    return doc.toString();
};
