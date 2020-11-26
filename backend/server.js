console.log("server.js");

const express = require("express");
const cors = require("cors");
const port = 8000;
const app = express();
const db_name = "YoMama_db";

app.get("/", (req, res) => res.json({ msg: "app running" }));

app.use(express.static("uploads"));
app.use("/api/images", require("./routes/api/images.js"));
app.use(cors());
app.use(express.json());

require("./config/mongoose")(db_name);
require("./routes/product.routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
