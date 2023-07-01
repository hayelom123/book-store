const mongoose = require("mongoose");

const app = require("./src/app");
const config = require("./src/config/config");

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("db connection failed");
    console.log(err);
  });

const server = app.listen(config.PORT, () => {
  console.log(`app is listening on  ${config.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});

/* 
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\          # Mongoose models (data layer) in this project entity folder
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point


*/
