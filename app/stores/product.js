var Reflux = require('reflux');
var $ = require('jquery');
var appActions = require('./../actions/resources');

var productStore = Reflux.createStore({

  init: function() {
    this.productStore = {};
    this.listenTo(appActions.loadProduct, this.loadProductData);
  },

  loadProductData: function() {
    var productId = arguments[0];
    if(this.productStore[productId]) {
      this.trigger(this.productStore[productId]);
    } else {
      $.ajax({
        url: '/api/products/'+productId,
        context: this
      })
      .success(function(response) {
        this.productStore[productId] = response;
        this.trigger(this.productStore[productId]);
      });
    }
  }

});

module.exports = productStore;
