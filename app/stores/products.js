var Reflux = require('reflux');
var $ = require('jquery');
var appActions = require('./../actions/resources');

var productStore = Reflux.createStore({

  init: function() {
    this.productStore = [];
    this.listenTo(appActions.loadProducts, this.loadProductData);
  },

  loadProductData: function() {
    if(this.productStore.length > 0) {
      this.trigger(this.productStore);
    } else {
      $.ajax({
        url: '/api/products/',
        context: this
      })
      .success(function(response) {
        this.productStore = response;
        this.trigger(this.productStore);
      });
    }
  }

});

module.exports = productStore;
