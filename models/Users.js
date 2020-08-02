const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    requried: true
  },
  passwordHash: String,
  transactionData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)