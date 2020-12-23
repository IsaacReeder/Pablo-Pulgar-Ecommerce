console.log("server.js");

const express = require("express");
const cors = require("cors");
const port = 8000;
const app = express();
const db_name = "YoMama_db";
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users.routes");
const HttpError = require("./models/http.error");

app.get("/", (req, res) => res.json({ msg: "app running" }));

app.use(express.static("uploads"));
app.use("/api/images", require("./routes/api/images.js"));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);

require("./config/mongoose")(db_name);
require("./routes/product.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
