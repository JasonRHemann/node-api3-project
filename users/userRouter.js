const express = require("express");
const userDb = require("./userDb");
const router = express.Router();

//Post to '/api/users'
router.post("/", validateUser, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding user"
      });
    });
});

//Post to 'api/users' for a specific ID must pass Validation
router.post("/:id/posts", validateUserId, (req, res) => {
  userDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not add post for user"
      });
    });
});

// Get users from '/api/users'
router.get("/", validateUserId, (req, res) => {
  userDb
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting users"
      });
    });
});

// Get user by id from '/api/users' validate
router.get("/:id", validateUserId, (req, res) => {
  userDb
    .getById()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error finding user"
      });
    });
});

// Get all posts for specific user by id \\validate
router.get("/:id/posts", validateUserId, (req, res) => {
  userDb
    .getUserPosts(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error getting users post"
      });
    });
});

// Delete user by id
router.delete("/:id", (req, res) => {
  userDb
    .remove(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error deleting user"
      });
    });
});

// Edit user by id
router.put("/:id", validateUserId, (req, res) => {
  userDb
    .update(req.user.id, req.user.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating user"
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id).then(user => {
    user
      ? res.status(200).json({ message: "User ID is valid" })
      : res.status(400).json({ message: "Invalid user ID" });
  });
}

function validateUser(req, res, next) {
  req.body
    ? res.status(200).json({ message: "User is valid" })
    : res.status(400).json({
        message: "Invalid User"
      });
}

function validatePost(req, res, next) {
  req.body
    ? res.status(200).json({ message: "Post is valid" })
    : res.status(400).json({ message: "Invalid post" });
}

module.exports = router;
