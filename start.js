const mongoose = require('mongoose');
const seeder = require('mongoose-seeder');
const seedData = require('./data/data.json');

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Set default database
const mongoDB = 'mongodb://localhost/CourseRatingAPI';

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;

// Connect to default Mongo database
mongoose.connect(mongoDB).then(
	() => {
		console.log('👍👍 Successfully connected to Mongo database! 👍👍');
	},
	err => {
		console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
	}
);

// See database using mongoose-seeder. "dropDatabase" is set to true by default.
const db = mongoose.connection;

db.once('open', () => {
	seeder.seed(seedData).then(() => {
    console.log('Successfully seeded sample data! 🌻');
  }).catch((err) => {
		console.log(err);
	});
});

// Start our app!
const app = require('./src/app');
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
