/** @jsx React.DOM */
var React = require('react');
var asyncActions = require('../../actions/async.js');

var Decrease =
  React.createClass({
    handleClick:function(){
      asyncActions.decreaseItem(this.props.item);
    },
    render: function(){
      return <button onClick={this.handleClick}>-</button>
    }
  });
module.exports = Decrease;
