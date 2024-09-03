PostAway is a scalable backend API designed for social media application
This project demonstrates the use of modern backend technologies, with a focus on security, performance, and maintainability.

Link for testing through postman:https://api.postman.com/collections/34489742-559ebb44-cc83-44de-8426-88650399da6a?access_key=PMAT-01J6VV16ZR70CTEYXG67RRPR1N

Features:
RESTful API: CRUD operations on resources.
Authentication & Authorization: Secure authentication using JWT and role-based access control.
Data Persistence: MongoDB integration with Mongoose for effective data modeling and validation.
Error Handling: Comprehensive error management for smooth user experience.
Error and Req logging:Logging errors and requests using Winston logger 
Multer:saving files using multer middleware

Tech Stack:
Node.js: JavaScript runtime for building the API,
Express.js: Web framework for Node.js,
MongoDB: NoSQL database for data storage,
Mongoose: ODM for MongoDB to create and manage models,
JWT: For secure authentication,
Bcrypt.js: For password hashing
Postman:For api testing

Routes:

USER- signup,signin,logoutCurrentDevice,logoutAllDevice,getAllUsers,updateUserDetails

OTP:sendOTP through mail, verify otp, reset password

POST:create post, get all posts by a user, get all posts, get post by its id,delete a post, update a post


