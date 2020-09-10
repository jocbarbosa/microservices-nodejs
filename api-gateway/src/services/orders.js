const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loaderConfig = require('../config/proto');

const ordersRef = protoLoader.loadSync(
  path.resolve(__dirname, '..', 'config', 'proto', 'orders.proto'),
  loaderConfig
);

const orders = grpc.loadPackageDefinition(ordersRef);

module.exports = new orders.OrderService(
  'localhost:3334',
  grpc.credentials.createInsecure()
);
