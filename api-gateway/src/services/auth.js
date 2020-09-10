const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

const authRef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'config', 'proto', 'auth.proto'),
  loaderConfig
);

const auth = grpc.loadPackageDefinition(authRef);

module.exports = new auth.AuthService(
  'localhost:3331',
  grpc.credentials.createInsecure()
);
