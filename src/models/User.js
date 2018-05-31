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

const UserSchema = new Schema({
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
	}
});

UserSchema.plugin(uniqueValidator);

// authenticate input against database documents
UserSchema.statics.authenticate = function(emailAddress, password, callback) {
	User.findOne({ emailAddress: emailAddress }).exec(function(error, user) {
		if (error) {
			return callback(error);
		} else if (!user) {

			const err = new Error('User not found');
			err.status = 401;
			return callback(err);
		} else {


			bcrypt.compare(password, user.password, function(error, result) {
				if (result === true) {
					return callback(null, user);
				} else {
					return callback();
				}
			});
		}
	});
};

UserSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		} else {
			// overwrite plaintext password with hashed password
			user.password = hash;
			next();
		}
	});
});


const User = mongoose.model('User', UserSchema);


module.exports = mongoose.model('User', UserSchema);
