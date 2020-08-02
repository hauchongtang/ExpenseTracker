const Transaction = require('../models/Transaction')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')

// GET token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public 
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({}).populate('users')
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(value => value.message)
      return res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error!'
      })
    }
  }
}

// @desc Post transaction
// @route POST /api/v1/transactions
// @access Public 
exports.addTransaction = async (req, res, next) => {
  try {
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const transaction = new Transaction({
      text: body.text,
      amount: body.amount,
      users: user._id
    })
    const savedTransaction = await transaction.save()
    user.transactionData = user.transactionData.concat(savedTransaction._id)
    await user.save()

    return res.status(201).json({
      success: true,
      data: savedTransaction
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error!'
    })
  }

}

// @desc Delete transaction
// @route DELETE /api/v1/transactions
// @access Public 
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json(
        {
          success: false,
          error: 'No transactions found!'
        }
      )
    }
    await transaction.remove()

    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error!'
    })
  }
}