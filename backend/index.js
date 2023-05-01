const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

require("dotenv").config();
// database connection
require("./db")

const app = express();
const port = process.env.PORT

// middlewares
app.use(express.json());
app.use(cors());

// routes

// register
app.use("/api/register", userRoutes);
// login
app.use("/api/login", authRoutes);

app.listen(port, console.log(`Listening on port ${port}...`));