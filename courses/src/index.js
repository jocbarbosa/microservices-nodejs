require("dotenv").config();
const grpc = require("grpc");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");

require("./config/database/database");

const implementations = require("./implementations");

const packageDefinitions = protoLoader.loadSync(
  path.join(__dirname, "config", "proto", "definitions.proto"),
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

const PORT = process.env.PORT || 3333;

server.addService(proto.CourseService.service, implementations);
server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());

console.log(`Server running on port ${PORT}`);

server.start();
