const express = require("express");
const { register, login,getProfile } = require("../controllers/user");
const { get } = require("mongoose");
const authentication = require("../middleware/authentication");
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/",authentication,getProfile);


module.exports = usersRouter;
