require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const authRoutes = require("./routes/auth");
const promptRoutes = require("./routes/prompt");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/prompt", promptRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
