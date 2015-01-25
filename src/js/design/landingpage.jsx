var React = require("react");
var ISvg = require('react-inlinesvg');

module.exports = React.createClass({
    render: function() {
        return (
            <ISvg width="100%" heigh="100%" src="landingpage.svg">
                Here's some optional content for browsers that don't support XHR or inline
                SVGs. You can use other React components here too. Here, I'll show you.
                <img src="landingpage.png" />
            </ISvg>
        )
    }
});