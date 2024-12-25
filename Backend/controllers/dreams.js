const articlesModel = require("../models/Dreams");


const getAllArticles = (req, res) => {
  const userId = req.token.userId;
  articlesModel
    .find()
    .populate("comments")
    .exec()
    .then((articles) => {
      if (articles.length) {
        res.status(200).json({
          success: true,
          message: `All the articles`,
          userId: userId,
          articles: articles,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Articles Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const getArticlesByAuthor = (req, res) => {
  let authorId = req.query.author;

  articlesModel
    .find({ author: authorId })
    .then((articles) => {
      if (!articles.length) {
        return res.status(404).json({
          success: false,
          message: `The author: ${authorId} has no articles`,
        });
      }
      res.status(200).json({
        success: true,
        message: `All the articles for the author: ${authorId}`,
        articles: articles,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getArticleById = (req, res) => {
  let id = req.params.id;
  articlesModel
    .findById(id)
    .populate("author", "firstName -_id")
    .exec()
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The article ${id} `,
        article: article,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const createNewArticle = (req, res) => {
  const { title, description } = req.body;
  const author = req.token.userId;
  const newArticle = new articlesModel({
    title,
    description,
    author,
  });

  newArticle
    .save()
    .then((article) => {
      res.status(201).json({
        success: true,
        message: `Article created`,
        article: article,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const updateArticleById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  articlesModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newArticle) => {
      if (!newArticle) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Article updated`,
        article: newArticle,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const deleteArticleById = (req, res) => {
  const id = req.params.id;
  articlesModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Article deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


const deleteArticlesByAuthor = (req, res) => {
  const author = req.params.id;
  articlesModel
    .deleteMany({ author })
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          success: false,
          message: `The Author not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Deleted articles for the author: ${author}`,
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createNewArticle,
  updateArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
