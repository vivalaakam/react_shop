/** @jsx React.DOM */
var React = require('react');
var asyncActions = require('../../actions/async.js');

var Increase =
  React.createClass({
    handleClick:function(){
      asyncActions.increaseItem(this.props.item);
    },
    render: function(){
      return <button onClick={this.handleClick}>+</button>
    }
  });
module.exports = Increase;
