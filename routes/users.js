const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/Users')

// POST user to /api/v1/users
router.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json({
      success: true,
      data: savedUser
    })
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error.message
    })
  }
})

// GET users from /api/v1/users
router.get('/', async (req, res) => {
  try {
    const usersData = await User.find({}).populate('transactionData')
    res.status(200).json({
      success: true,
      data: usersData
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router