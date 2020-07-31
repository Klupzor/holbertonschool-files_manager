const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');

const router = express.Router();

router.get('/status', (req, res) => {
  res.send(AppController.getStatus());
});

router.get('/stats', async (req, res) => {
  res.send(await AppController.getStats());
});

router.post('/users', async (req, res) => {
  try {
    const newUser = await UserController.postNew(req.body);
    res.status(201).send({
      id: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;
