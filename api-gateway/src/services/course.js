const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

const courseRef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'config', 'proto', 'course.proto'),
  loaderConfig
);

const course = grpc.loadPackageDefinition(courseRef);

module.exports = new course.CourseService(
  '0.0.0.0:3333',
  grpc.credentials.createInsecure()
);
