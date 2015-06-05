/** @jsx React.DOM */
var React = require('react');
var Catalog = require('./products.js');
var Cart = require('./cart.js');
var Router = require('react-router-component');
var Product = require('./product.js');
var Template = require ('./template.js');
var Test = require('./test.js');
var Locations = Router.Locations;
var Location = Router.Location;


var APP =
  React.createClass({
    render: function(){
      return (
          <Template>
            <Locations  ref="router">
            <Location path="/" handler={Catalog} />
            <Location path="/list" handler={Catalog} />
              <Location path="/item/:item" handler={Product} />
              <Location path="/cart" handler={Cart} />
              <Location path="/test" handler={Test} />
            </Locations>
          </Template>
        )
    }
  });
module.exports = APP;
