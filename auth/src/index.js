const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

require('./database');

const implementations = require('./implementations');

const packageDefinitions = protoLoader.loadSync(
  path.resolve(__dirname, 'config', 'proto', 'auth.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const proto = grpc.loadPackageDefinition(packageDefinitions);

const server = new grpc.Server();

server.addService(proto.AuthService.service, implementations);
server.bind('0.0.0.0:3331', grpc.ServerCredentials.createInsecure());

server.start();
