const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

const profileDef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'config', 'proto', 'profile.proto'),
  loaderConfig
);

const profile = grpc.loadPackageDefinition(profileDef);

module.exports = new profile.UserService(
  'localhost:3332',
  grpc.credentials.createInsecure()
);
