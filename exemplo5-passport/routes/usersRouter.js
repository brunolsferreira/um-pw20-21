const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res) {
    controller.list(req, res);
});

router.post('/', [
    body('username').isLength({min: 5, max: 10}).withMessage('Username should have between 5 and 10 chars'),
    body('name').not().isEmpty().withMessage('Name is a required field'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({min: 8, max: 15}).withMessage('Password should have between 8 and 15 chars')
], function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    controller.create(req, res);
});

router.get('/:username',function(req, res) {
    controller.read(req, res);
});

router.put('/:username', function(req, res) {
    controller.update(req, res);
});

router.delete('/:username', function(req, res) {
    controller.delete(req, res);
});

module.exports = router;