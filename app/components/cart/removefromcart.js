/** @jsx React.DOM */
var React = require('react');
var asyncActions = require('../../actions/async.js');

var RemoveFromCart =
  React.createClass({
    handleClick:function(){
      asyncActions.removeItem(this.props.item);
    },
    render: function(){
      return <button onClick={this.handleClick}>x</button>
    }
  });
module.exports = RemoveFromCart;
