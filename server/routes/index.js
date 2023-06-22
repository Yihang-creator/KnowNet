var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("Success");
  });

module.exports = router;