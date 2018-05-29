const auth = require('basic-auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');

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
	User.create(req.body),
		(err, user) => {
			if (err) return next(err);
		};
	res
		.status(201)
		.location('/')
		.end();
};
