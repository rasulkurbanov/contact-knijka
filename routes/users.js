const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')


//@route POST api/users
//@desc  Register a user
//@access Public
router.post('/',
  //Initializing express-validator to validate errors
  check('name')
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  check('email')
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage('Email must be at least 5 characters long')
    .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    .withMessage('Please enter a valid email address!'),
  check('password')
    .not()
    .isEmpty()
    .isLength({ min: 10 })
    .withMessage('Password must contain at least 10 characters'),

  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if(user) {
        return res.status(404).send(`User with this email or name is already exists`)
      }

      //Initializing user to save database
      user = new User({
        name, 
        email,
        password
      })
      
      //Generating salt using bcrypt
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)

      await user.save()

      //Creating payload
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }

      //Implementing jsonwebtoken
      jwt.sign(
        payload, 
        config.get('JWT_SECRET'), 
        {expiresIn: config.get('TOKEN_EXPIRE')},
        function(err, token) {
          if(err) throw new Error()
          res.send({ token: token })
        }
        )
    }
    catch(err) {
      console.log(err)
      res.status(500).send(err)
    }
  })
  


module.exports = router