const express = require("express");
const mongoose = require("mongoose");
const nodemon = require("nodemon");
const projectRouter = require("./routes/projectRouter");
const userRouter = require("./routes/userRouter");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/project", projectRouter);
app.use("/users", userRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongoose is Connected");
  app.listen(process.env.PORT, () =>
    console.log("Server is connected on the PORT", process.env.PORT)
  );
});
