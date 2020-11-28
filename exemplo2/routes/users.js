const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send("Utilizadores");
});

router.get('/:userId', function(req, res) {
    res.send("Utilizadores: " + req.params['userId']);
});

module.exports = router;