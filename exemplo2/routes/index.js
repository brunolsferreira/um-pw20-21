const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Pagina principal");
});

module.exports = router;