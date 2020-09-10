const { promisify } = require('util');
const express = require('express');
const CourseService = require('../services/course');

const routes = express.Router();

routes.get('/', async (request, response) => {
  try {
    const resCourse = await new Promise((resolve, reject) => {
      CourseService.getAllCourses({}, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });

    return response.json(resCourse);
  } catch (error) {
    return response.status(400).json(error);
  }
});

routes.post('/', async (request, response) => {
  const { name, description, price, is_active } = request.body;

  console.log(name, description, price, is_active)

  try {
    const resCourse = await new Promise((resolve, reject) => {
      CourseService.createCourse(
        { name, description, price, is_active },
        (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });

    return response.json(resCourse);
  } catch (error) {
    return response.status(400).json(error);
  }
});

module.exports = routes;
