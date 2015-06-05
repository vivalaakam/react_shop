/** @jsx React.DOM */
var React = require('react');
var cartStore = require('../stores/cart.js');
var RemoveFromCart = require('./cart/removefromcart.js');
var Increase = require('./cart/increase.js');
var Decrease = require('./cart/decrease.js');
var appActions = require('../actions/resources.js');
var Reflux = require('reflux');


var Cart =  React.createClass({
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
      var total = 0;
      var items = this.state.items.map(function(item, i){
        var subtotal = item.cost*item.qty;
        total += subtotal;
        return (
          <tr key={i}>
            <td><RemoveFromCart item={item} /></td>
            <td>{item.title}</td>
            <td>{item.qty}</td>
            <td>
              <Increase item={item} />
              <Decrease item={item} />
            </td>
            <td>${subtotal}</td>
          </tr>
          )
      })
      return(
          <table className="table tableble-hover">
          <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Qty</th>
                <th></th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right">Total</td>
                <td>${total}</td>
              </tr>
            </tfoot>
          </table>
        )
    }
  });

module.exports = Cart;
