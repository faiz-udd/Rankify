const { userService } = require('../services/index');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const createUser  = async (req,res) => {
    try {
        const user = {...req.body.user};
        // lets see if user is already there
        const dbUser = await userService.getUser(user.email);
        if(dbUser.user) {
            return res.status(403).json({"message":"user already exits"});
        }
        // encrypt the password before saving in db
        user.password = await bcrypt.hash(user.password,8);
        const newUser = await userService.createUser(user);
        if(newUser.error) {
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        // create and send token
        const token = jwt.sign({user:{email:user.email,name:user.name}},JWT_SECRET);
        return res.status(201).json(token);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController create user"});
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userService.getUser(email);
        if(user.error) {
           return res.status(404).json({"message":"user doesnt exists"});
        }
        // let compare both passwords;
        const isMatch = await bcrypt.compare(password,user.user.dataValues.password);
        if(isMatch) {
              // create and send token
          const token = jwt.sign({user:{email:user.email,name:user.name}},JWT_SECRET);
          return res.status(201).json(token);
        }
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
    getUserById,
    getAllUsers,
    login
}