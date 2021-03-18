const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function(req, res, next) {
  let token = req.headers['auth-token']

  if(!token){
    res.status(400).send('Token does not exist or invalid')
  }

  try {
    const decoded = await jwt.verify(token, config.get('JWT_SECRET'))
    req.user = decoded.user
    next()
  }
  catch(err) {
    console.log(err)
    res.status(400).send('Invalid token')
  }

}