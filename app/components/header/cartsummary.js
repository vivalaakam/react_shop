/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;

var cartStore = require('../../stores/cart.js');
var appActions = require('../../actions/resources');
var Reflux = require('reflux');

var CartSummary = React.createClass({
  mixins:[Reflux.ListenerMixin],
  getInitialState: function () {
      return {items : []};
  },
  componentDidMount: function() {
      this.listenTo(cartStore, this.refreshCart);
      appActions.loadCart();
  },
  refreshCart: function(data) {
      this.setState({
          items: data
      });
  },
    render:function(){
      var count = 0 , cost = 0;
      this.state.items.forEach(function(item) {
        count += item.qty;
        cost += item.qty * item.cost;
      });

      return (
        <div>
          <Link
            href="/cart"
            className="btn btn-success">
            Cart Items: {count} / {cost}
            </Link>
        </div>
        )
    }
  });
  module.exports = CartSummary;
