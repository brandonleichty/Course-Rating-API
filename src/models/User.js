const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    } else {
      // overwrite plaintext password with hashed password
      user.password = hash;
      next();
    }
  })
});


module.exports = mongoose.model('User', userSchema);
