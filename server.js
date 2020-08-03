const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
require('colors')
require('morgan')
require('cors')
const connectDB = require('./config/db')
const users = require('./routes/users')
const login = require('./controllers/login')

dotenv.config({ path: './config/config.env' })

connectDB()

const transactions = require('./routes/transactions')

const app = express()

app.use(express.json())

// Use Routes
app.use('/api/v1/transactions', transactions)
app.use('/api/v1/users', users)
app.use('/api/login', login)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`.yellow))