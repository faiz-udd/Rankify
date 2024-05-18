const { userService, } = require('../services/index');
const { createFacultyIfNotExists } = require('./faculty');
const { createDepartmentIfNotExists } = require('./department');


const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const generateRandomCode = require('../utils/generateCode');

// import sendVerificationCode from '../authentications/emailService';

const JWT_SECRET = process.env.JWT_SECRET;

const verifyCode  = async (req, res) => {
    try {
         const userToken = {
            userId: req.body.email,
            token: req.body.token
         };
         console.log(userToken);

         const token = await Token.findByPk(userToken.userId);
         if(!token) {
             return res.status(404).send({"message":"token not found"});
         }
         // now we have found the token so we can make user verified.
         const updatedUser = await userService.updateUser({isVerified: true},userToken.userId);
         if(updatedUser.error) {
            return res.status(500).send({"message": "something went wrong in userController verifyCode", "error": updatedUser})
         }
       return res.status(200).send({"message":"success"});

    }  catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController create user"});
    }
}

const sendCode = async (req, res) => {
    try {
       const user = {
         userId: req.body.email,
         userPass: req.body.password,
         token: generateRandomCode()
       };
    console.log("Token User = ", user);
       const resp = await Token.create(user);
    //    const sendToken = await sendVerificationCode(user.email);
    //    if(sendToken.error) {
    //        return res.status(500).send({"message":"something went wrong in userController sendCode"});
    //    }
       console.log(user);
       return res.status(200).send("Verification Code sent successfully, please check your email address");

    }  catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController create user"});
    }
}

const createUser  = async (req,res) => {
    try {
        const user = {...req.body};
        console.log(req.body);
        console.log(user);
        // lets see if user is already there 
        const dbUser = await userService.getUser(user.email);
        if(dbUser.user) {
            return res.status(403).json({"message":"user already exits"});
        }
        // user also has department and faculty propriates
        // so we need to check if those faculties exists in db or not else create them.
        const getFaculty = await createFacultyIfNotExists(user.faculty);
        let facultyId;
        if(getFaculty.faculty) {
              facultyId = getFaculty.faculty
        }
        else {
             return res.status(500).send({"message":"something went wrong in userController create user"});
        }
        // now check for dept
        const getDepartment = await createDepartmentIfNotExists(user.department,facultyId);
        let departmentId;
        if(getDepartment.department) {
            departmentId = getDepartment.department
        }
        else {
            return res.status(500).send({"message":"something went wrong in userController create user"});
        }
        // now we have faculty id and department id to create user
        // encrypt the password before saving in db
        user.password = await bcrypt.hash(user.password,8);
        user.DepartmentId = departmentId;

        const newUser = await userService.createUser(user);
        if(newUser.error) {
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        // send email to user with code..
         return await sendCode(req,res);
        
        // cant send token becuase verification is not completed yet
        return res.status(201).json({success: true});

        // const token = jwt.sign({user:{email:user.email,name:user.name}},JWT_SECRET!);
        // return res.status(201).json(token);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController create user"});
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userService.getUser(email);
        if(!user || !user.user) {
           return res.status(404).json({"message":"user doesnt exists"});
        }
        // now if user exists then check if he is verified (provided the code)
        if(user.user.dataValues.isVerified == false) { 
            
           return res.status(403).json({"message":"Account is not Verified, please check your email for verification code"});
        }
        // let compare both passwords;
        const isMatch = await bcrypt.compare(password,user.user.dataValues.password);
        if(isMatch || password == user.user.dataValues.password) {
              // create and send token
          const token = jwt.sign({
            user:{
                email:user.user.dataValues.email,
                name:user.user.dataValues.name
            }},JWT_SECRET);
          console.log(token);
          return res.status(201).send({"token": token});
        }
        // password did not matched
        return res.status(401).send({"message": "password did not match"});
    }  catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController login user"});
    }

}

const getUserById = async(req,res) => {
    try {
      const user = await userService.getUser(req.params.email);
      if(!user) {
        return res.status(404).send({"user":user,"message":"user not found"});
      }
      if(user.error) {
         return res.status(user.error.code).send(user.error.message);
      }
      return res.send({"user":user,"message":"user found sucess"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in UserController findByID"});
    }
}

const getAllUsers = async(req,res) => {
    try {
      const user = await userService.getAllUsers();
      return res.status(200).send({"user":user,"message":"found all"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in UserController findAll"});
    }
}


module.exports = { 
    createUser,
    getAllUsers,
    getUserById,
    login,
    verifyCode
}
