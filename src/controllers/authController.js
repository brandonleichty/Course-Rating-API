const auth = require('basic-auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');


// gets credentials using basic-auth. If there are no credentials, an error is passed to the global error handler
exports.getCredentials = (req, res, next) => {
	const credentials = auth(req);

	console.log(credentials);

	if (!credentials || !credentials.name || !credentials.pass) {
		console.log('Credentials required.');
		const err = new Error('Credentials required.');
		// res.statusCode = 401;
		err.status = 401;
		return next(err);
	} else {
		console.log('Has credentials!');
		req.credentials = credentials;
		next();
	}
};

// If the user does indeed have credentials, compare them against the database.
// If their credentials don't match, send an error to the global error handler. Otherwise pass on to next middleware
exports.authenticateCredentials = (req, res, next) => {
	User.authenticate(req.credentials.name, req.credentials.pass, function(err, user) {
		if (err || !user) {
			const err = new Error('Wrong email or password');
			err.status = 401;
			return next(err);
		} else {
			return next();
		}
	});
};
