const { promisify } = require('util');
const express = require('express');
const OrderService = require('../services/orders');
const CourseService = require('../services/course');

const routes = express.Router();

routes.get('/', async (request, response) => {
  const { user_id } = request.query;

  try {
    const ordersResponse = await new Promise((resolve, reject) => {
      OrderService.listOrders(
        {
          user_id,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    return response.json(ordersResponse);
  } catch (error) {
    return response.status(400).json(error);
  }
});

routes.post('/', async (request, response) => {
  const { course_id } = request.body;
  const { user_id } = request.query;

  try {
    const resCourse = await new Promise((resolve, reject) => {
      CourseService.getCourseById({ id: course_id }, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });

    const { course } = resCourse;

    if (!course) {
      throw new Error('Course not found');
    }

    const resOrder = await new Promise((resolve, reject) => {
      OrderService.createOrder(
        {
          user_id,
          course_id,
          price: course.price,
        },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    return response.json(resOrder);
  } catch (error) {
    const { message } = error;
    return response.status(400).json({ message });
  }
});

routes.patch('/:order_id/cancel', async (request, response) => {
  const { order_id } = request.params;

  try {
    const resOrder = await new Promise((resolve, reject) => {
      OrderService.cancelOrder({ id: order_id }, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });

    return response.json(resOrder);
  } catch (error) {
    const { message } = error;
    return response.status(400).json({ message });
  }
});

module.exports = routes;
