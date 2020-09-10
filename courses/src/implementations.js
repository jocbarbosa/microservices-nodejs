const Course = require('./models/Course');

async function getAllCourses({ request }, callback) {
  try {
    const courses = await Course.findAll();

    callback(null, { courses });
  } catch (error) {
    callback(error);
  }
}

async function getCourseById({ request }, callback) {
  try {
    const { id } = request;

    const course = await Course.findByPk(id);

    callback(null, { course });
  } catch (error) {
    callback(error);
  }
}

async function createCourse({ request }, callback) {
  try {
    const { name, description, price, is_active } = request;

    const course = await Course.create({
      name,
      description,
      price,
      is_active,
    });

    callback(null, { course });
  } catch (error) {
    callback(error);
  }
}

async function updateCourse({ request }, callback) {
  try {
    const { name, description, price, is_active } = request;

    const course = await Course.update(id, {
      name,
      description,
      price,
      is_active,
    });

    callback(null, { course });
  } catch (error) {
    callback(error);
  }
}

async function destroyCourse({ request }, callback) {
  try {
    const { id } = request;

    const course = await Course.findByPk(id);

    Course.destroy();

    callback(null, {});
  } catch (error) {
    callback(error);
  }
}

module.exports = {
  getCourseById,
  getAllCourses,
  createCourse,
  updateCourse,
  destroyCourse,
};
