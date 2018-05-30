const auth = require('basic-auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');


// Update any POST and PUT routes to return Mongoose validation errors.
//  Use the next function in each route to pass any Mongoose validation errors to Express’s global error handler
//  Send the Mongoose validation error with a 400 status code to the user


//  GET /api/users 200 - Returns the currently authenticated user
exports.getCurrentUser = (req, res, next) => {
	User.findOne({ emailAddress: req.credentials.name })
		.select('fullName')
		.exec((err, user) => {
			if (err) return next(err);
			console.log(user.fullName);
			res.status(200).json({ data: user.fullName });
		});
};

//  POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
exports.newUser = (req, res, next) => {
	User.create(req.body, (err, user) => {
		if (err) {
			console.log(`Oops! There was an error: ${err.message}`);
			return next(err);
		} else {
			console.log(`Successfully created a new user profile for ${req.body.fullName}.`);
			res
				.status(201)
				.location('/')
				.end();
		}
	});
};
