var express = require('express');
var router = express.Router();

/* GET /api/home */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /api/profile */
router.get('/profile', function(req, res, next) {
  res.json({
    name: 'Eco User',
    email: 'eco@example.com'
  });
});

module.exports = router;
