var express = require('express');
var _ = require('underscore');
var router = express.Router();

var Items = [];

for (var i = 1; i < 9; i++) {
    Items.push({
        'id': i,
        'title': 'Widget #' + i,
        'summary': 'This is an awesome widget!',
        'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, commodi.',
        'img': '/assets/product.png',
        'cost': i,
        inCart: false,
        qty: 0
    });
}

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/api/products', function(req, res) {
    res.json(Items);
});

router.get('/api/products/:id', function(req, res) {
    var item = Items.filter(function(i) {
        return i.id === +req.params.id;
    });
    if (item.length > 0) {
        res.json(item[0]);
    } else {
        res.json({});
    }
});

router.get('/api/cart', function(req, res) {
    var items = Items.filter(function(item) {
        return item.inCart === true;
    });
    res.json(items);
});

router.post('/api/cart/:id' , function(req , res) {
    var item = Items.filter(function(i) {
      return i.id === +req.params.id;
    })[0];
    if(item) {
      item.inCart = true;
      item.qty +=1;
      res.json(item);
    } else{
      res.status(500);
    }
});

router.put('/api/cart/:id/increase' , function(req , res) {
  var item = Items.filter(function(i) {
    return i.id === +req.params.id;
  })[0];
  if(item) {
    item.qty +=1;
    res.json(item);
  } else{
    res.status(500);
  }
});

router.put('/api/cart/:id/decrease' , function(req , res) {
  var item = Items.filter(function(i) {
    return i.id === +req.params.id;
  })[0];
  if(item) {
    item.qty -=1;
    res.json(item);
  } else{
    res.status(500);
  }
});

router.delete('/api/cart/:id' , function(req , res) {
  var item = _.find(Items , { 'id' : +req.params.id });
  var index = Items.indexOf(item);
  console.log(item);
  if(item) {
    delete Items[index];
    res.json({  });
  } else{
    res.status(500);
  }
});

router.get('/*' , function(req , res) {
  res.render('index');
});

module.exports = router;
