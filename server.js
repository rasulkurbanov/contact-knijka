const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')



app.use(express.json())

//Defining backend routes
app.get('/', (_, res) => {
  res.json('Welcome to contact keeper app')
})

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))





//Connect to MongoDB
connectDB()


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))