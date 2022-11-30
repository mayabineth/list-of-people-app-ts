import personRoutes from "./routes/personsRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
declare var process: {
  env: {
    MONGO_URL: string;
    PORT: string;
  };
};

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
app.use("/persons", personRoutes);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
