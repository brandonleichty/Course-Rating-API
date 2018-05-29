const auth = require('basic-auth');
const mongoose = require('mongoose');
const User = mongoose.model('User');

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
