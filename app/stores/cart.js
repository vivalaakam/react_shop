var Reflux = require('reflux');
var appActions = require('./../actions/resources');
var asyncActions = require('../actions/async');
var $ = require('jquery');
var _ = require("underscore");
var cartStore = Reflux.createStore({

    init: function() {
        this.cartStore = [];
        this.listenTo(asyncActions.addItem, this.addItem);
        this.listenTo(appActions.loadCart, this.loadCartData);
        this.listenTo(asyncActions.increaseItem, this.increaseItem);
        this.listenTo(asyncActions.decreaseItem, this.decreaseItem);
        this.listenTo(asyncActions.removeItem , this.removeItem);
    },
    addItem: function(item) {
        $.ajax({
                url: '/api/cart/' + item.id,
                method: 'post',
                context: this
            })
            .success(function(response) {
                if (!item.inCart) {
                    this.cartStore.push(response);
                } else {
                    var itemToIncrease = _.find(this.cartStore, {
                        'id': item.id,
                    });
                    var itemIndex = this.cartStore.indexOf(itemToIncrease);
                    this.cartStore[itemIndex] = response;
                }
                item = response;
                asyncActions.addItem.completed();
                this.trigger(this.cartStore);
            });
    },
    isInCart: function(item) {
        var basketItem = _.find(this.cartStore, {
            'id': item.id
        });
        if (typeof basketItem === 'object') {
            return true;
        } else {
            return false;
        }
    },
    increaseItem: function(item) {
        $.ajax({
                url: '/api/cart/' + item.id + '/increase',
                type: "PUT",
                context: this
            })
            .success(function(response) {
                var itemToIncrease = _.find(this.cartStore, {
                    'id': item.id,
                });
                var itemIndex = this.cartStore.indexOf(itemToIncrease);
                this.cartStore[itemIndex] = response;
                asyncActions.increaseItem.completed();
                this.trigger(this.cartStore);
            });
    },
    decreaseItem : function(item) {
      $.ajax({
              url: '/api/cart/' + item.id + '/decrease',
              type: "PUT",
              context: this
          })
          .success(function(response) {
              var itemToIncrease = _.find(this.cartStore, {
                  'id': item.id,
              });
              var itemIndex = this.cartStore.indexOf(itemToIncrease);
              this.cartStore[itemIndex] = response;
              asyncActions.decreaseItem.completed();
              this.trigger(this.cartStore);
          });
    },
    removeItem: function(item) {
      $.ajax({
              url: '/api/cart/' + item.id,
              type: "DELETE",
              context: this
          })
          .success(function() {
              var itemToIncrease = _.find(this.cartStore, {
                  'id': item.id,
              });
              var itemIndex = this.cartStore.indexOf(itemToIncrease);
              delete this.cartStore[itemIndex];
              asyncActions.removeItem.completed();
              this.trigger(this.cartStore);
          });
    },
    loadCartData: function() {
        if (this.cartStore.length > 0) {
            this.trigger(this.cartStore);
        } else {
            $.ajax({
                    url: '/api/cart/',
                    context: this
                })
                .success(function(response) {
                    this.cartStore = response;
                    this.trigger(this.cartStore);
                });
        }
    },

});

module.exports = cartStore;
