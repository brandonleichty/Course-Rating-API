const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
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
  emailAddress: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid email address.'],
      required: 'Please supply an email address'
  },
  password: {
      type: String,
      required: 'Please enter a password.'
  },
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);
