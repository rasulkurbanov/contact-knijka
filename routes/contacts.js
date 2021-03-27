const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact')


//@route GET api/contacts
//@desc  Get an authenticated user contacts
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const result = await Contact.find({ user: req.user.id }).sort('-1')
    res.status(200).send(result)
  }
  catch(err) {
    res.status(400).send(err.message)
  }
})



//@route POST api/contacts
//@desc  Create an authenticated user contact
//@access Private
router.post('/', auth,
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
  check('phone')
    .not()
    .isEmpty()
    .isLength({ max: 30 })
    .withMessage('Phone number no more than 30 chars'),
  async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, name, phone, type } = req.body

    try { 
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      })

      const savedContact = await newContact.save()
      res.status(200).send(savedContact)
    }
    catch(err) {
      res.status(400).send(err.message)
    }
})

//@route PUT api/contacts/:id
//@desc  UPDATE an authenticated user contact
//@access Private
router.put('/:id', (req, res) => {
  res.send('Update logged user saved contacts')
})

//@route DELETE api/contacts/:id
//@desc  Delete an authenticated user contacts
//@access Private
router.delete('/', (req, res) => {
  res.send('Delete logged user saved contacts')
})

module.exports = router