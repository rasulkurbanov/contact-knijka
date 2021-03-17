const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator');


//@route POST api/users
//@desc  Register a user
//@access Public
router.post('/',
  //Initializing express-validator to validate errors
  check('name')
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  check('email')
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Email must be at least 5 characters long')
    .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    .withMessage('Please enter a valid email address!'),
  check('password')
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage('Password must contain at least 10 characters')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage('Password must contain at least one special character'),
  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    res.send(req.body)
  })
  


module.exports = router