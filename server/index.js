const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./Routes/useRouter");
require("dotenv").config();
// middlewares
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;
app.listen(port, (req, res) => {
  console.log(`server started on port: ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDb connect"))
  .catch((error) => {
    console.log("MongoDB connection failed: ", error.message);
  });
