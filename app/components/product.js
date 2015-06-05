/** @jsx React.DOM */
var React = require('react');
var Reflux = require('reflux');
var reactAsync = require('react-async');

var appActions = require('../actions/resources');
var productStore = require('../stores/product');

var CatalogDetail = React.createClass({
    mixins: [ Reflux.ListenerMixin],
    getInitialState: function () {
        return {item : {}};
    },
    componentDidMount: function() {
        this.listenTo(productStore, this.refreshProduct);
        appActions.loadProduct(this.props.item);
    },
    refreshProduct: function(data) {
        this.setState({
            item: data
        });
    },
    render: function() {
      if(this.state.item) {
        return <div > Widget {
            this.state.item.title
        } < /div>;
      } else {
        return <div>Load in progress</div>
      }
    }
});
module.exports = CatalogDetail;
