const mongoose = require("mongoose");

exports.connectdb = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (error) => {
    console.log("Error Connencting DB", error);
  });
  mongoose.connection.on("open", (error) => {
    error
      ? console.log("Error Connecting DB", error)
      : console.log("DB connection Success");
  });
};
