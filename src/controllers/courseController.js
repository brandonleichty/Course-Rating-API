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
  Course.create(req.body), (err, user)=> {
    if (err) return next(err);
	};
	console.log('CREATED A NEW COURSE! 💩');
  res.status(201).location('/').end();
};