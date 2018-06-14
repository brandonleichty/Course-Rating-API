const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Create your Mongoose schema and models. Your database schema should match the following requirements:
//
// Review
//  _id (ObjectId, auto-generated)
//  user (_id from the users collection)
//  postedOn (Date, defaults to “now”)
//  rating (Number, required, must fall between “1” and “5”)
//  review (String)

const reviewSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	postedOn: {
		type: Date,
		default: Date.now
	},
	rating: {
		type: Number,
		min: [1, 'Rating too low. Must be between 1 - 5.'],
		max: [5, 'Rating too high. Must be between 1 - 5.'],
		required: 'Must supply a review.'
	},
	review: {
		type: String
	}
});

module.exports = mongoose.model('Review', reviewSchema);
