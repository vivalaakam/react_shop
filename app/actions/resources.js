var reflux = require("reflux");

var actions = reflux.createActions([
  "loadProduct",
  "loadProducts",
  "loadCart",
  "cartUpdated",
  "increaseItem",
  "decreaseItem"
]);

module.exports = actions;
