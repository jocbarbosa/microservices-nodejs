const Sequelize = require('sequelize');
const dbSettings = require('./index');

const Course = require('../../models/Course');

const models = [Course];

const connection = new Sequelize(dbSettings);

models.map((model) => model.init(connection));

module.exports = connection;
