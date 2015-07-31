var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.render('./mainpage', { title: 'Green Chat' });
});
module.exports = router;