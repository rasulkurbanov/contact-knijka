const config = require('config')
const mongoose = require('mongoose')
const dbURI = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useFindAndModify: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    console.log(`Successfully connected to mongoDB`)
  }
  catch(err) {
    console.log(err)
  }
}


module.exports = connectDB




