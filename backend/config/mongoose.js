console.log("mongoose.js");

const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://Isaac:isaac123@cluster0.br37a.mongodb.net/Pablo-Pulgar?retryWrites=true&w=majority";
module.exports = (db_name) => {
  mongoose
    .connect(MONGODB_URI || `mongodb://localhost/${db_name}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() =>
      console.log(`Established a connection to the ${db_name} database.`)
    )
    .catch((errors) =>
      console.log(
        "Something went wrong when connecting to the database.",
        errors
      )
    );
};
