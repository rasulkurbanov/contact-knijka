const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')


//@route GET api/auth
//@desc Get logged user
//access Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password')
    res.status(200).send(user)
  }
  catch(err){
    res.status(400).send('Invalid token')
  }
})


//@route POST api/auth
//@desc  Register a user
//@access Public
router.post('/',
  check('email').isEmail(),
  check('password').exists(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) return res.status(400).send('Invalid credentials')

      const isMatch = await bcrypt.compare(password, user.password)

      if(isMatch === false) return res.status(400).send('Invalid password or email')

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
        { expiresIn: config.get('TOKEN_EXPIRE') },
        function (err, token) {
          if (err) throw new Error()
          res.send({ token: token })
        }
      )
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message })
    }
  })



module.exports = router




