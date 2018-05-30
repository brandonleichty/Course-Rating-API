const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Review = mongoose.model('Review');

// GET /api/courses 200 - Returns the Course "_id" and "title" properties
exports.getAllCoures = (req, res, next) => {
	Course.find({})
		.select('_id, title')
		.exec((err, allCourses) => {
			if (err) return next(err);
			res.status(200);
			res.json({ coures: allCourses });
		});
};



//  GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID
exports.getCourse = (req, res, next) => {
	Course.findById({ _id: req.params.courseId })
		.populate({
			path: 'user',
			model: 'User'
		})
		.populate({
			path: 'reviews',
			model: 'Review',
			populate: {
				path: 'user',
				model: 'User'
			}
		})
		.exec((err, course) => {
			if (err) return next(err);
			res.status(200);
			res.json({ course: course });
		});
};



//  POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
exports.newCourse = (req, res, next) => {
	Course.create(req.body, (err, course) => {
		if (err) {
			console.log(`Oops! There was an error: ${err.message}`);
			return next(err);
		} else {
			console.log('CREATED A NEW COURSE! 💩');
			res
				.status(201)
				.location('/coures/' + course._id)
				.end();
		}
	});
};



//  PUT /api/courses/:courseId 204 - Updates a course and returns no content
exports.updateCourse = (req, res, next) => {
	// if the updated course has an _id field, remove it before making the updates. A Mongo _id is immutable - so you'll get an error if you try to udpate it
	if(req.body._id) {
		console.log(req.body._id);
		delete req.body._id;
	}
	// Update the course and throw an error if one occurs
	Course.update({ _id: req.params.courseId }, req.body, (err) => {
			if (err) {
				console.log(`Oops! There was an error: ${err.message}`);
				return next(err);
			} else {
				res.status(204).end();
			}
		}
	);
};
