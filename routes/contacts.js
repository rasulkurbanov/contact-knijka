const express = require('express')
const router = express.Router()


//@route GET api/contacts
//@desc  Get an authenticated user contacts
//@access Private
router.get('/', (req, res) => {
  res.send('Get logged user saved contacts')
})


//@route POST api/contacts
//@desc  Create an authenticated user contact
//@access Private
router.post('/', (req, res) => {
  res.send('Create user new contact')
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