const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const tokenMiddelware = require('../utils/token');

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

router.get('/connect', async (req, res) => {
  const credentials = req.header('Authorization');

  if (!credentials) {
    res.status(400).send({
      error: 'No authorization header',
    });
  }
  const buff = Buffer.from(credentials.split(' ')[1], 'base64');
  const [email, password] = buff.toString('utf8').split(':');
  try {
    const token = await AuthController.getConnect(email, password);
    res.send(token);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get('/disconnect', tokenMiddelware, async (req, res) => {
  try {
    await AuthController.getDisconnect(req.token);
    res.status(204).send({ status: true });
  } catch (error) {
    res.status(401).send({
      error: error.message,
    });
  }
});

router.get('/users/me', tokenMiddelware, async (req, res) => {
  try {
    const user = await UserController.getMe(req.userId);
    res.send(user);
  } catch (error) {
    res.status(401).send({
      error: error.message,
    });
  }
});

module.exports = router;
