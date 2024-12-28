const express = require("express");
const { createNewComment } = require("./../controllers/comment");

const {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require("../controllers/dreams");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const dreamsrouter = express.Router();

dreamsrouter.get("/", getAllArticles);
dreamsrouter.get("/", authentication, getAllArticles);
dreamsrouter.get("/search_1", getArticlesByAuthor);
dreamsrouter.get("/search_2/:id", getArticleById);
dreamsrouter.post("/",authentication,authorization("Create Dreams"),createNewArticle);
dreamsrouter.put("/:id", updateArticleById);
dreamsrouter.delete("/:id", deleteArticleById);
dreamsrouter.delete("/:id/author", deleteArticlesByAuthor);

dreamsrouter.post("/:id/comments",authentication,authorization("Create Comments"), createNewComment);

module.exports = dreamsrouter;
