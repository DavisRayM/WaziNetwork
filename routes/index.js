var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Wazi Network', nav: 'home' });
});

router.get('/faq', (req, res, next) => {
  res.render('faq', { title: 'Wazi Network - Frequently Asked Questions', nav: 'faq'})
});

module.exports = router;
