"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { userService } = require('../services/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body.user);
        // lets see if user is already there
        const dbUser = yield userService.getUser(user.email);
        if (dbUser.user) {
            return res.status(403).json({ "message": "user already exits" });
        }
        // encrypt the password before saving in db
        user.password = yield bcrypt.hash(user.password, 8);
        const newUser = yield userService.createUser(user);
        if (newUser.error) {
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        // create and send token
        const token = jwt.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);
        return res.status(201).json(token);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController create user" });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userService.getUser(email);
        if (user.error) {
            return res.status(404).json({ "message": "user doesnt exists" });
        }
        // let compare both passwords;
        const isMatch = yield bcrypt.compare(password, user.user.dataValues.password);
        if (isMatch) {
            // create and send token
            const token = jwt.sign({ user: { email: user.email, name: user.name } }, JWT_SECRET);
            return res.status(201).json(token);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in userController login user" });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUser(req.params.email);
        if (!user) {
            return res.status(404).send({ "user": user, "message": "user not found" });
        }
        if (user.error) {
            return res.status(user.error.code).send(user.error.message);
        }
        return res.send({ "user": user, "message": "user found sucess" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in UserController findByID" });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getAllUsers();
        return res.status(200).send({ "user": user, "message": "found all" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "something went wrong in UserController findAll" });
    }
});
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    login
};
