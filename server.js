require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/users", require("./routes/userRoutes"))

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server running ON `);
});
