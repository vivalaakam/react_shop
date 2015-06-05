/** @jsx React.DOM */
var React = require('react');
var AddToCart = require('./catalog/addtocart.js');
var Link = require('react-router-component').Link;
var productsStore = require('../stores/products');
var appActions = require('../actions/resources');
var Reflux = require('reflux');

var Catalog = React.createClass({
    mixins: [Reflux.ListenerMixin],
        getInitialState: function() {
            return {
                items: []
            };
        },
        componentDidMount: function() {
            this.listenTo(productsStore, this.refreshProducts);
            appActions.loadProducts();
        },
        refreshProducts: function(data) {
            this.setState({
                items: data
            });
        },
        render: function() {
            var items = this.state.items.map(function(item) {
                var link = '/item/' + item.id;
                return <tr><td><Link href={link}>{item.title}</Link></td><td>${item.cost}</td><td><AddToCart item={item}/></td></tr>
            });
            return ( <table className="table tableble-hover">{items}</table>);
        }
});

module.exports = Catalog;
