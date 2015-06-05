var reflux = require("reflux");

var actions = reflux.createActions({
    "addItem": {
        children: ["completed", "failed"]
    },
    "increaseItem": {
        children: ["completed", "failed"]
    },
    "decreaseItem": {
        children: ["completed", "failed"]
    },
    "removeItem": {
        children: ["completed"]
    }

});

module.exports = actions;
