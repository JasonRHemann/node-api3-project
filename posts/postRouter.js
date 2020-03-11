const express = require("express");
const postDb = require("./postDb");
const router = express.Router();

//Get from '/api/posts'
router.get("/", (req, res) => {
   postDb.get() 
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error trying to get post",
        err
      });
    });
});

//Get from '/api/posts/:id' for specific ID must pass ValidatePostID
router.get("/:id", validatePostID, (req, res) => {
  postDb.getById(req.params.id).then(post => {
    post
      ? res.status(200).json(req.post)
      : res.status(404).json({ message: "No posts for this ID" });
  });
});

//Delete from 'api/posts/:id for specific ID must pass ValidatePostID
router.delete("/:id", (req, res) => {
  postDb.remove(req.params.id).then(post => {
    post
      ? res.status(200).json({ message: "This post has been destroyed" })
      : res.status(400).json({
          message: "This post doesn't exist or cannot be removed"
        });
  });
});

//Updates from 'api/posts/:id for specific ID must pass ValidatePostID
router.put("/:id", validatePostID, (req, res) => {
  postDb.update(req.params.id).then(post => {
    post
      ? res.status(200).json(post)
      : res
          .status(404)
          .json({ message: "The post with this ID could not be found" });
  });
});

//ValidatePostId custom middleware
function validatePostID(req, res, next) {
  postDb.getById(req.params.id).then(post => {
    post
      ? res.status(200).json({ message: "post ID is valid" })
      : res.status(400).json({ message: "post ID is invalid" });
  });
  next();
}

module.exports = router;
