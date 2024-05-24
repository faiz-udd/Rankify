"use strict"; //strict mode of javascript 

/**
 * In this module we have the following functions which can be imported using require and used.
 * createUser(): To create a new User when someone sign up in the website
 * Login(): Login the User, to the website if all the credentials are met
 * getUserById(): Function which gets user from the db upon request using email
 * getAllUsers(): Function used to fetch all the users from the db
 */ 

// Declare a variable __awaiter and assign it a function. 
// The function is either the existing __awaiter function (if defined) or a new function defined here.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {

    // Define a helper function named adopt to convert a value into a promise if it isn't already one.
    function adopt(value){
        // Check if the value is an instance of P (usually Promise).
        // If it is, return the value as is. Otherwise, create a new Promise that resolves with the given value.
         return value instanceof P ? value : new P(function (resolve) 
         { resolve(value); 

         });
     }
     // Return a new promise created by the P constructor (usually Promise).
    return new (P || (P = Promise))(function (resolve, reject) {
        //Define a case to handle if the promise is fullfilled
        function fulfilled(value) {
             try { 
                 // Call the next method of the generator with the fulfilled value.
                // This resumes the generator function and passes the value back to it.
                step(generator.next(value)); 
            } catch (e) { reject(e);

             }
        }
        //Function to  handle if the case is rejected.
        function rejected(value){
             try{
                // Call the throw method of the generator with the rejected value.
                // This resumes the generator function in an exceptional state.
                step(generator["throw"](value));
             }catch (e)
             { 
                reject(e); 
            } 
        }
         // Define a function to process each step of the generator.
        function step(result) 
        { 
            // If the generator is done (no more yields), resolve the promise with the final value.
            // If the generator is not done, convert the result value to a promise (using adopt).
                // Once the promise is fulfilled, call the fulfilled function.
                // If the promise is rejected, call the rejected function.
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); 

        }
         // Initialize the generator by applying the provided arguments and context (thisArg).
        // Call the next method to start the generator function and get the initial result.
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Define a property on the exports object to mark this module as ES6 module.
Object.defineProperty(exports, "__esModule", { value: true });
const { userService } = require('../services/index'); // Import the userService from the services/index module.
const bcrypt = require('bcrypt'); // Import the bcrypt library for hashing passwords.

//JWT (JSON Web Token) is an open industry standard (RFC 7519) that defines a compact and secure way to securely transmit
// information between parties as a JSON object.
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating JWT tokens.

const JWT_SECRET = process.env.JWT_SECRET; // Get the JWT secret key from environment variables.

// Define an asynchronous function named createUser, which handles user creation
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
         // Create a copy of the user object from the request body.
        const user = Object.assign({}, req.body.user);
        // lets see if user is already there
        const dbUser = yield userService.getUser(user.email);  // Check if the user already exists in the database using their email.
        if (dbUser.user) {
             // If the user already exists, send a 403 Forbidden response with an appropriate message.
            return res.status(403).json({ "message": "user already exits" }); //If user exits show the Message
        }
        // encrypt the password before saving in db
        user.password = yield bcrypt.hash(user.password, 8);   // Encrypt the user's password using bcrypt with a salt rounds of 8.
        const newUser = yield userService.createUser(user);  // Save the new user in the database.

        if (newUser.error) {  // If there is an error while saving the user, send the error response.
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        // create and send token
        // Create a JWT token for the new user, containing their email and name, signed with the secret key.
        const token = jwt.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);
         // Send the token in the response with a 201 Created status.
        return res.status(201).json(token);
    }
    catch (err) {
        // Log any errors that occur to the console.
        console.log(err);
        // Send a 500 Internal Server Error response if something goes wrong.
        return res.status(500).send({ "message": "something went wrong in userController create user" });
    }
});

// Define an asynchronous function named login, which handles user login requests.
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        
        const { email, password } = req.body; // Destructure email and password from the request body.
        const user = yield userService.getUser(email); // Fetch the user from the database using the provided email.
         // If the user does not exist, send a 404 Not Found response with an appropriate message.
        if (user.error) {
            return res.status(404).json({ "message": "user doesnt exists" });
        }
        // let compare both passwords;
        const isMatch = yield bcrypt.compare(password, user.user.dataValues.password); // Compare the provided password with the stored password hash.
        if (isMatch) {
            // create and send token
            const token = jwt.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);// If the passwords match, create a JWT token and send it in the response.
            // Send the token in the response with a 201 Created status.
            return res.status(201).json(token);
        }
    }
    // If passwords do not match, send a 401 Unauthorized response.
    catch (err) { 
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController login user" });
    }
});

// Define an asynchronous function named getUserById, which handles requests to get a user by their email.
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user from the database using the email provided in the request parameters.
        const user = yield userService.getUser(req.params.email);
         // If the user does not exist, send a 404 Not Found response with an appropriate message.
        if (!user) {
            return res.status(404).send({ "user": user, "message": "user not found" });
        }
           // If there is an error with the user retrieval, send the error response.
        if (user.error) {
            return res.status(user.error.code).send(user.error.message);
        }
         // If the user is found and there are no errors, send the user data in the response with a success message.
        return res.send({ "user": user, "message": "user found sucess" });
    }
    catch (err) {
        console.log(err); //log the error in the console
        // Send a 500 Internal Server Error response if something goes wrong.
        return res.status(500).send({ "message": "something went wrong in UserController findByID" });
    }
});

// Define an asynchronous function named getUserById, which handles requests to get a user by their email.
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user from the database using the email provided in the request parameters.
        const user = yield userService.getAllUsers();
        //the user exists, send 200 Found Response with the "Found all" Message
        return res.status(200).send({ "user": user, "message": "found all" });
    }
    catch (err) {
        console.log(err);
       // the user does not exist, send a 404 Not Found response with an appropriate message.
        return res.status(500).send({ "message": "something went wrong in UserController findAll" });
    }
});
//Export the module so they can be used in other files
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    login
};
