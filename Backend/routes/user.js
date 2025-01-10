const express = require("express");
const { register, login,getProfile ,addFav, removeFav, getProfileById,addFollowers,removeFollow} = require("../controllers/user");
const { get } = require("mongoose");
const authentication = require("../middleware/authentication");
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/",authentication,getProfile);
usersRouter.put("/fav",addFav);
usersRouter.put("/removeFav",removeFav);
usersRouter.put("/addFollowers",addFollowers);
usersRouter.put("/removeFollow",removeFollow);
usersRouter.get("/:id",getProfileById);



module.exports = usersRouter;
