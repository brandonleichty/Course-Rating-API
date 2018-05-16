const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Create your Mongoose schema and models. Your database schema should match the following requirements:
//
// Course
//  _id (ObjectId, auto-generated)
//  user (_id from the users collection)
//  title (String, required)
//  description (String, required)
//  estimatedTime (String)
//  materialsNeeded (String)
//  steps (Array of objects that include stepNumber (Number), title (String, required) and description (String, required) properties)
//  reviews (Array of ObjectId values, _id values from the reviews collection)