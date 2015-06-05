/** @jsx React.DOM */
var React = require('react');
var CartSummary = require('./cartsummary.js');
var Link = require('react-router-component').Link;
var Header =
  React.createClass({
    render:function(){
      var link = "/list";
      return (
        <div className="row">
          <div className="col-sm-6">
            <h1>Lets Shop</h1>
            <Link href={link}>
              Main Page
            </Link>
          </div>
           <div className="col-sm-2 col-sm-push-3">
            <br />
              <CartSummary />
            </div>
        </div>
        )
    }
  });
  module.exports = Header;
