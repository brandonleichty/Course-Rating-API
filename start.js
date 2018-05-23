const mongoose = require('mongoose');
const seeder = require('mais-mongoose-seeder')(mongoose);
const data = require('./src/data/data.json');
// const seeder = require('mongoose-seeder');

// Import all of our models
require('./src/models/Course');
require('./src/models/User');
require('./src/models/Review');

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Set default database
const mongoDB = process.env.DATABASE || 'mongodb://localhost/CourseRatingAPI';

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

// Connect to default Mongo database
mongoose
	.connect(mongoDB)
	.then(() => {
		console.log('👍👍 Successfully connected to Mongo database! 👍👍');
		seeder
			.seed(data, {
				dropDatabase: true,
				dropCollections: false
			})
			.then(() => {
				// The database objects are stored in dbData
				console.log('Sample data successfully seeded! 🌻');
			})
			.catch(function(err) {
				// handle error
			});
	})
	.catch(function(err) {
		// handle error
	});

// See database using mongoose-seeder. dropDatabase is set to true by default.
const db = mongoose.connection;

// Start our app!
const app = require('./src/app');
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
