
var React = require("react");

// very simple react component
module.exports = React.createClass({
    haha: function(){
        this.setState({foo:'bar'});
    },
    getInitialState: function() {
        return {foo:'baz'};
    },
    render: function() {
        return React.DOM.a({onClick: this.haha},[
            "State",
            React.DOM.span({className: 'state'}, JSON.stringify(this.state))
        ]);
    }
});