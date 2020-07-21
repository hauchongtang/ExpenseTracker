const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log(`MongoDB connected!`)
  } catch (err) {
    console.log(`Error ${err.message}`.red)
    process.exit(1)
  }
}

module.exports = connectDB