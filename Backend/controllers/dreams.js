const dreamModel = require("../models/Dreams");


const getAllArticles = (req, res) => {
  dreamModel
    .find()
    .populate("author", "comments")
    .exec()
    .then((articles) => {
      console.log(articles);
      if (articles.length) {
        res.status(200).json({
          success: true,
          message: `All the Dreams`,         
          articles: articles,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Dreams Yet`,
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

  dreamModel
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
  console.log(id);
  
  dreamModel
    .findById(id)
    .populate("author")
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
  const { title, description,tags,mood,isLucid,img,visibility } = req.body;
  const author = req.token.userId;
  const newArticle = new dreamModel({
    title,
    description,
    tags,
    author,
    mood,
    visibility,
    isLucid,
    img
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
  dreamModel
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
  dreamModel
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
  dreamModel
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
