const express = require('express')
const router = express.Router()


//@route POST api/auth
//@desc  Register a user
//@access Public
router.post('/', (req, res) => {
  res.send('Register a user')
})


//@route GET api/auth
//@desc Get logged user
//access Private
router.get('/', (req, res) => {
  res.send('Get logged user')
})

module.exports = router




