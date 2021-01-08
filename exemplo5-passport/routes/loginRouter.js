const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('login', { message: null });
});

router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/users', 
        failureRedirect: '/login?fail=true' 
    })
);

module.exports = router;