const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create your Mongoose schema and models. Your database schema should match the following requirements:
//
// Review
//  _id (ObjectId, auto-generated)
//  user (_id from the users collection)
//  postedOn (Date, defaults to “now”)
//  rating (Number, required, must fall between “1” and “5”)
//  review (String)
