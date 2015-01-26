var React = require("react");
var ISvg = require('react-inlinesvg');

module.exports = React.createClass({
    render: function() {
        return (
            <ISvg ref="rootNode"
                width="100%"
                heigh="100%"
                src="theFinalists.svg">
                Your browser doesn't support XHR or inline SVGs.
            </ISvg>
        )
    },
    componentDidMount: function() {
        var n = this.refs.rootNode.getDOMNode();
        console.log(n);
    }
});