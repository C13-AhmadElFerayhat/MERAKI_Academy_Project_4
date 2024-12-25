const commentsModel = require("../models/comments");
const dreamsModels = require("../models/Dreams");

const createNewComment = (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentsModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      dreamsModels
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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
  createNewComment,
};
