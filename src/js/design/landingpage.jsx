var React = require("react");
var ISvg = require('react-inlinesvg');

module.exports = React.createClass({
    render: function() {
        return (
            <ISvg width="100%" heigh="100%" src="landingPage.svg">
                Your browser doesn't support XHR or inline SVGs.
            </ISvg>
        )
    }
});