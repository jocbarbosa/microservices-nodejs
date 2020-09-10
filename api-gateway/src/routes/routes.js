const express = require('express');
const AuthService = require('../services/auth');

const ordersRoutes = require('./orders.routes');
const coursesRoutes = require('./courses.routes');

const routes = express.Router();

// check urls

routes.post('/login', async (request, res) => {
  const { email, password } = request.body;

  try {
    const response = await new Promise((resolve, reject) => {
      AuthService.authenticate(
        {
          email,
          password,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    return res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
});

routes.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const response = await new Promise((resolve, reject) => {
    AuthService.register(
      {
        name,
        email,
        password,
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }
    );
  });

  return res.json(response);
});

routes.use('/orders', ordersRoutes);
routes.use('/courses', coursesRoutes);

module.exports = routes;
