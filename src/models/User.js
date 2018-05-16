const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create your Mongoose schema and models. Your database schema should match the following requirements:

// User
//  _id (ObjectId, auto-generated)
//  fullName (String, required)
//  emailAddress (String, required, must be unique and in correct format)
//  password (String, required)


const userSchema = new Schema({
  fullName: {
    type: String,
    required: 'Please supply a full name.',
    trim: true
  },
  email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid email address.'],
      require: 'Please supply an email address'
  },
  password: {
      type: String,
      require: 'Please enter a password.'
  },
});