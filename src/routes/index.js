const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");


// Create the user routes
//  Set up the following routes (listed in the format HTTP VERB Route HTTP Status Code):
//  GET /api/users 200 - Returns the currently authenticated user
//  POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content

    router.get('/api/users',
        authController.getCredentials,
        authController.authenticateCredentials,
        userController.getCurrentUser);

    router.post('/api/users', userController.newUser);


// Create the course routes
//  Set up the following routes (listed in the format HTTP VERB Route HTTP Status Code):
//  GET /api/courses 200 - Returns the Course "_id" and "title" properties
//  GET /api/course/:courseId 200 - Returns all Course properties and related documents for the provided course ID
//  When returning a single course for the GET /api/courses/:courseId route, use Mongoose population to load the related user and reviews documents.
//  POST /api/courses 201 - Creates a course, sets the Location header, and returns no content
//  PUT /api/courses/:courseId 204 - Updates a course and returns no content
//  POST /api/courses/:courseId/reviews 201 - Creates a review for the specified course ID, sets the Location header to the related course, and returns no content

    router.get('/api/courses', courseController.getAllCoures);

    router.get('/api/courses/:courseId', courseController.getCourse);

    router.post('/api/courses',
        authController.getCredentials,
        authController.authenticateCredentials,
        courseController.newCourse
    );

    router.put('/api/courses/:courseId',
        authController.getCredentials,
        authController.authenticateCredentials,
        courseController.updateCourse
    );

    router.post('/api/courses/:courseId/reviews',
        authController.getCredentials,
        authController.authenticateCredentials,
        courseController.newCourseReview
    );



// Update any POST and PUT routes to return Mongoose validation errors.
//  Use the next function in each route to pass any Mongoose validation errors to Express’s global error handler
//  Send the Mongoose validation error with a 400 status code to the user


// Update the User model to store the user's password as a hashed value.
//  For security reasons, we don't want to store the password property in the database as clear text.
//  Create a pre save hook on the user schema that uses the bcrypt npm package to hash the user's password.
//  See https://github.com/ncb000gt/node.bcrypt.js/ for more information.


// Create an authentication method on the user model to return the user document based on their credentials
//  Create a static method on the user schema that takes an email, password, and callback
//  The method should attempt to get the user from the database that matches the email address given.
//  If a user was found for the provided email address, then check that user's password against the password given using bcrypt.
//  If they match, then return the user document that matched the email address
//  If they don't match or a user with the email given isn’t found, then pass an error object to the callback


// Set up permissions to require users to be signed in
//  Postman will set an Authorization header with each request when a user is signed in.
//  Add a middleware function that attempts to get the user credentials from Authorization header set on the request.
//  You can use the basic-auth npm package to parse the `Authorization' header into the user's credentials.
//  Use the authenticate static method you built on the user schema to check the credentials against the database
//  If the authenticate method returns the user, then set the user document on the request so that each following middleware function has access to it.
//  If the authenticate method returns an error, then pass it to the next function
//  Use this middleware in the following routes:
//    POST /api/courses
//    PUT /api/courses/:courseId
//    GET /api/users
//    POST /api/courses/:courseId/reviews



module.exports = router;