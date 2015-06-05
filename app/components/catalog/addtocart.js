/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var appActions = require('../../actions/async.js');
var cartStore = require('../../stores/cart.js');
var AddToCart =  React.createClass({
    mixins : [Reflux.connect(cartStore) ,Reflux.ListenerMixin],
    componentDidMount: function() {
      this.setState({inCart : this.isInCart()});
      this.listenTo(appActions.addItem.completed, this.refreshState);
    },
    refreshState: function() {
      this.setState({inCart : this.isInCart()});
    },
    isInCart() {
      return cartStore.isInCart(this.props.item);
    },
    handleClick:function(){
      appActions.addItem(this.props.item);
    },
    render: function(){
      if(this.state.inCart) {
        return <button onClick={this.handleClick}>In cart</button>;
      } else {
        return <button onClick={this.handleClick}>Add to cart</button>;
      }
    }
  });
module.exports = AddToCart;
